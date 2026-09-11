import React, { useCallback, useEffect } from 'react'
import dayjs from 'dayjs'
import { createSearchParams, useOutlet, useSearchParams } from 'dumi'
import { UIProvider } from '@xiaoye-react/ui'
import { Notifications } from '@xiaoye-react/notifications'
import ModalsProviderDemo from '../builtins/ModalsProviderDemo'

import { DarkContext } from '../../hooks/useDark'
import useLayoutState from '../../hooks/useLayoutState'
import useLocalStorage from '../../hooks/useLocalStorage'
import { getBannerData } from '../../pages/index/components/util'
import GaScript from '../common/GaScript'
import HotKeysHandler from '../common/HotKeysHandler'
import { REACT_UI_SITE_THEME } from '../common/ThemeSwitch'
import type { ThemeName } from '../common/ThemeSwitch'
import type { SiteContextProps } from '../slots/SiteContext'
import SiteContext from '../slots/SiteContext'

type SiteState = Partial<Omit<SiteContextProps, 'updateSiteConfig'>>


export const REACT_UI_NOT_SHOW_BANNER = 'REACT_UI_NOT_SHOW_BANNER'

// Compatible with old anchors
if (typeof window !== 'undefined') {
    const hashId = location.hash.slice(1)
    if (hashId.startsWith('components-')) {
        if (!document.querySelector(`#${hashId}`)) {
            location.hash = `#${hashId.replace(/^components-/, '')}`
        }
    }
}

const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') {
        return 'light'
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const isThemeDark = (theme: ThemeName[], systemTheme: 'light' | 'dark') => {
    return theme.includes('dark') || (theme.includes('auto') && systemTheme === 'dark')
}

