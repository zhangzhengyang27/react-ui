import * as React from 'react'
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
        x: '扩展',
        tools: '工具',
        resources: '资源',
        blog: '博客'
    },
    en: {
        design: 'Design',
        development: 'Development',
        components: 'Components',
        hooks: 'Hooks',
        x: 'Extensions',
        tools: 'Tools',
        resources: 'Resources',
        blog: 'Blog'
    }
}

export interface NavigationProps extends SharedProps {
    directionText: string
    onDirectionChange: () => void
}

const HeaderNavigation: React.FC<NavigationProps> = props => {
    const { isZhCN, directionText, onDirectionChange } = props
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
            label: <Link to={utils.getLocalizedPathname('/docs/x/extensions', isZhCN, search)}>{locale.x}</Link>,
            key: 'docs/x'
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
                              // 复制后再排序：blogList 是 dumi 全局侧边栏数据的引用，render 中原地 sort 会污染共享状态
                              [...blogList]
                                  .sort((a, b) => (a.frontmatter?.date > b.frontmatter?.date ? -1 : 1))[0].link,
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
        </nav>
    )
}

export default HeaderNavigation
