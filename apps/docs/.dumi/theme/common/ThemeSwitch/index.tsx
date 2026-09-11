import React, { use } from 'react'
import {
    AiOutlineBgColors,
    AiOutlineLink,
    AiOutlineSun,
    AiOutlineSync
} from '../../icons'
import { ActionIcon, Menu } from '@xiaoye-react/ui'
import { FormattedMessage, useLocation, useNavigate } from 'dumi'

import useLocalStorage from '../../../hooks/useLocalStorage'
import type { SiteContextProps } from '../../slots/SiteContext'
import SiteContext from '../../slots/SiteContext'
import { getLocalizedPathname, isZhCN } from '../../utils'
import Link from '../Link'
import ThemeIcon from './ThemeIcon'

export type ThemeName = 'light' | 'dark' | 'auto' | 'compact' | 'motion-off'

export const REACT_UI_SITE_THEME = 'react-ui-site-theme'

export interface ThemeSwitchProps {
    value?: ThemeName[]
}

// Inline SVG icon replacing `DarkTheme` from `antd-token-previewer/es/icons`
const DarkThemeIcon: React.FC<{ className?: string }> = props => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 17 17"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        style={{ verticalAlign: '-0.125em' }}
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8 1.33333333 C8.14933333 1.33333333 8.29688889 1.33844444 8.44266667 1.34866666 C8.14755556 1.98422221 8 2.64577777 8 3.33333333 C8 3.96533333 8.12333333 4.56955555 8.37 5.146 C8.61666667 5.72244445 8.94822222 6.21888889 9.36466667 6.63533333 C9.78111112 7.05177777 10.2775556 7.38333332 10.854 7.63 C11.4304444 7.87666668 12.0346667 8.00000001 12.6666667 8 C13.3542222 8 14.0157778 7.85244444 14.6513333 7.55733333 C14.6615556 7.70311111 14.6666667 7.85066667 14.6666667 8 C14.6666667 8.604 14.5868889 9.19422222 14.4273333 9.77066667 C14.2677778 10.3471111 14.0446667 10.8793333 13.758 11.3673333 C13.4713333 11.8553333 13.1233333 12.3042222 12.714 12.714 C12.3046667 13.1237778 11.8557778 13.4717778 11.3673333 13.758 C10.8788889 14.0442222 10.3466667 14.2673333 9.77066667 14.4273333 C9.19466667 14.5873333 8.60444445 14.6671111 8 14.6666685 C7.39555555 14.6662222 6.80533333 14.5864444 6.22933333 14.4273333 C5.65333333 14.2682222 5.1211111 14.0451111 4.63266666 13.758 C4.14422221 13.4708889 3.69533332 13.1228889 3.28599998 12.714 C2.87666665 12.3051111 2.52866665 11.8562222 2.24199998 11.3673333 C1.95533332 10.8784444 1.73222221 10.3462222 1.57266666 9.77066667 C1.4131111 9.19511112 1.33333333 8.6048889 1.33333333 8 C1.33333333 7.3951111 1.4131111 6.80488888 1.57266666 6.22933333 C1.73222221 5.65377778 1.95533332 5.12155555 2.24199998 4.63266666 C2.52866665 4.14377776 2.87666665 3.69488887 3.28599998 3.28599998 C3.69533332 2.8771111 4.14422221 2.5291111 4.63266666 2.24199998 C5.1211111 1.95488887 5.65333333 1.73177776 6.22933333 1.57266666 C6.80533333 1.41355555 7.39555555 1.33377778 8 1.33333333 Z M6.68733333 2.828 C6.11444444 2.97377778 5.58066667 3.20977778 5.086 3.536 C4.59133333 3.86222222 4.166 4.24933333 3.81 4.69733333 C3.454 5.14533333 3.17444444 5.65488889 2.97133333 6.226 C2.76822221 6.79711111 2.66666666 7.38822222 2.66666666 7.99933333 C2.66666666 8.72155555 2.80733332 9.41155555 3.08866666 10.0693333 C3.36999999 10.7271111 3.74933332 11.2948889 4.22666666 11.7726667 C4.70399999 12.2504444 5.27177777 12.6297778 5.92999998 12.9106667 C6.5882222 13.1915556 7.2782222 13.3322222 7.99999998 13.3326667 C8.6111111 13.3326667 9.20222221 13.2311111 9.77333331 13.028 C10.3444444 12.8248889 10.854 12.5453333 11.302 12.1893333 C11.75 11.8333333 12.1371111 11.408 12.4633333 10.9133333 C12.7895555 10.4186666 13.0255555 9.88488887 13.1713333 9.31199998 C13.022 9.32577777 12.8535555 9.33266666 12.666 9.33266666 C11.8535555 9.33266666 11.0775555 9.17377777 10.338 8.85599998 C9.59844443 8.5382222 8.96044443 8.11111109 8.42399998 7.57466666 C7.88755554 7.03822222 7.46044443 6.40022222 7.14266666 5.66066666 C6.82488889 4.92111109 6.66599999 4.14511109 6.66599998 3.33266666 C6.66599998 3.1451111 6.67288888 2.97666666 6.68666666 2.82733333 L6.68733333 2.828 Z"
        />
    </svg>
)

