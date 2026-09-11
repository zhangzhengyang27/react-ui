import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { AiOutlineGithub } from '../../icons'
import { ActionIcon, Alert, Popover, Select, Tooltip } from '@xiaoye-react/ui'
import { clsx } from 'clsx'
import dayjs from 'dayjs'
import { useLocation, useSiteData } from 'dumi'
import DumiSearchBar from 'dumi/theme-default/slots/SearchBar'
import useSWR from 'swr'

import versionsFile from '../../../../public/versions.json'
import useLocale from '../../../hooks/useLocale'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { getBannerData } from '../../../pages/index/components/util'
import ThemeSwitch from '../../common/ThemeSwitch'
import DirectionIcon from '../../icons/DirectionIcon'
import { REACT_UI_NOT_SHOW_BANNER } from '../../layouts/GlobalLayout'

import SiteContext from '../SiteContext'
import type { SharedProps } from './interface'
import Logo from './Logo'
import Navigation from './Navigation'
import SponsorsNav from './SponsorsNav'
import SwitchBtn from './SwitchBtn'
import classes from './Header.module.css'

interface VersionItem {
    version: string
    url: string
    chineseMirrorUrl?: string
}

const fetcher = (...args: Parameters<typeof fetch>) => {
    return fetch(...args).then(res => res.json())
}

// ================================= Header =================================
const Header: React.FC = () => {
    const [, lang] = useLocale()

    const { pkg } = useSiteData()

    const isChineseMirror = false

    const { data: versions = [], isLoading } = useSWR<VersionItem[]>(
        process.env.NODE_ENV === 'production' && typeof window !== 'undefined'
            ? `${window.location.origin}/versions.json`
            : null,
        fetcher,
        {
            fallbackData: versionsFile,
            errorRetryCount: 3
        }
    )

    const versionOptions = useMemo(() => {
        if (isLoading) {
            return []
        }
        return versions.map<{ value: string; label: string }>(item => ({
            value: isChineseMirror && item.chineseMirrorUrl ? item.chineseMirrorUrl : item.url,
            label: item.version
        }))
    }, [versions, isLoading, isChineseMirror])

    const { direction, bannerVisible, updateSiteConfig } = React.use(SiteContext)
    const location = useLocation()
    const { pathname, search } = location

    const [, setTopBannerDay] = useLocalStorage<string>(REACT_UI_NOT_SHOW_BANNER, {
        defaultValue: undefined
    })

    const onDirectionChange = () => {
        updateSiteConfig({ direction: direction !== 'rtl' ? 'rtl' : 'ltr' })
    }

    const onBannerClose = () => {
        updateSiteConfig({ bannerVisible: false })
        setTopBannerDay(dayjs().toISOString())
    }

    // dumi 内置 SearchBar 的 input 元素缺少 id/name/aria-label，触发 a11y 警告。
    // 在此通过 useEffect 注入这些属性，让 label[for] 与 input[id] 能正确关联。
    useEffect(() => {
        const input = document.querySelector<HTMLInputElement>('.dumi-default-search-bar-input')
        if (input) {
            input.setAttribute('id', 'dumi-search-input')
            input.setAttribute('name', 'dumi-search')
            if (!input.getAttribute('aria-label')) {
                input.setAttribute('aria-label', lang === 'cn' ? '搜索文档' : 'Search docs')
            }
        }
    }, [location, lang])

    const handleVersionChange = useCallback((url: string) => {
        const currentUrl = window.location.href
        const currentPathname = window.location.pathname
        if (/overview/.test(currentPathname) && /0?[1-39][0-3]?x/.test(url)) {
            window.location.href = currentUrl
                .replace(window.location.origin, url)
                .replace(/\/components\/overview/, `/docs${/0(9|10)x/.test(url) ? '' : '/react'}/introduce`)
                .replace(/\/$/, '')
            return
        }
        window.location.href = currentUrl.replace(window.location.origin, url).replace(/\/$/, '')
    }, [])

    const nextDirectionText = useMemo<string>(() => (direction !== 'rtl' ? 'RTL' : 'LTR'), [direction])

    // dumi 的首页 pathname 是 '/'；'/index(-cn)' 兼容历史的首页路由别名
    const isHome = ['/', '/index', '/index-cn'].includes(pathname)
    const isZhCN = lang === 'cn'
    const isRTL = direction === 'rtl'

    // Get banner data from site config
    const bannerData = getBannerData()
    const bannerTitle = bannerData?.title || ''
    const bannerHref = bannerData?.href || ''

    const headerClassName = clsx(classes.header, 'clearfix', { 'home-header': isHome })

    const sharedProps: SharedProps = {
        isZhCN,
        isRTL
    }

    const navigationNode = (
        <Navigation
            key="nav"
            {...sharedProps}
            directionText={nextDirectionText}
            onDirectionChange={onDirectionChange}
        />
    )

    const menu: React.ReactNode[] = [
        navigationNode,
        <SponsorsNav key="sponsors" />,
        <Select
            key="version"
            size="xs"
            data={versionOptions}
            defaultValue="/"
            onChange={handleVersionChange}
            className={classes.versionSelect}
        />,
        <SwitchBtn
            key="direction"
            onClick={onDirectionChange}
            value={direction === 'rtl' ? 2 : 1}
            label1={<DirectionIcon className={classes.dataDirectionIcon} direction="ltr" />}
            tooltip1="LTR"
            label2={<DirectionIcon className={classes.dataDirectionIcon} direction="rtl" />}
            tooltip2="RTL"
            pure
            aria-label="RTL Switch Button"
        />,
        <ThemeSwitch key="theme" />,
        <a key="github" href="https://github.com/zhangzhengyang27/react-ui" target="_blank" rel="noopener noreferrer">
            <Tooltip label="GitHub">
                <ActionIcon variant="transparent" size="lg">
                    <AiOutlineGithub />
                </ActionIcon>
            </Tooltip>
        </a>
    ]

    const barClassName = isHome ? `${classes.bar} ${classes.barHome}` : `${classes.bar} ${classes.barNotHome}`

    return (
        <header className={headerClassName}>
            {isZhCN && bannerVisible && bannerTitle && bannerHref && (
                <Alert className={classes.banner} withCloseButton onClose={onBannerClose} color="blue" variant="filled">
                    <span>{bannerTitle}</span>
                    <a
                        className={classes.link}
                        href={bannerHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                            window.gtag?.('event', '点击', {
                                event_category: 'top_banner',
                                event_label: bannerHref
                            })
                        }}
                    >
                        前往了解
                    </a>
                </Alert>
            )}
            <div className={barClassName}>
                <div className={classes.logoCol}>
                    <Logo {...sharedProps} location={location} />
                </div>
                <div className={classes.menuCol}>
                    <div className={classes.menuRow}>
                        <DumiSearchBar />
                        {/* 本站不做移动端适配：导航栏始终渲染完整菜单，不提供汉堡折叠形态 */}
                        {menu}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
