import { cloneElement } from 'react'
import { getSingleElementChild, useProps } from '../../core'
import { Popover } from '../Popover'
import { useMenuContext } from './Menu.context'
import { useSubMenuContext } from './MenuSub.context'

export interface MenuSubTargetProps {
    /** Target element */
    children: React.ReactNode
}

export function MenuSubTarget(props: MenuSubTargetProps) {
    const { children, ...others } = useProps('MenuSubTarget', null, props)

    // Ensure used within Menu
    useMenuContext()
    const subCtx = useSubMenuContext()

    const child = getSingleElementChild(children) as React.ReactElement<any>

    if (!child) {
        throw new Error('[@react-ui/ui] Menu.Sub.Target children should be an element or a component that accepts ref')
    }

    const childProps = child.props as any

    // 内部 Popover 处于受控模式（MenuSub 传入 opened），PopoverTarget 的点击 toggle
    // 不会生效，子菜单通过悬停打开/关闭：mouseenter 延迟打开，mouseleave 延迟关闭
    return (
        <Popover.Target popupType="menu" {...others}>
            {cloneElement(child, {
                onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
                    subCtx.openDelayed()
                    childProps.onMouseEnter?.(event)
                },
                onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
                    subCtx.closeDelayed()
                    childProps.onMouseLeave?.(event)
                }
            })}
        </Popover.Target>
    )
}

MenuSubTarget.displayName = '@react-ui/ui/MenuSubTarget'
