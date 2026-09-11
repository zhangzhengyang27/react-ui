import * as React from 'react'
import { AiOutlineMenu } from '../../icons'
import { Menu } from '@xiaoye-react/ui'
import { useFullSidebarData, useLocation } from 'dumi'

import useLocale from '../../../hooks/useLocale'
import Link from '../../common/Link'
import * as utils from '../../utils'
import type { SharedProps } from './interface'
import classes from './Navigation.module.css'

// ============================= Theme =============================
const locales = {
    cn: {
        design: '设计',
        development: '研发',
        components: '组件',
        hooks: 'Hooks',
        tools: '工具',
        resources: '资源',
        blog: '博客'
    },
    en: {
        design: 'Design',
        development: 'Development',
        components: 'Components',
        hooks: 'Hooks',
        tools: 'Tools',
        resources: 'Resources',
        blog: 'Blog'
    }
}

export interface NavigationProps extends SharedProps {
    isMobile: boolean
    responsive: null | 'narrow' | 'crowded'
    directionText: string
    onDirectionChange: () => void
}

const HeaderNavigation: React.FC<NavigationProps> = props => {
    const { isZhCN, isMobile, responsive, directionText, onDirectionChange } = props
    const { pathname, search } = useLocation()
    const [locale] = useLocale(locales)

    const sidebarData = useFullSidebarData()
    const blogList = sidebarData['/docs/blog']?.[0]?.children || []

    const module = pathname.split('/').filter(Boolean).slice(0, -1).join('/')
    let activeMenuItem = module || 'home'
    if (pathname.startsWith('/changelog')) {
        activeMenuItem = 'docs/react'
    }

    const navItems = [
        {
            label: (
                <Link to={utils.getLocalizedPathname('/docs/react/introduce', isZhCN, search)}>
                    {locale.development}
                </Link>
            ),
            key: 'docs/react'
        },
        {
            label: (
                <Link to={utils.getLocalizedPathname('/components/overview/', isZhCN, search)}>
                    {locale.components}
                </Link>
            ),
            key: 'components'
        },
        {
            label: <Link to={utils.getLocalizedPathname('/docs/hooks/package', isZhCN, search)}>{locale.hooks}</Link>,
            key: 'docs/hooks'
        },
        {
            label: <Link to="/colors-generator">{locale.tools}</Link>,
            key: 'colors-generator'
        },
        blogList.length
            ? {
                  label: (
                      <Link
                          to={utils.getLocalizedPathname(
                              blogList.sort((a, b) => (a.frontmatter?.date > b.frontmatter?.date ? -1 : 1))[0].link,
                              isZhCN,
                              search
                          )}
                      >
                          {locale.blog}
                      </Link>
                  ),
                  key: 'docs/blog'
              }
            : null
    ].filter(Boolean) as { label: React.ReactNode; key: string }[]

    const additionalItems = (
        <>
            <Menu.Item
                onClick={() => {
                    window.open('https://github.com/zhangzhengyang27/react-ui', '_blank', 'noopener,noreferrer')
                }}
            >
                GitHub
            </Menu.Item>
            <Menu.Item onClick={onDirectionChange}>{directionText}</Menu.Item>
        </>
    )

    // Mobile: inline vertical nav with additional items inline
    if (isMobile) {
        return (
            <nav className={classes.navInline}>
                {navItems.map(item => (
                    <div
                        key={item.key}
                        className={
                            activeMenuItem === item.key
                                ? `${classes.navInlineItem} ${classes.navInlineItemActive}`
                                : classes.navInlineItem
                        }
                    >
                        {item.label}
                    </div>
                ))}
                <div className={classes.navInlineItem}>
                    <a href="https://github.com/zhangzhengyang27/react-ui" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                </div>
                <div className={classes.navInlineItem}>
                    <button
                        onClick={onDirectionChange}
                        style={{
                            background: 'transparent',
                            border: 0,
                            cursor: 'pointer',
                            padding: 0,
                            color: 'var(--ui-color-text)'
                        }}
                    >
                        {directionText}
                    </button>
                </div>
            </nav>
        )
    }

    // Desktop: horizontal nav
    return (
        <nav className={classes.nav}>
            {navItems.map(item => (
                <div
                    key={item.key}
                    className={
                        activeMenuItem === item.key ? `${classes.navItem} ${classes.navItemActive}` : classes.navItem
                    }
                >
                    {item.label}
                </div>
            ))}
            {responsive === 'crowded' && (
                <Menu trigger="click" position="bottom-end">
                    <Menu.Target>
                        <button className={classes.additionalTrigger} type="button">
                            <AiOutlineMenu />
                        </button>
                    </Menu.Target>
                    <Menu.Dropdown>{additionalItems}</Menu.Dropdown>
                </Menu>
            )}
        </nav>
    )
}

export default HeaderNavigation