const GlobalLayout: React.FC = () => {
    // 站点全局布局：主题状态、UIProvider、方向与移动端模式都在这里管理
    const outlet = useOutlet()
    const [searchParams, setSearchParams] = useSearchParams()
    const [{ theme = [], direction, bannerVisible = false, dynamicTheme, isDark = false }, setSiteState] =
        useLayoutState<SiteState>({
            direction: 'ltr',
            theme: [],
            isDark: false,
            bannerVisible: false,
            dynamicTheme: undefined
        })

    const [storedTheme] = useLocalStorage<ThemeName>(REACT_UI_SITE_THEME, {
        defaultValue: undefined
    })

    const [bannerLastTime] = useLocalStorage<string>(REACT_UI_NOT_SHOW_BANNER, {
        defaultValue: undefined
    })

    // 获取最终主题（优先级：URL Query > Local Storage > Site (Memory)）
    const getFinalTheme = (urlTheme: ThemeName[]): ThemeName[] => {
        // 只认 light/dark
        const baseTheme = urlTheme.filter(t => !['light', 'dark', 'auto'].includes(t))
        const urlColor = urlTheme.find(t => t === 'light' || t === 'dark')
        if (urlColor) {
            return [...baseTheme, urlColor]
        }
        if (['light', 'dark', 'auto'].includes(storedTheme)) {
            return [...baseTheme, storedTheme]
        }
        return [...baseTheme, 'auto']
    }

    const [systemTheme, setSystemTheme] = React.useState<'light' | 'dark'>(() => getSystemTheme())

    const bannerData = getBannerData()

    const updateSiteConfig = useCallback(
        (props: SiteState) => {
            setSiteState(prev => ({ ...prev, ...props }))

            const oldSearchStr = searchParams.toString()

            let nextSearchParams: URLSearchParams = searchParams
            Object.entries(props).forEach(kv => {
                const [key, value] = kv as [string, string]

                if (key === 'direction') {
                    if (value === 'rtl') {
                        nextSearchParams.set('direction', 'rtl')
                    } else {
                        nextSearchParams.delete('direction')
                    }
                }
                if (key === 'theme') {
                    const arr = Array.isArray(value) ? value : [value]
                    const base = arr.filter(t => !['light', 'dark', 'auto'].includes(t))
                    const color = arr.find(t => t === 'light' || t === 'dark')
                    if (color) {
                        nextSearchParams = createSearchParams({ ...nextSearchParams, theme: [...base, color] })
                    } else {
                        nextSearchParams.delete('theme')
                    }
                }
            })

            if (nextSearchParams.toString() !== oldSearchStr) {
                setSearchParams(nextSearchParams)
            }
        },
        [searchParams, setSearchParams]
    )

    // 设置 data-prefers-color / data-ui-color-scheme 属性和 isDark 状态
    useEffect(() => {
        const color = theme.find(t => t === 'light' || t === 'dark')
        const html = document.querySelector<HTMLHtmlElement>('html')
        const resolvedColor = theme.includes('auto') && systemTheme ? systemTheme : (color ?? 'light')
        // 无论 theme 是否为空都必须写入：SPA 路由切换时 html 属性会残留上一页的值，
        // dumi 样式读 data-prefers-color、ui 组件读 data-ui-color-scheme，一旦不同步就会半暗半亮
        html?.setAttribute('data-prefers-color', resolvedColor)
        html?.setAttribute('data-ui-color-scheme', resolvedColor)

        setSiteState(prev => ({ ...prev, isDark: isThemeDark(theme, systemTheme) }))
    }, [systemTheme, theme])

    // 监听系统主题变化
    useEffect(() => {
        if (typeof window === 'undefined') {
            return
        }

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            const newSystemTheme = e.matches ? 'dark' : 'light'
            setSystemTheme(newSystemTheme)
        }

        mediaQuery.addEventListener('change', handleSystemThemeChange)

        return () => {
            mediaQuery.removeEventListener('change', handleSystemThemeChange)
        }
    }, [])

    // 主题初始化
    useEffect(() => {
        const urlTheme = searchParams.getAll('theme') as ThemeName[]
        const finalTheme = getFinalTheme(urlTheme)
        const _direction = searchParams.get('direction') as 'rtl' | 'ltr' | undefined
        const _isDark = isThemeDark(finalTheme, systemTheme)

        const storedBannerVisible = bannerLastTime && dayjs().diff(dayjs(bannerLastTime), 'day') >= 1

        const isZhCN = typeof window !== 'undefined' && window.location.pathname.includes('-cn')

        const hasBannerContent = isZhCN && !!bannerData

        setSiteState({
            theme: finalTheme,
            isDark: _isDark,
            direction: _direction === 'rtl' ? 'rtl' : 'ltr',
            bannerVisible: hasBannerContent && (bannerLastTime ? !!storedBannerVisible : true)
        })

    }, [bannerData, bannerLastTime, searchParams, systemTheme])

    const siteContextValue = React.useMemo<SiteContextProps>(
        () => ({
            direction,
            updateSiteConfig,
            theme: theme!,
            isDark: isDark!,
            bannerVisible,
            dynamicTheme
        }),
        [direction, updateSiteConfig, theme, isDark, bannerVisible, dynamicTheme]
    )

    // Sandpack 样式按需注入：动态 import 使 @codesandbox/sandpack-react 整棵依赖树
    // 退出入口编译图（dev 不摇树，静态引入会把全量 sandpack+codemirror 打进 umi.js）
    useEffect(() => {
        if (document.getElementById('sandpack')) return
        import('@codesandbox/sandpack-react').then(({ getSandpackCssText }) => {
            if (document.getElementById('sandpack')) return
            const style = document.createElement('style')
            style.dataset.sandpack = 'true'
            style.id = 'sandpack'
            style.innerHTML = getSandpackCssText()
            document.head.appendChild(style)
        })
    }, [])

    // 「AI 生成主题」产生的配色覆盖：primaryColor + 自定义 brand 色板，
    // 经 UIProvider 合并默认主题并重新生成 CSS 变量，实现整站换肤
    const themeOverride = React.useMemo(() => {
        const dt = dynamicTheme as { primaryColor?: string; colors?: Record<string, string[]> } | undefined
        if (!dt?.colors || !dt.primaryColor) {
            return undefined
        }
        return { colors: dt.colors, primaryColor: dt.primaryColor }
    }, [dynamicTheme])

    return (
        <UIProvider theme={themeOverride} colorScheme={isDark ? 'dark' : 'light'}>
            <DarkContext.Provider value={isDark}>
                {/* 页面级单例渲染器：供通知/弹窗类 demo 使用（store 为空时不渲染内容）。
            注意必须唯一——若在每个 demo 内重复挂载，全局 store 的同一条通知会被渲染 N 次 */}
                <Notifications position="top-right" />
                <ModalsProviderDemo>
                    <SiteContext.Provider value={siteContextValue}>{outlet}</SiteContext.Provider>
                </ModalsProviderDemo>
            </DarkContext.Provider>
            <HotKeysHandler />
            <GaScript />
        </UIProvider>
    )
}

export default GlobalLayout
