import { useCallback, useEffect, useRef, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getSpacing,
    UISpacing,
    rem,
    StyleProp,
    StylesApiProps,
    useDirection,
    useProps,
    useStyles
} from '../../core'
import { UnstyledButton } from '../UnstyledButton'
import { VisuallyHidden } from '../VisuallyHidden'
import { useId } from '@xiaoye-react/hooks'
import { CarouselProvider } from './Carousel.context'
import { CarouselSlide } from './CarouselSlide'
import classes from './Carousel.module.css'

export type CarouselStylesNames =
    | 'slide'
    | 'root'
    | 'viewport'
    | 'container'
    | 'controls'
    | 'control'
    | 'indicators'
    | 'indicator'

export type CarouselCssVariables = {
    root:
        | '--carousel-height'
        | '--carousel-control-size'
        | '--carousel-controls-offset'
        | '--carousel-slide-size'
        | '--carousel-slide-gap'
}

export interface CarouselProps
    extends BoxProps,
        StylesApiProps<CarouselFactory>,
        ElementProps<'div'> {
    children?: React.ReactNode
    onNextSlide?: () => void
    onPreviousSlide?: () => void
    onSlideChange?: (index: number) => void
    nextControlProps?: React.ComponentPropsWithoutRef<'button'>
    previousControlProps?: React.ComponentPropsWithoutRef<'button'>
    controlSize?: React.CSSProperties['width']
    controlsOffset?: UISpacing
    slideSize?: StyleProp<string | number>
    slideGap?: StyleProp<UISpacing>
    orientation?: 'horizontal' | 'vertical'
    height?: React.CSSProperties['height']
    includeGapInSize?: boolean
    initialSlide?: number
    withControls?: boolean
    withIndicators?: boolean
    nextControlIcon?: React.ReactNode
    previousControlIcon?: React.ReactNode
    withKeyboardEvents?: boolean
    loop?: boolean
    draggable?: boolean
    dragFree?: boolean
    align?: 'start' | 'center' | 'end'
    slidesToScroll?: number
}

export type CarouselFactory = Factory<{
    props: CarouselProps
    ref: HTMLDivElement
    stylesNames: CarouselStylesNames
    vars: CarouselCssVariables
    staticComponents: {
        Slide: typeof CarouselSlide
    }
}>

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
    loop: false,
    draggable: true,
    dragFree: false,
    align: 'center',
    slidesToScroll: 1
} satisfies Partial<CarouselProps>

const varsResolver = createVarsResolver<CarouselFactory>(
    (_, { height, controlSize, controlsOffset, slideSize, slideGap }) => ({
        root: {
            '--carousel-height': rem(height),
            '--carousel-control-size': rem(controlSize),
            '--carousel-controls-offset': getSpacing(controlsOffset),
            '--carousel-slide-size': rem(slideSize),
            '--carousel-slide-gap': getSpacing(slideGap)
        }
    })
)

