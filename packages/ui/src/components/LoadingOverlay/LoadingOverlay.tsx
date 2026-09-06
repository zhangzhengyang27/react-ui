import { Box, BoxProps, factory, Factory, StylesApiProps, useStyles, useProps } from '../../core'
import { Loader, LoaderProps } from '../Loader'
import { Overlay, OverlayProps } from '../Overlay'
import classes from './LoadingOverlay.module.css'

export type LoadingOverlayStylesNames = 'root'

export interface LoadingOverlayProps extends BoxProps, StylesApiProps<LoadingOverlayFactory> {
    /** If true, the overlay is visible @default false */
    visible?: boolean

    /** Loader component props */
    loaderProps?: LoaderProps

    /** Overlay component props */
    overlayProps?: OverlayProps

    /** Content that will be overlaid when visible */
    children?: React.ReactNode
}

export type LoadingOverlayFactory = Factory<{
    props: LoadingOverlayProps
    ref: HTMLDivElement
    stylesNames: LoadingOverlayStylesNames
}>

const defaultProps = {
    visible: false
} satisfies Partial<LoadingOverlayProps>

export const LoadingOverlay = factory<LoadingOverlayFactory>((_props, ref) => {
    const props = useProps('LoadingOverlay', defaultProps, _props)
    const { visible, loaderProps, overlayProps, children, classNames, styles, unstyled, vars, ...others } = props

    const getStyles = useStyles<LoadingOverlayFactory>({
        name: 'LoadingOverlay',
        classes,
        props,
        classNames,
        styles,
        unstyled,
        rootSelector: 'root'
    })

    return (
        <Box ref={ref} {...getStyles('root')} {...others}>
            {children}
            {visible && (
                <Overlay {...overlayProps} center>
                    <Loader {...loaderProps} />
                </Overlay>
            )}
        </Box>
    )
})

LoadingOverlay.displayName = '@xiaoye-react/ui/LoadingOverlay'
LoadingOverlay.classes = classes
