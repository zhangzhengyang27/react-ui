import { cloneElement } from 'react'
import { getSingleElementChild, useProps } from '../../core'
import { Popover } from '../Popover'
import { usePopoverContext } from '../Popover/Popover.context'
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
    const popoverCtx = usePopoverContext()

    const child = getSingleElementChild(children) as React.ReactElement<any>

    if (!child) {
        throw new Error('[@xiaoye-react/ui] Menu.Sub.Target children should be an element or a component that accepts ref')
    }

    const childProps = child.props as any

    // 打开子菜单后聚焦其中第一个可用项；下拉经 Transition 挂载，rAF 轮询等它出现
    const focusFirstSubItem = () => {
        const dropdownId = popoverCtx?.getDropdownId()
        let attempts = 0
        const tryFocus = () => {
            const item = document
                .getElementById(dropdownId)
                ?.querySelector<HTMLElement>('[data-menu-item]:not([data-disabled])')
            if (item) {
                item.focus()
            } else if (attempts++ < 5) {
                window.requestAnimationFrame(tryFocus)
            }
        }
        tryFocus()
    }

    // 内部 Popover 处于受控模式（MenuSub 传入 opened），PopoverTarget 的点击 toggle
    // 不会生效：mouseenter 延迟打开，mouseleave 延迟关闭，键盘/点击在此处理
    return (
        <Popover.Target popupType="menu" {...others}>
            {cloneElement(child, {
                'data-sub-menu-item': true,
                onMouseEnter: (event: React.MouseEvent<HTMLElement>) => {
                    subCtx.openDelayed()
                    childProps.onMouseEnter?.(event)
                },
                onMouseLeave: (event: React.MouseEvent<HTMLElement>) => {
                    subCtx.closeDelayed()
                    childProps.onMouseLeave?.(event)
                },
                onClick: (event: React.MouseEvent<HTMLElement>) => {
                    // 触发项点击切换子菜单（此前子项自身会关闭整个父菜单）
                    if (subCtx.opened) {
                        subCtx.close()
                    } else {
                        subCtx.open()
                    }
                    childProps.onClick?.(event)
                },
                onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => {
                    childProps.onKeyDown?.(event)
                    if (event.defaultPrevented) {
                        return
                    }

                    // ARIA 菜单：ArrowRight/Enter/Space 打开子菜单并把焦点移入第一项
                    // （禁用的原生 button 不派发键盘事件，无需在此判 disabled）
                    if (event.key === 'ArrowRight' || event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        event.stopPropagation()
                        subCtx.open()
                        focusFirstSubItem()
                        return
                    }

                    // ArrowLeft 关闭子菜单，焦点留在触发项上
                    if (event.key === 'ArrowLeft' && subCtx.opened) {
                        event.preventDefault()
                        event.stopPropagation()
                        subCtx.close()
                        return
                    }

                    // 焦点在触发项上时 Escape 只关子菜单：preventDefault 会让父级
                    // Popover 的 window Escape 监听（defaultPrevented 守卫）跳过
                    if (event.key === 'Escape' && subCtx.opened) {
                        event.preventDefault()
                        event.stopPropagation()
                        subCtx.close()
                    }
                }
            })}
        </Popover.Target>
    )
}

MenuSubTarget.displayName = '@xiaoye-react/ui/MenuSubTarget'