// Inline SVG icon replacing `CompactTheme` from `antd-token-previewer/es/icons`
const CompactThemeIcon: React.FC<{ className?: string }> = props => (
    <svg
        width="1em"
        height="1em"
        viewBox="0 0 17 16"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        style={{ verticalAlign: '-0.125em' }}
        {...props}
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 14 L10 12 C10 10.8666667 10.8666667 10 12 10 L14 10 C14.4 10 14.6666667 10.2666667 14.6666667 10.6666667 C14.6666667 11.0666667 14.4 11.3333333 14 11.3333333 L12 11.3333333 C11.6 11.3333333 11.3333333 11.6 11.3333333 12 L11.3333333 14 C11.3333333 14.4 11.0666667 14.6666667 10.6666667 14.6666667 C10.2666667 14.6666667 10 14.4 10 14 L10 14 Z M4.66666667 14 L4.66666667 12 C4.66666667 11.6 4.4 11.3333333 4 11.3333333 L2 11.3333333 C1.6 11.3333333 1.33333333 11.0666667 1.33333333 10.6666667 C1.33333333 10.2666667 1.6 10 2 10 L4 10 C5.13333333 10 6 10.8666667 6 12 L6 14 C6 14.4 5.73333333 14.6666667 5.33333333 14.6666667 C4.93333333 14.6666667 4.66666666 14.4 4.66666667 14 L4.66666667 14 Z M12 6 C10.8666667 6 10 5.13333333 10 4 L10 2 C10 1.6 10.2666667 1.33333333 10.6666667 1.33333333 C11.0666667 1.33333333 11.3333333 1.6 11.3333333 2 L11.3333333 4 C11.3333333 4.4 11.6 4.66666667 12 4.66666667 L14 4.66666667 C14.4 4.66666667 14.6666667 4.93333334 14.6666667 5.33333333 C14.6666667 5.73333331 14.4 6 14 6 L12 6 L12 6 Z M2 6 C1.6 6 1.33333333 5.73333333 1.33333333 5.33333333 C1.33333333 4.93333333 1.6 4.66666666 2 4.66666667 L4 4.66666667 C4.4 4.66666667 4.66666667 4.4 4.66666667 4 L4.66666667 2 C4.66666667 1.6 4.93333334 1.33333333 5.33333333 1.33333333 C5.73333331 1.33333333 6 1.6 6 2 L6 4 C6 5.13333333 5.13333333 6 4 6 L2 6 Z"
        />
    </svg>
)

