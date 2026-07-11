import { useProps } from '../../core'
import { Popover } from '../Popover'
import { useMenuContext } from './Menu.context'

export interface MenuSubTargetProps {
    /** Target element */
    children: React.ReactNode
}

export function MenuSubTarget(props: MenuSubTargetProps) {
    const { children, ...others } = useProps('MenuSubTarget', null, props)

    // Ensure used within Menu
    useMenuContext()

    return (
        <Popover.Target popupType="menu" {...others}>
            {children}
        </Popover.Target>
    )
}

MenuSubTarget.displayName = '@react-ui/ui/MenuSubTarget'
