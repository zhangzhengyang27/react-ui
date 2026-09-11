import type { ReactElement } from 'react'
import React, { useMemo } from 'react'
import { AiOutlineLeft, AiOutlineRight } from '../icons'
import { clsx } from 'clsx'

import useMenu, { type DocsMenuItem } from '../../hooks/useMenu'

import classes from './PrevAndNext.module.css'

interface NavMenuItem extends DocsMenuItem {
    className?: string
}

const flattenMenu = (menuItems: DocsMenuItem[] | undefined): NavMenuItem[] | null => {
    if (Array.isArray(menuItems)) {
        return menuItems.reduce<NavMenuItem[]>((acc, item) => {
            if (!item) {
                return acc
            }
            if (item.children && item.children.length > 0) {
                return acc.concat(flattenMenu(item.children) ?? [])
            }
            return acc.concat(item as NavMenuItem)
        }, [])
    }
    return null
}

const PrevAndNext: React.FC<{ rtl?: boolean }> = ({ rtl }) => {
    const beforeProps = { className: 'footer-nav-icon-before' }
    const afterProps = { className: 'footer-nav-icon-after' }

    const before = rtl ? <AiOutlineRight {...beforeProps} /> : <AiOutlineLeft {...beforeProps} />
    const after = rtl ? <AiOutlineLeft {...afterProps} /> : <AiOutlineRight {...afterProps} />

    const [menuItems, selectedKey] = useMenu({ before, after })

    const [prev, next] = useMemo(() => {
        const flatMenu = flattenMenu(menuItems)
        if (!flatMenu) {
            return [null, null]
        }
        let activeMenuItemIndex = -1
        flatMenu.forEach((menuItem, i) => {
            if (menuItem && menuItem.key === selectedKey) {
                activeMenuItemIndex = i
            }
        })
        return [flatMenu[activeMenuItemIndex - 1] ?? null, flatMenu[activeMenuItemIndex + 1] ?? null]
    }, [menuItems, selectedKey])

    return (
        <section className={classes.prevNextNav}>
            {prev &&
                React.cloneElement(prev.label as ReactElement<{ className: string }>, {
                    className: clsx(classes.pageNav, classes.prevNav, prev.className)
                })}
            {next &&
                React.cloneElement(next.label as ReactElement<{ className: string }>, {
                    className: clsx(classes.pageNav, classes.nextNav, next.className)
                })}
        </section>
    )
}

export default PrevAndNext
