import { Children, useCallback, useEffect, useRef, useState } from 'react';
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import {
  AccordionChevron,
  Box,
  BoxProps,
  createVarsResolver,
  DataAttributes,
  ElementProps,
  factory,
  Factory,
  getSpacing,
  UISpacing,
  rem,
  StyleProp,
  StylesApiProps,
  UnstyledButton,
  useDirection,
  useProps,
  useRandomClassName,
  useStyles,
  VisuallyHidden,
} from '@xiaoye-react/ui';
import { clamp, useId } from '@xiaoye-react/hooks';
import { CarouselProvider, type CarouselContextValue } from './Carousel.context';
import { CarouselSlide } from './CarouselSlide/CarouselSlide';
import {
  CarouselContainerVariables,
  CarouselVariables,
} from './CarouselVariables/CarouselVariables';
import { getChevronRotation } from './get-chevron-rotation';
import classes from './Carousel.module.css';

export type CarouselStylesNames =
  | 'slide'
  | 'root'
  | 'viewport'
  | 'container'
  | 'controls'
  | 'control'
  | 'indicators'
  | 'indicator';

export type CarouselCssVariables = {
  root: '--carousel-height' | '--carousel-control-size' | '--carousel-controls-offset';
};

export interface CarouselProps
  extends BoxProps, StylesApiProps<CarouselFactory>, ElementProps<'div'> {
  /** Options passed down to embla carousel */
  emblaOptions?: EmblaOptionsType;

  /** `Carousel.Slide` components */
  children?: React.ReactNode;

  /** Called when next slide is shown */
  onNextSlide?: () => void;

  /** Called when previous slider is shown */
  onPreviousSlide?: () => void;

  /** Called with slide index when slide changes */
  onSlideChange?: (index: number) => void;

  /** Get embla API as ref */
  getEmblaApi?: (embla: EmblaCarouselType) => void;

  /** Props passed down to next control */
  nextControlProps?: React.ComponentProps<'button'>;

  /** Props passed down to previous control */
  previousControlProps?: React.ComponentProps<'button'>;

  /** Controls size of the next and previous controls @default 26 */
  controlSize?: React.CSSProperties['width'];

  /** Controls position of the next and previous controls, key of `theme.spacing` or any valid CSS value @default 'sm' */
  controlsOffset?: UISpacing;

  /** Controls slide width based on viewport width @default '100%' */
  slideSize?: StyleProp<string | number>;

  /** Key of theme.spacing or number to set gap between slides */
  slideGap?: StyleProp<UISpacing>;

  /** Carousel orientation @default 'horizontal' */
  orientation?: 'horizontal' | 'vertical';

  /** Determines type of queries used for responsive styles @default 'media' */
  type?: 'media' | 'container';

  /** Slides container `height`, required for vertical orientation */
  height?: React.CSSProperties['height'];

  /** Determines whether gap between slides should be treated as part of the slide size @default true */
  includeGapInSize?: boolean;

  /** Index of initial slide */
  initialSlide?: number;

  /** Determines whether next/previous controls should be displayed @default true */
  withControls?: boolean;

  /** Determines whether indicators should be displayed @default false */
  withIndicators?: boolean;

  /** A list of embla plugins */
  plugins?: EmblaPluginType[];

  /** Icon of the next control */
  nextControlIcon?: React.ReactNode;

  /** Icon of the previous control */
  previousControlIcon?: React.ReactNode;

  /** Determines whether arrow key should switch slides @default true */
  withKeyboardEvents?: boolean;

  /** Function to get props for indicator button */
  getIndicatorProps?: (index: number) => ElementProps<'button'> & DataAttributes;
}

export type CarouselFactory = Factory<{
  props: CarouselProps;
  ref: HTMLDivElement;
  stylesNames: CarouselStylesNames;
  vars: CarouselCssVariables;
  staticComponents: {
    Slide: typeof CarouselSlide;
  };
}>;

