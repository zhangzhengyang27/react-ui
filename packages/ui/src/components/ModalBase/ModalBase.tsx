import { useCallback, useMemo } from 'react'
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

// 用 ComponentProps 从 react-remove-scroll 实际类型推导 props,替代原先的 [key: string]: any 逃逸;
// children 由 JSX 提供、forwardProps/ref 不使用,均剔除;保留 key 以兼容下方 removeScrollProps.key 的解构
type RemoveScrollProps = Omit<React.ComponentProps<typeof RemoveScrollRaw>, 'children' | 'forwardProps' | 'ref'> & {
    key?: React.Key
}

const RemoveScroll = RemoveScrollRaw as React.FC<React.PropsWithChildren<RemoveScrollProps>>

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
    __vars,
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

    const getTitleId = useCallback(() => `${_id}-title`, [_id])
    const getBodyId = useCallback(() => `${_id}-body`, [_id])
    const memoTransitionProps = useMemo(() => ({ ...transitionProps, keepMounted }), [transitionProps, keepMounted])

    const value = useMemo(
        () => ({
            opened,
            onClose,
            closeOnClickOutside,
            onExitTransitionEnd,
            onEnterTransitionEnd,
            transitionProps: memoTransitionProps,
            getTitleId,
            getBodyId,
            titleMounted,
            bodyMounted,
            setTitleMounted,
            setBodyMounted,
            trapFocus,
            closeOnEscape,
            zIndex,
            unstyled
        }),
        [
            opened,
            onClose,
            closeOnClickOutside,
            onExitTransitionEnd,
            onEnterTransitionEnd,
            memoTransitionProps,
            getTitleId,
            getBodyId,
            titleMounted,
            bodyMounted,
            setTitleMounted,
            setBodyMounted,
            trapFocus,
            closeOnEscape,
            zIndex,
            unstyled
        ]
    )

    return (
        <OptionalPortal {...portalProps} withinPortal={withinPortal}>
            <ModalBaseProvider value={value}>
                {/* react-remove-scroll 的 enabled 默认为 true,必须显式转 boolean;
                    否则 lockScroll 未设置时 enabled=undefined 仍会锁滚动,与 "If set 才锁定" 的约定矛盾 */}
                <RemoveScroll enabled={opened && !!lockScroll} key={removeScrollKey} {...otherRemoveScrollProps}>
                    <Box
                        ref={ref}
                        {...others}
                        id={_id}
                        __vars={{
                            // 合并消费者传入的 __vars（如 Spotlight 的 --spotlight-max-height）：
                            // 内联对象写在 {...others} 之后会整体覆盖，消费者变量到不了 DOM
                            ...__vars,
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

ModalBase.displayName = '@xiaoye-react/ui/ModalBase'
