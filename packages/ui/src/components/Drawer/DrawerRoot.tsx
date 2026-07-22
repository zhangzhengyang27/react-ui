import {
    createVarsResolver,
    factory,
    Factory,
    getDefaultZIndex,
    getSize,
    UIRadius,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { ModalBase, ModalBaseProps } from '../ModalBase'
import { ScrollArea } from '../ScrollArea'
import { DrawerProvider, type ScrollAreaComponent } from './Drawer.context'
import type { DrawerPosition } from './Drawer'
import classes from './Drawer.module.css'

function getDrawerFlex(position: DrawerPosition | undefined) {
    if (position === 'top' || position === 'bottom') {
        return '0 0 calc(100% - var(--drawer-offset, 0rem) * 2)'
    }
    return undefined
}

function getDrawerAlign(position: DrawerPosition | undefined) {
    switch (position) {
        case 'top':
            return 'flex-start'
        case 'bottom':
            return 'flex-end'
        default:
            return undefined
    }
}

const transitions: Record<DrawerPosition, import('../Transition').UITransitionName> = {
    top: 'slide-down',
    bottom: 'slide-up',
    left: 'slide-right',
    right: 'slide-left'
}

export type DrawerRootCssVariables = {
    root:
        | '--drawer-size'
        | '--drawer-flex'
        | '--drawer-height'
        | '--drawer-align'
        | '--drawer-justify'
        | '--drawer-offset'
}

export interface DrawerRootProps extends StylesApiProps<DrawerRootFactory>, ModalBaseProps {
    /** Scroll area component @default 'div' */
    scrollAreaComponent?: ScrollAreaComponent

    /** Side of the screen on which drawer will be opened @default 'left' */
    position?: DrawerPosition

    /** 主题圆角的键或任意有效的 CSS 值 to set border-radius @default 0 */
    radius?: UIRadius

    /** Drawer container offset from the viewport end @default 0 */
    offset?: number | string

    /** Controls width of the drawer */
    size?: UIRadius | (string & {}) | number
}

export type DrawerRootStylesNames = 'root'

export type DrawerRootFactory = Factory<{
    props: DrawerRootProps
    ref: HTMLDivElement
    stylesNames: DrawerRootStylesNames
    vars: DrawerRootCssVariables
}>

const defaultProps = {
    closeOnClickOutside: true,
    withinPortal: true,
    lockScroll: true,
    trapFocus: true,
    returnFocus: true,
    closeOnEscape: true,
    keepMounted: false,
    zIndex: getDefaultZIndex('modal'),
    position: 'left'
} satisfies Partial<DrawerRootProps>

const varsResolver = createVarsResolver<DrawerRootFactory>((_, { position, size, offset }) => ({
    root: {
        '--drawer-size': getSize(size, 'drawer-size'),
        '--drawer-flex': getDrawerFlex(position),
        '--drawer-height': position === 'left' || position === 'right' ? undefined : 'var(--drawer-size)',
        '--drawer-align': getDrawerAlign(position),
        '--drawer-justify': position === 'right' ? 'flex-end' : undefined,
        '--drawer-offset': rem(offset)
    }
}))

export const DrawerRoot = factory<DrawerRootFactory>((_props, ref) => {
    const props = useProps('DrawerRoot', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        scrollAreaComponent,
        position,
        transitionProps,
        radius,
        ...others
    } = props

    const getStyles = useStyles<DrawerRootFactory>({
        name: 'Drawer',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        vars,
        varsResolver
    })

    return (
        <DrawerProvider value={{ scrollAreaComponent, getStyles: getStyles as any, radius }}>
            <ModalBase
                ref={ref}
                {...getStyles('root')}
                transitionProps={{ transition: transitions[position!], ...transitionProps }}
                data-offset-scrollbars={scrollAreaComponent === ScrollArea.Autosize || undefined}
                {...others}
            />
        </DrawerProvider>
    )
})

DrawerRoot.classes = classes
DrawerRoot.displayName = '@xiaoye-react/ui/DrawerRoot'

export namespace DrawerRoot {
    export type Props = DrawerRootProps
    export type Factory = DrawerRootFactory
}