export const Carousel = factory<CarouselFactory>((_props, ref) => {
    const props = useProps('Carousel', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        children,
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
        initialSlide,
        withControls,
        withIndicators,
        nextControlIcon,
        previousControlIcon,
        withKeyboardEvents,
        loop,
        draggable,
        dragFree,
        align,
        slidesToScroll,
        id,
        ...others
    } = props

    const getStyles = useStyles<CarouselFactory>({
        name: 'Carousel',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver,
        rootSelector: 'root'
    })

    const _id = useId(id)
    const { dir } = useDirection()

    // embla-carousel-react 8.x 内部会对 options 做深比较(areOptionsEqual),
    // 值变化时自动调用 emblaApi.reInit,故 loop/align 等 options 变化无需手动 reInit
    const [emblaRef, embla] = useEmblaCarousel({
        axis: orientation === 'horizontal' ? 'x' : 'y',
        // RTL 下滚动方向/拖拽随 dir 翻转(仅水平轴有意义,与 @xiaoye-react/carousel 副本对齐)
        direction: orientation === 'horizontal' ? dir : undefined,
        startIndex: initialSlide,
        loop,
        // embla 8.x 的选项名是 watchDrag,旧的 draggable 会被静默忽略
        watchDrag: draggable,
        dragFree,
        align,
        slidesToScroll,
        containScroll: 'trimSnaps'
    })

    const [selected, setSelected] = useState(0)
    const [slidesCount, setSlidesCount] = useState(0)
    // 挂载时 effect 会立即同步一次选中项,initialSlide > 0 时不应误报 onSlideChange
    const initializedRef = useRef(false)
    // ref 镜像 selected:handleSelect 不再依赖 selected state,
    // 避免每次翻页后回调身份变化导致 embla 'select' 监听反复解绑/重绑
    const selectedRef = useRef(selected)
    selectedRef.current = selected

    const handleScroll = useCallback(
        (index: number) => embla && embla.scrollTo(index),
        [embla]
    )

    // 回调走 ref：handleSelect 依赖 onSlideChange 时，消费者传内联回调会让
    // embla 监听每次父渲染都 off/on 并额外触发一次 handleSelect
    const onSlideChangeRef = useRef(onSlideChange)
    onSlideChangeRef.current = onSlideChange

    const handleSelect = useCallback(() => {
        if (!embla) return
        const slide = embla.selectedScrollSnap()
        setSelected(slide)
        if (!initializedRef.current) {
            initializedRef.current = true
            return
        }
        slide !== selectedRef.current && onSlideChangeRef.current?.(slide)
    }, [embla])

    const handlePrevious = useCallback(() => {
        embla?.scrollPrev()
        onPreviousSlide?.()
    }, [embla])

    const handleNext = useCallback(() => {
        embla?.scrollNext()
        onNextSlide?.()
    }, [embla])

    const handleKeydown = useCallback(
        (event: React.KeyboardEvent<HTMLDivElement>) => {
            if (!withKeyboardEvents) return

            // 其他处理器已标记过默认行为被阻止时不再重复处理
            if (event.defaultPrevented) return

            // 事件来自输入控件时不拦截,避免劫持 slide 内输入框的方向键操作
            const target = event.target as HTMLElement
            if (
                target.tagName === 'INPUT' ||
                target.tagName === 'TEXTAREA' ||
                target.tagName === 'SELECT' ||
                target.isContentEditable
            ) {
                return
            }

            // 垂直方向 carousel 使用 Up/Down 翻页而非 Left/Right;
            // 水平方向 RTL 下左右键与滚动方向对齐互换(与 embla direction 翻转一致)
            const isHorizontal = orientation === 'horizontal'
            const nextKey = isHorizontal ? (dir === 'rtl' ? 'ArrowLeft' : 'ArrowRight') : 'ArrowDown'
            const prevKey = isHorizontal ? (dir === 'rtl' ? 'ArrowRight' : 'ArrowLeft') : 'ArrowUp'
            if (event.key === nextKey) {
                event.preventDefault()
                handleNext()
            }
            if (event.key === prevKey) {
                event.preventDefault()
                handlePrevious()
            }
        },
        [withKeyboardEvents, orientation, dir, handleNext, handlePrevious]
    )

    useEffect(() => {
        if (embla) {
            handleSelect()
            setSlidesCount(embla.scrollSnapList().length)
            // slides 异步加载/增删时 embla 会 reInit 并派发 slidesChanged，
            // 不监听它的话 slidesCount 冻结为初始值，指示器数量错乱
            const handleSlidesChanged = () => {
                setSlidesCount(embla.scrollSnapList().length)
            }
            embla.on('select', handleSelect)
            embla.on('slidesChanged', handleSlidesChanged)
            return () => {
                embla.off('select', handleSelect)
                embla.off('slidesChanged', handleSlidesChanged)
            }
        }
    }, [embla, handleSelect])

    const canScrollPrev = embla?.canScrollPrev() || false
    const canScrollNext = embla?.canScrollNext() || false

    const indicators = Array(slidesCount)
        .fill(0)
        .map((_, index) => (
            <button
                key={index}
                type="button"
                role="tab"
                aria-label={`跳转到第 ${index + 1} 张`}
                aria-selected={index === selected}
                data-active={index === selected || undefined}
                data-orientation={orientation}
                onClick={() => handleScroll(index)}
                {...getStyles('indicator')}
            />
        ))

    return (
        <CarouselProvider value={{ getStyles, orientation }}>
            <Box
                ref={ref}
                role="region"
                aria-roledescription="carousel"
                // aria-roledescription 要求元素自身有可访问名称;消费者可通过 aria-label 覆盖
                aria-label="carousel"
                {...getStyles('root')}
                {...others}
                id={_id}
                mod={{ orientation, 'include-gap-in-size': includeGapInSize }}
                onKeyDown={handleKeydown}
            >
                <VisuallyHidden role="status" aria-live="polite" aria-atomic="true">
                    {slidesCount > 0 && `Slide ${selected + 1} of ${slidesCount}`}
                </VisuallyHidden>

                {withControls && (
                    <div {...getStyles('controls')} data-orientation={orientation}>
                        <UnstyledButton
                            aria-label="上一张幻灯片"
                            data-inactive={!canScrollPrev || undefined}
                            data-type="previous"
                            tabIndex={canScrollPrev ? 0 : -1}
                            {...previousControlProps}
                            {...getStyles('control')}
                            onClick={event => {
                                handlePrevious()
                                previousControlProps?.onClick?.(event)
                            }}
                        >
                            {previousControlIcon || <span aria-hidden="true">‹</span>}
                        </UnstyledButton>

                        <UnstyledButton
                            aria-label="下一张幻灯片"
                            data-inactive={!canScrollNext || undefined}
                            data-type="next"
                            tabIndex={canScrollNext ? 0 : -1}
                            {...nextControlProps}
                            {...getStyles('control')}
                            onClick={event => {
                                handleNext()
                                nextControlProps?.onClick?.(event)
                            }}
                        >
                            {nextControlIcon || <span aria-hidden="true">›</span>}
                        </UnstyledButton>
                    </div>
                )}

                <div {...getStyles('viewport')} ref={emblaRef}>
                    <div {...getStyles('container')} data-orientation={orientation}>
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
    )
})

Carousel.classes = classes
Carousel.varsResolver = varsResolver
Carousel.displayName = '@xiaoye-react/ui/Carousel'
Carousel.Slide = CarouselSlide

export namespace Carousel {
    export type Props = CarouselProps
    export type CssVariables = CarouselCssVariables
    export type Factory = CarouselFactory
    export type StylesNames = CarouselStylesNames
}