const defaultProps = {
  controlSize: 26,
  controlsOffset: 'sm',
  slideSize: '100%',
  slideGap: 0,
  orientation: 'horizontal',
  includeGapInSize: true,
  initialSlide: 0,
  withControls: true,
  withIndicators: false,
  withKeyboardEvents: true,
  type: 'media',
} satisfies Partial<CarouselProps>;

const defaultEmblaOptions: EmblaOptionsType = {
  align: 'center',
  loop: false,
  slidesToScroll: 1,
  dragFree: false,
  inViewThreshold: 0,
  skipSnaps: false,
  containScroll: 'trimSnaps',
};

const varsResolver = createVarsResolver<CarouselFactory>(
  (_, { height, controlSize, controlsOffset }) => ({
    root: {
      '--carousel-height': rem(height),
      '--carousel-control-size': rem(controlSize),
      '--carousel-controls-offset': getSpacing(controlsOffset),
    },
  })
);

export const Carousel = factory<CarouselFactory>((_props) => {
  const props = useProps('Carousel', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    getEmblaApi,
    onNextSlide,
    onPreviousSlide,
    onSlideChange,
    nextControlProps,
    previousControlProps,
    controlSize,
    controlsOffset,
    slideSize,
    slideGap,
    orientation,
    height,
    includeGapInSize,
    draggable,
    initialSlide,
    withControls,
    withIndicators,
    plugins,
    nextControlIcon,
    previousControlIcon,
    withKeyboardEvents,
    mod,
    type,
    emblaOptions,
    attributes,
    getIndicatorProps,
    id,
    ...others
  } = props;

  const getStyles = useStyles<CarouselFactory>({
    name: 'Carousel',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver,
  });

  const _id = useId(id);

  const responsiveClassName = useRandomClassName();
  const { dir } = useDirection();

  const [emblaRefElement, embla] = useEmblaCarousel(
    {
      axis: orientation === 'horizontal' ? 'x' : 'y',
      direction: orientation === 'horizontal' ? dir : undefined,
      startIndex: initialSlide,
      ...defaultEmblaOptions,
      ...emblaOptions,
    },
    plugins
  );

  const [selected, setSelected] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);
  // 挂载时 effect 会立即同步一次选中项,initialSlide > 0 时不应误报 onSlideChange
  const initializedRef = useRef(false);
  // ref 镜像 selected:handleSelect 不再依赖 selected state,
  // 避免每次翻页后回调身份变化导致 embla 'select' 监听反复解绑/重绑、getEmblaApi 被重复调用
  const selectedRef = useRef(selected);
  selectedRef.current = selected;
  // 回调走 ref:消费者传内联 onSlideChange 时,监听不会随父渲染反复 off/on
  const onSlideChangeRef = useRef(onSlideChange);
  onSlideChangeRef.current = onSlideChange;

  // onPreviousSlide/onNextSlide 同理:handlePrevious/handleNext 只依赖 [embla],
  // 直接闭包 props 会固化首帧回调,消费者内联传参时它捕获的 state 永远是旧值
  const onPreviousSlideRef = useRef(onPreviousSlide);
  onPreviousSlideRef.current = onPreviousSlide;
  const onNextSlideRef = useRef(onNextSlide);
  onNextSlideRef.current = onNextSlide;

  const handleScroll = useCallback((index: number) => embla && embla.scrollTo(index), [embla]);

  const handleSelect = useCallback(() => {
    if (!embla) {
      return;
    }
    const slide = embla.selectedScrollSnap();
    setSelected(slide);
    if (!initializedRef.current) {
      initializedRef.current = true;
      return;
    }
    slide !== selectedRef.current && onSlideChangeRef.current?.(slide);
  }, [embla]);

  const handlePrevious = useCallback(() => {
    embla?.scrollPrev();
    onPreviousSlideRef.current?.();
  }, [embla]);

  const handleNext = useCallback(() => {
    embla?.scrollNext();
    onNextSlideRef.current?.();
  }, [embla]);

  const handleKeydown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (!withKeyboardEvents) {
        return;
      }

      const target = event.target as HTMLElement | null;
      // slide 内的输入框/可编辑区域的 ArrowLeft/Right、Home/End 是光标移动，
      // 捕获阶段吞掉会破坏文本编辑并误触轮播滚动
      if (
        target &&
        (target.isContentEditable ||
          ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName))
      ) {
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevious();
      }

      if (event.key === 'Home') {
        event.preventDefault();
        embla?.scrollTo(0);
      }

      if (event.key === 'End') {
        event.preventDefault();
        embla?.scrollTo(embla.scrollSnapList().length - 1);
      }
    },
    // withKeyboardEvents 必须入 deps：embla 初始化后其余依赖稳定，
    // 缺失会导致闭包固化首帧值，运行时切换该 prop 完全无效
    [withKeyboardEvents, embla, handleNext, handlePrevious]
  );

  useEffect(() => {
    if (embla) {
      getEmblaApi?.(embla);
      handleSelect();
      setSlidesCount(embla.scrollSnapList().length);
      // slides 异步加载/增删时 embla 会 reInit 并派发 slidesChanged,
      // 不监听它的话 slidesCount 冻结为初始值,指示器数量错乱(与 ui 包同步)
      const handleSlidesChanged = () => {
        setSlidesCount(embla.scrollSnapList().length);
      };
      embla.on('select', handleSelect);
      embla.on('slidesChanged', handleSlidesChanged);

      return () => {
        embla.off('select', handleSelect);
        embla.off('slidesChanged', handleSlidesChanged);
      };
    }

    return undefined;
  }, [embla, emblaOptions?.slidesToScroll, handleSelect]);

  useEffect(() => {
    if (embla) {
      embla.reInit();
      setSlidesCount(embla.scrollSnapList().length);
      setSelected((currentSelected) =>
        clamp(currentSelected, 0, Children.toArray(children).length - 1)
      );
    }
  }, [Children.toArray(children).length, emblaOptions?.slidesToScroll]);

  const canScrollPrev = embla?.canScrollPrev() || false;
  const canScrollNext = embla?.canScrollNext() || false;

  const handleIndicatorKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const isHorizontal = orientation === 'horizontal';
      const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
      const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

      if (event.key === nextKey) {
        event.preventDefault();
        const nextIndex = index < slidesCount - 1 ? index + 1 : 0;
        handleScroll(nextIndex);
        const nextIndicator = event.currentTarget.parentElement?.children[nextIndex] as HTMLElement;
        nextIndicator?.focus();
      }

      if (event.key === prevKey) {
        event.preventDefault();
        const prevIndex = index > 0 ? index - 1 : slidesCount - 1;
        handleScroll(prevIndex);
        const prevIndicator = event.currentTarget.parentElement?.children[prevIndex] as HTMLElement;
        prevIndicator?.focus();
      }

      if (event.key === 'Home') {
        event.preventDefault();
        handleScroll(0);
        const firstIndicator = event.currentTarget.parentElement?.children[0] as HTMLElement;
        firstIndicator?.focus();
      }

      if (event.key === 'End') {
        event.preventDefault();
        handleScroll(slidesCount - 1);
        const lastIndicator = event.currentTarget.parentElement?.children[
          slidesCount - 1
        ] as HTMLElement;
        lastIndicator?.focus();
      }
    },
    [orientation, slidesCount, handleScroll]
  );

  const indicators = Array(slidesCount)
    .fill(0)
    .map((_, index) => (
      <UnstyledButton
        {...getStyles('indicator')}
        key={index}
        role="tab"
        aria-label={`跳转到第 ${index + 1} 张`}
        aria-selected={index === selected}
        tabIndex={index === selected ? 0 : -1}
        data-active={index === selected || undefined}
        onClick={() => handleScroll(index)}
        onKeyDown={(event) => handleIndicatorKeyDown(event, index)}
        data-orientation={orientation}
        onMouseDown={(event) => event.preventDefault()}
        {...getIndicatorProps?.(index)}
      />
    ));

  return (
    <CarouselProvider value={{ getStyles, orientation }}>
      {type === 'container' ? (
        <CarouselContainerVariables {...props} selector={`.${responsiveClassName}`} />
      ) : (
        <CarouselVariables {...props} selector={`.${responsiveClassName}`} />
      )}

      <Box
        role="region"
        aria-roledescription="carousel"
        {...getStyles('root', { className: responsiveClassName })}
        {...others}
        id={_id}
        mod={[{ orientation, 'include-gap-in-size': includeGapInSize }, mod]}
        onKeyDownCapture={handleKeydown}
      >
        <VisuallyHidden role="status" aria-live="polite" aria-atomic="true">
          {slidesCount > 0 && `第 ${selected + 1} 张,共 ${slidesCount} 张`}
        </VisuallyHidden>

        {withControls && (
          <div {...getStyles('controls')} data-orientation={orientation}>
            <UnstyledButton
              aria-controls={_id}
              aria-label="上一张幻灯片"
              aria-disabled={!canScrollPrev}
              data-inactive={!canScrollPrev || undefined}
              data-type="previous"
              tabIndex={canScrollPrev ? 0 : -1}
              {...previousControlProps}
              {...getStyles('control', {
                className: previousControlProps?.className,
                style: previousControlProps?.style,
              })}
              onClick={(event) => {
                handlePrevious();
                previousControlProps?.onClick?.(event);
              }}
            >
              {typeof previousControlIcon !== 'undefined' ? (
                previousControlIcon
              ) : (
                <AccordionChevron
                  style={{
                    transform: `rotate(${getChevronRotation({
                      dir,
                      orientation,
                      direction: 'previous',
                    })}deg)`,
                  }}
                />
              )}
            </UnstyledButton>

            <UnstyledButton
              aria-controls={_id}
              aria-label="下一张幻灯片"
              aria-disabled={!canScrollNext}
              data-inactive={!canScrollNext || undefined}
              data-type="next"
              tabIndex={canScrollNext ? 0 : -1}
              {...getStyles('control', {
                className: nextControlProps?.className,
                style: nextControlProps?.style,
              })}
              {...nextControlProps}
              onClick={(event) => {
                handleNext();
                nextControlProps?.onClick?.(event);
              }}
            >
              {typeof nextControlIcon !== 'undefined' ? (
                nextControlIcon
              ) : (
                <AccordionChevron
                  style={{
                    transform: `rotate(${getChevronRotation({
                      dir,
                      orientation,
                      direction: 'next',
                    })}deg)`,
                  }}
                />
              )}
            </UnstyledButton>
          </div>
        )}

        <div {...getStyles('viewport')} ref={emblaRefElement} data-type={type}>
          <div
            {...getStyles('container', { className: responsiveClassName })}
            data-orientation={orientation}
          >
            {children}
          </div>
        </div>

        {withIndicators && (
          <div
            {...getStyles('indicators')}
            role="tablist"
            aria-label="幻灯片列表"
            data-orientation={orientation}
          >
            {indicators}
          </div>
        )}
      </Box>
    </CarouselProvider>
  );
});

Carousel.classes = classes;
Carousel.varsResolver = varsResolver;
Carousel.displayName = '@xiaoye-react/carousel/Carousel';
Carousel.Slide = CarouselSlide;

export namespace Carousel {
  export type Props = CarouselProps;
  export type CssVariables = CarouselCssVariables;
  export type Factory = CarouselFactory;
  export type StylesNames = CarouselStylesNames;
  export type ContextValue = CarouselContextValue;
}
