import { useCallback, useEffect, useState } from 'react'
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
    useProps,
    useStyles
} from '../../core'
import { UnstyledButton } from '../UnstyledButton'
import { VisuallyHidden } from '../VisuallyHidden'
import { useId } from '@react-ui/hooks'
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

    const [emblaRef, embla] = useEmblaCarousel({
        axis: orientation === 'horizontal' ? 'x' : 'y',
        startIndex: initialSlide,
        loop,
        draggable,
        dragFree,
        align,
        slidesToScroll,
        containScroll: 'trimSnaps'
    } as any)

    const [selected, setSelected] = useState(0)
    const [slidesCount, setSlidesCount] = useState(0)

    const handleScroll = useCallback(
        (index: number) => embla && embla.scrollTo(index),
        [embla]
    )

    const handleSelect = useCallback(() => {
        if (!embla) return
        const slide = embla.selectedScrollSnap()
        setSelected(slide)
        slide !== selected && onSlideChange?.(slide)
    }, [embla, selected, onSlideChange])

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
            if (event.key === 'ArrowRight') {
                event.preventDefault()
                handleNext()
            }
            if (event.key === 'ArrowLeft') {
                event.preventDefault()
                handlePrevious()
            }
        },
        [withKeyboardEvents, handleNext, handlePrevious]
    )

    useEffect(() => {
        if (embla) {
            handleSelect()
            setSlidesCount(embla.scrollSnapList().length)
            embla.on('select', handleSelect)
            return () => {
                embla.off('select', handleSelect)
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
                aria-label={`Go to slide ${index + 1}`}
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
                {...getStyles('root')}
                {...others}
                id={_id}
                mod={{ orientation, 'include-gap-in-size': includeGapInSize }}
                onKeyDownCapture={handleKeydown}
            >
                <VisuallyHidden role="status" aria-live="polite" aria-atomic="true">
                    {slidesCount > 0 && `Slide ${selected + 1} of ${slidesCount}`}
                </VisuallyHidden>

                {withControls && (
                    <div {...getStyles('controls')} data-orientation={orientation}>
                        <UnstyledButton
                            aria-label="Previous slide"
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
                            aria-label="Next slide"
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
                        aria-label="Slides"
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
;(Carousel as any).varsResolver = varsResolver
Carousel.displayName = '@react-ui/ui/Carousel'
Carousel.Slide = CarouselSlide

export namespace Carousel {
    export type Props = CarouselProps
    export type CssVariables = CarouselCssVariables
    export type Factory = CarouselFactory
    export type StylesNames = CarouselStylesNames
}
