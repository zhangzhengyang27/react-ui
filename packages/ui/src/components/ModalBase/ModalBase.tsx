import { RemoveScroll as RemoveScrollRaw } from 'react-remove-scroll'
import {
    Box,
    getDefaultZIndex,
    getShadow,
    getSpacing,
    type BoxProps,
    type ElementProps,
    type UIShadow,
    type UISize,
    type UISpacing,
    type UIRadius
} from '../../core'
import { OptionalPortal, type BasePortalProps } from '../Portal'
import type { TransitionOverride } from '../Transition'
import { ModalBaseProvider } from './ModalBase.context'
import { useModal } from './use-modal'

const RemoveScroll = RemoveScrollRaw as React.FC<React.PropsWithChildren<{ enabled?: boolean; [key: string]: any }>>

type RemoveScrollProps = Omit<React.ComponentProps<typeof RemoveScroll>, 'children'>

export interface ModalBaseProps extends BoxProps, ElementProps<'div', 'title'> {
    unstyled?: boolean

    /** If set modal/drawer is not unmounted from the DOM when hidden */
    keepMounted?: boolean

    /** Controls opened state */
    opened: boolean

    /** Called when modal/drawer is closed */
    onClose: () => void

    /** Id used to connect modal/drawer with body and title */
    id?: string

    /** If set, scroll is locked when opened=true */
    lockScroll?: boolean

    /** If set, focus is trapped within the modal/drawer */
    trapFocus?: boolean

    /** If set, the component is rendered inside Portal */
    withinPortal?: boolean

    /** Props passed down to the Portal component when withinPortal is set */
    portalProps?: BasePortalProps

    /** Modal/drawer content */
    children?: React.ReactNode

    /** If set, the modal/drawer is closed when user clicks on the overlay */
    closeOnClickOutside?: boolean

    /** Props added to the Transition component */
    transitionProps?: TransitionOverride

    /** Called when exit transition ends */
    onExitTransitionEnd?: () => void

    /** Called when enter transition ends */
    onEnterTransitionEnd?: () => void

    /** If set, onClose is called when user presses the escape key */
    closeOnEscape?: boolean

    /** If set, focus is returned to the last active element when onClose is called */
    returnFocus?: boolean

    /** z-index CSS property of the root element */
    zIndex?: string | number

    /** Key of theme.shadows or any valid CSS box-shadow value */
    shadow?: UIShadow

    /** 主题圆角的键或任意有效的 CSS 值 to set border-radius */
    radius?: UIRadius

    /** Key of theme.spacing or any valid CSS value to set content, header and footer padding */
    padding?: UISpacing

    /** Controls width of the content area */
    size?: UISize | (string & {}) | number

    /** Props passed down to react-remove-scroll */
    removeScrollProps?: RemoveScrollProps

    /** Internal static selector used by styles api */
    __staticSelector?: string

    /** Ref to the root element */
    ref?: React.Ref<HTMLDivElement>
}

export function ModalBase({
    keepMounted,
    opened,
    onClose,
    id,
    transitionProps,
    onExitTransitionEnd,
    onEnterTransitionEnd,
    trapFocus,
    closeOnEscape,
    returnFocus,
    closeOnClickOutside,
    withinPortal,
    portalProps,
    lockScroll,
    children,
    zIndex,
    shadow,
    padding,
    unstyled,
    removeScrollProps,
    __staticSelector,
    ref,
    ...others
}: ModalBaseProps) {
    const { _id, titleMounted, bodyMounted, setTitleMounted, setBodyMounted } = useModal({
        id,
        transitionProps,
        opened,
        trapFocus,
        closeOnEscape,
        onClose,
        returnFocus
    })

    const { key: removeScrollKey, ...otherRemoveScrollProps } = removeScrollProps || {}

    return (
        <OptionalPortal {...portalProps} withinPortal={withinPortal}>
            <ModalBaseProvider
                value={{
                    opened,
                    onClose,
                    closeOnClickOutside,
                    onExitTransitionEnd,
                    onEnterTransitionEnd,
                    transitionProps: { ...transitionProps, keepMounted },
                    getTitleId: () => `${_id}-title`,
                    getBodyId: () => `${_id}-body`,
                    titleMounted,
                    bodyMounted,
                    setTitleMounted,
                    setBodyMounted,
                    trapFocus,
                    closeOnEscape,
                    zIndex,
                    unstyled
                }}
            >
                <RemoveScroll enabled={opened && lockScroll} key={removeScrollKey} {...otherRemoveScrollProps}>
                    <Box
                        ref={ref}
                        {...others}
                        id={_id}
                        __vars={{
                            '--mb-z-index': (zIndex || getDefaultZIndex('modal')).toString(),
                            '--mb-shadow': getShadow(shadow),
                            '--mb-padding': getSpacing(padding)
                        }}
                    >
                        {children}
                    </Box>
                </RemoveScroll>
            </ModalBaseProvider>
        </OptionalPortal>
    )
}

ModalBase.displayName = '@react-ui/ui/ModalBase'
