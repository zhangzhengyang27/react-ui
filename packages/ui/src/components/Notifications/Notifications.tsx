import { useEffect, useState } from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getDefaultZIndex,
    rem,
    StylesApiProps,
    useProps,
    useStyles
} from '../../core'
import { OptionalPortal, type OptionalPortalProps } from '../Portal'
import { NotificationContainer } from './NotificationContainer'
import { getGroupedNotifications, positions } from './get-grouped-notifications/get-grouped-notifications'
import type { NotificationPosition, NotificationsStore } from './notifications.store'
import { notifications, notificationsStore, useNotifications } from './notifications.store'
import classes from './Notifications.module.css'

export type NotificationsStylesNames = 'root' | 'notification'

export type NotificationsCssVariables = {
    root: '--notifications-z-index' | '--notifications-container-width'
}

export interface NotificationsProps extends BoxProps, StylesApiProps<NotificationsFactory>, ElementProps<'div'> {
    /** Notifications default position @default 'bottom-right' */
    position?: NotificationPosition

    /** Auto close timeout for all notifications in ms, `false` to disable auto close @default 4000 */
    autoClose?: number | false

    /** Notification width @default 440 */
    containerWidth?: number | string

    /** Maximum number of notifications displayed at a time @default 5 */
    limit?: number

    /** Notifications container z-index @default 400 */
    zIndex?: string | number

    /** Props passed down to the `Portal` component */
    portalProps?: Partial<OptionalPortalProps>

    /** Store for notifications state @default notificationsStore */
    store?: NotificationsStore

    /** Determines whether notifications container should be rendered inside `Portal` @default true */
    withinPortal?: boolean

    /** Determines which notifications should pause auto close on hover @default 'all' */
    pauseResetOnHover?: 'all' | 'notification'
}

export type NotificationsFactory = Factory<{
    props: NotificationsProps
    ref: HTMLDivElement
    stylesNames: NotificationsStylesNames
    vars: NotificationsCssVariables
    staticComponents: {
        show: typeof notifications.show
        hide: typeof notifications.hide
        update: typeof notifications.update
        clean: typeof notifications.clean
        cleanQueue: typeof notifications.cleanQueue
        updateState: typeof notifications.updateState
    }
}>

const defaultProps = {
    position: 'bottom-right',
    autoClose: 4000,
    containerWidth: 440,
    limit: 5,
    zIndex: getDefaultZIndex('overlay'),
    store: notificationsStore,
    withinPortal: true,
    pauseResetOnHover: 'all'
} satisfies Partial<NotificationsProps>

const varsResolver = createVarsResolver<NotificationsFactory>((_, { zIndex, containerWidth }) => ({
    root: {
        '--notifications-z-index': zIndex?.toString(),
        '--notifications-container-width': rem(containerWidth)
    }
}))

export const Notifications = factory<NotificationsFactory>((_props, ref) => {
    const props = useProps('Notifications', defaultProps, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        attributes,
        position,
        autoClose,
        containerWidth,
        limit,
        zIndex,
        store,
        portalProps,
        withinPortal,
        pauseResetOnHover,
        ...others
    } = props

    const data = useNotifications(store)
    const [hoveredCount, setHoveredCount] = useState(0)

    const getStyles = useStyles<NotificationsFactory>({
        name: 'Notifications',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver
    })

    useEffect(() => {
        store?.setState({
            ...store.getState(),
            // 用 ?? 替代 ||,避免 limit=0 被误当作 falsy 回退成 5(0 表示全部入队不展示)
            limit: limit ?? 5,
            defaultPosition: position
        })
    }, [limit, position, store])

    const grouped = getGroupedNotifications(data.notifications, position)

    return (
        <OptionalPortal withinPortal={withinPortal} {...portalProps}>
            {positions.map(pos => (
                <Box
                    ref={pos === position ? ref : undefined}
                    key={pos}
                    {...getStyles('root')}
                    data-position={pos}
                    {...others}
                >
                    {grouped[pos].map(notification => (
                        <NotificationContainer
                            key={notification.id}
                            data={notification}
                            store={store}
                            autoClose={autoClose}
                            paused={pauseResetOnHover === 'all' ? hoveredCount > 0 : false}
                            onHoverStart={() => setHoveredCount(c => c + 1)}
                            onHoverEnd={() => setHoveredCount(c => Math.max(0, c - 1))}
                            {...getStyles('notification')}
                        />
                    ))}
                </Box>
            ))}
        </OptionalPortal>
    )
})

Notifications.classes = classes
Notifications.varsResolver = varsResolver
Notifications.displayName = '@xiaoye-react/ui/Notifications'
Notifications.show = notifications.show
Notifications.hide = notifications.hide
Notifications.update = notifications.update
Notifications.clean = notifications.clean
Notifications.cleanQueue = notifications.cleanQueue
Notifications.updateState = notifications.updateState

export namespace Notifications {
    export type Props = NotificationsProps
    export type StylesNames = NotificationsStylesNames
    export type CssVariables = NotificationsCssVariables
    export type Factory = NotificationsFactory
}
