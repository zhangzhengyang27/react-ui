import { Box, BoxProps, factory, Factory, StylesApiProps, useProps, useStyles } from '../../core'
import { useMediaQuery } from '@xiaoye-react/hooks'
import classes from './MediaQuery.module.css'

export interface MediaQueryProps extends BoxProps, StylesApiProps<MediaQueryFactory> {
    /** Media query string, e.g. '(min-width: 768px)' */
    query: string

    /** Child content to render when query matches */
    children: React.ReactNode
}

export type MediaQueryFactory = Factory<{
    props: MediaQueryProps
    ref: HTMLDivElement
    stylesNames: 'root'
}>

export const MediaQuery = factory<MediaQueryFactory>((_props, ref) => {
    const props = useProps('MediaQuery', null, _props)
    const { query, children, classNames, className, style, styles, unstyled, vars, ...others } =
        props

    const getStyles = useStyles<MediaQueryFactory>({
        name: 'MediaQuery',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        rootSelector: 'root'
    })

    const matches = useMediaQuery(query)

    if (!matches) {
        return null
    }

    return (
        <Box ref={ref} {...getStyles('root')} {...others}>
            {children}
        </Box>
    )
})

MediaQuery.classes = classes
MediaQuery.displayName = '@xiaoye-react/ui/MediaQuery'

export namespace MediaQuery {
    export type Props = MediaQueryProps
    export type Factory = MediaQueryFactory
}
