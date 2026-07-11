import { createContext } from 'react'
import { useProps } from '../../core'

export interface HoverCardGroupContextValue {
    withinGroup: boolean
    openDelay?: number
    closeDelay?: number
}

export const HoverCardGroupContext = createContext<HoverCardGroupContextValue>({
    withinGroup: false
})

export interface HoverCardGroupProps {
    /** HoverCard components */
    children: React.ReactNode

    /** Open delay in ms @default 0 */
    openDelay?: number

    /** Close delay in ms @default 0 */
    closeDelay?: number
}

const defaultProps = {
    openDelay: 0,
    closeDelay: 0
} satisfies Partial<HoverCardGroupProps>

export function HoverCardGroup(props: HoverCardGroupProps) {
    const { openDelay, closeDelay, children } = useProps('HoverCardGroup', defaultProps, props)

    return (
        <HoverCardGroupContext.Provider value={{ withinGroup: true, openDelay, closeDelay }}>
            {children}
        </HoverCardGroupContext.Provider>
    )
}

HoverCardGroup.displayName = '@react-ui/ui/HoverCardGroup'

export namespace HoverCardGroup {
    export type Props = HoverCardGroupProps
}
