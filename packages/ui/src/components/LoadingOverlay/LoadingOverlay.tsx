import { Box, BoxProps, factory, Factory, StylesApiProps, useProps } from '../../core'
import { Loader, LoaderProps } from '../Loader'
import { Overlay, OverlayProps } from '../Overlay'

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
    const { visible, loaderProps, overlayProps, children, ...others } = props

    return (
        <Box ref={ref} style={{ position: 'relative', ...others.style }} {...others}>
            {children}
            {visible && (
                <Overlay {...overlayProps} center>
                    <Loader {...loaderProps} />
                </Overlay>
            )}
        </Box>
    )
})

LoadingOverlay.displayName = '@react-ui/ui/LoadingOverlay'

export namespace LoadingOverlay {
    export type Props = LoadingOverlayProps
    export type Factory = LoadingOverlayFactory
    export type StylesNames = LoadingOverlayStylesNames
}