const ThemeSwitch: React.FC<ThemeSwitchProps> = () => {
    const { pathname, search } = useLocation()
    const navigate = useNavigate()
    const { theme, updateSiteConfig } = use<SiteContextProps>(SiteContext)

    const [, setTheme] = useLocalStorage<ThemeName>(REACT_UI_SITE_THEME, {
        defaultValue: undefined
    })

    const badge = (
        <span
            style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--ui-color-primary, #1677ff)',
                display: 'inline-block'
            }}
        />
    )

    // 主题选项配置
    const themeOptions = [
        {
            id: 'app.theme.switch.auto',
            icon: <AiOutlineSync />,
            key: 'auto',
            showBadge: () => theme.includes('auto')
        },
        {
            id: 'app.theme.switch.light',
            icon: <AiOutlineSun />,
            key: 'light',
            showBadge: () => theme.includes('light')
        },
        {
            id: 'app.theme.switch.dark',
            icon: <DarkThemeIcon />,
            key: 'dark',
            showBadge: () => theme.includes('dark')
        },
        {
            type: 'divider'
        },
        {
            id: 'app.theme.switch.compact',
            icon: <CompactThemeIcon />,
            key: 'compact',
            showBadge: () => theme.includes('compact')
        },
        {
            type: 'divider'
        },
        {
            id: 'app.footer.theme',
            icon: <AiOutlineBgColors />,
            key: 'theme-editor',
            extra: <AiOutlineLink />,
            isLink: true,
            linkPath: '/theme-editor'
        }
    ]

    // 处理主题切换
    const handleThemeChange = (key: string) => {
        // 查找对应的选项配置
        const option = themeOptions.find(opt => opt.key === key)

        // 链接类型的菜单项特殊处理，不执行主题切换逻辑
        if (option?.isLink) {
            return
        }

        const themeKey = key as ThemeName

        // 亮色/暗色/自动模式是互斥的
        if (['light', 'dark', 'auto'].includes(key)) {
            // 校验当前主题是否包含要切换的主题（避免 timeout in DOM update）
            if (theme.includes(themeKey)) {
                return
            }

            // 注意：这里不再使用从 antd 搬来的 View Transition 切换动画——
            // 它通过注入反转的 color-scheme 制造过渡效果，再在 transition ready 时移除，
            // 而本站主题由 React（startTransition + UIProvider effect）异步应用，
            // 时序上必然出现「亮 → 假暗 → 亮 → 真暗」的闪烁，故整体移除。

            const filteredTheme = theme.filter(t => !['light', 'dark', 'auto'].includes(t))
            const newTheme = [...filteredTheme, themeKey]

            setTheme(themeKey)

            updateSiteConfig({ theme: newTheme })
        } else {
            // 其他主题选项是开关式的
            const hasTheme = theme.includes(themeKey)
            updateSiteConfig({
                theme: hasTheme ? theme.filter(t => t !== themeKey) : [...theme, themeKey]
            })
        }
    }

    return (
        <>
            <Menu position="bottom-end" withArrow>
                <Menu.Target>
                    <ActionIcon variant="subtle" size="lg" aria-label="theme switch">
                        <ThemeIcon />
                    </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                    {themeOptions.map((option, i) => {
                        if (option.type === 'divider') {
                            return <Menu.Divider key={`divider-${i}`} />
                        }

                        const { id, icon, key, showBadge, extra, isLink, linkPath } = option
                        const rightSection = showBadge ? (showBadge() ? badge : null) : extra

                        return (
                            <Menu.Item
                                key={key || i}
                                leftSection={icon}
                                rightSection={rightSection}
                                onClick={e => {
                                    if (isLink) {
                                        navigate(getLocalizedPathname(linkPath!, isZhCN(pathname), search))
                                        return
                                    }
                                    handleThemeChange(key!)
                                }}
                            >
                                <FormattedMessage id={id} />
                            </Menu.Item>
                        )
                    })}
                </Menu.Dropdown>
            </Menu>

        </>
    )
}

export default ThemeSwitch
