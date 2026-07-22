import {
    Box,
    BoxProps,
    CompoundStylesApiProps,
    ElementProps,
    factory,
    Factory,
    useProps
} from '../../core'
import { useCarouselContext } from '../Carousel/Carousel.context'
import classes from '../Carousel/Carousel.module.css'

export type CarouselSlideStylesNames = 'slide'

export interface CarouselSlideProps
    extends BoxProps,
        CompoundStylesApiProps<CarouselSlideFactory>,
        ElementProps<'div'> {}

export type CarouselSlideFactory = Factory<{
    props: CarouselSlideProps
    ref: HTMLDivElement
    stylesNames: CarouselSlideStylesNames
    compound: true
}>

export const CarouselSlide = factory<CarouselSlideFactory>((props, ref) => {
    const { classNames, className, style, styles, vars, ...others } = useProps(
        'CarouselSlide',
        null,
        props
    )
    const ctx = useCarouselContext()

    return (
        <Box
            ref={ref}
            mod={{ orientation: ctx.orientation }}
            role="group"
            aria-roledescription="slide"
            {...ctx.getStyles('slide', { className, style, classNames, styles })}
            {...others}
        />
    )
})

CarouselSlide.classes = classes
CarouselSlide.displayName = '@xiaoye-react/ui/CarouselSlide'
