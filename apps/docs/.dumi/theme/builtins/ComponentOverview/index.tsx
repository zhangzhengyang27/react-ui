import React, { memo, useMemo, useRef, useState } from 'react'
import { AiOutlineSearch } from '../../icons'
import { Badge, Card, Divider, Flex, TextInput, Title } from '@xiaoye-react/ui'
import { useIntl, useLocation, useSidebarData } from 'dumi'
import debounce from 'lodash/debounce'
import scrollIntoView from 'scroll-into-view-if-needed'

import Link from '../../common/Link'
import SiteContext from '../../slots/SiteContext'
import type { Component } from './ProComponentsList'
import proComponentsList from './ProComponentsList'

import classes from './index.module.css'

const onClickCard = (pathname: string) => {
    window.gtag?.('event', '点击', {
        event_category: '组件总览卡片',
        event_label: pathname
    })
}

const reportSearch = debounce<(value: string) => void>(value => {
    window.gtag?.('event', '搜索', {
        event_category: '组件总览卡片',
        event_label: value
    })
}, 2000)

const Overview: React.FC = () => {
    const { isDark } = React.use(SiteContext)

    const data = useSidebarData()

    const { search: urlSearch } = useLocation()
    const { locale, formatMessage } = useIntl()

    const [search, setSearch] = useState<string>(() => {
        const params = new URLSearchParams(urlSearch)
        if (params.has('s')) {
            return params.get('s') || ''
        }
        return ''
    })

    const sectionRef = useRef<HTMLElement>(null)

    const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
        if (event.keyCode === 13 && search.trim().length) {
            sectionRef.current?.querySelector<HTMLElement>(`.${classes.card}`)?.click()
        }
    }

    const groups = useMemo<{ title: string; children: Component[] }[]>(
        () =>
            data
                .filter(item => item?.title)
                .map<{ title: string; children: Component[] }>(item => ({
                    title: item?.title || '',
                    children: item.children.map(child => ({
                        title: child.frontmatter?.title || '',
                        subtitle: child.frontmatter?.subtitle,
                        cover: child.frontmatter?.cover,
                        coverDark: child.frontmatter?.coverDark,
                        link: child.link
                    }))
                }))
                .concat([
                    {
                        title: locale === 'zh-CN' ? '重型组件' : 'Others',
                        children:
                            locale === 'zh-CN'
                                ? proComponentsList
                                : proComponentsList.map(component => ({ ...component, subtitle: '' }))
                    }
                ]),
        [data, locale]
    )

    return (
        <section className="markdown" ref={sectionRef}>
            <Divider />
            <div className={classes.searchAffix}>
                <TextInput
                    autoFocus
                    value={search}
                    placeholder={formatMessage({ id: 'app.components.overview.search' })}
                    className={classes.search}
                    onChange={e => {
                        setSearch(e.target.value)
                        reportSearch(e.target.value)
                        if (sectionRef.current) {
                            scrollIntoView(sectionRef.current, {
                                scrollMode: 'if-needed',
                                block: 'start',
                                behavior: actions =>
                                    actions.forEach(({ el, top }) => {
                                        el.scrollTop = top - 64
                                    })
                            })
                        }
                    }}
                    onKeyDown={onKeyDown}
                    leftSection={<AiOutlineSearch />}
                    size="lg"
                />
            </div>
            <Divider />
            <div className={classes.content}>
                {groups
                    .filter(i => i?.title)
                    .map(group => {
                        const components = group?.children?.filter(
                            component =>
                                !search.trim() ||
                                component?.title?.toLowerCase()?.includes(search.trim().toLowerCase()) ||
                                (component?.subtitle || '').toLowerCase().includes(search.trim().toLowerCase())
                        )
                        return components?.length ? (
                            <div key={group?.title}>
                                <Title order={2} className={classes.groupTitle}>
                                    <Flex gap="sm" align="center">
                                        <span style={{ fontSize: 24 }}>{group?.title}</span>
                                        <Badge variant="light">{components.length}</Badge>
                                    </Flex>
                                </Title>
                                <div className={classes.grid}>
                                    {components.map(component => {
                                        let url = component.link
                                        let src = component.cover

                                        /** 是否是外链 */
                                        const isExternalLink = url.startsWith('http')

                                        if (!isExternalLink) {
                                            url += urlSearch
                                        }

                                        if (isDark && component.coverDark) {
                                            src = component.coverDark
                                        }

                                        const cardContent = (
                                            <Card
                                                key={component.title}
                                                onClick={() => onClickCard(url)}
                                                withBorder
                                                padding="sm"
                                                className={classes.card}
                                                shadow="sm"
                                            >
                                                <div className={classes.cardTitle}>
                                                    {component.title} {component.subtitle}
                                                </div>
                                                <div className={classes.cardImg}>
                                                    {src && (
                                                        <img
                                                            src={src}
                                                            alt={component.title}
                                                            title={component.title}
                                                            draggable={false}
                                                        />
                                                    )}
                                                </div>
                                            </Card>
                                        )

                                        const linkContent = isExternalLink ? (
                                            <a
                                                href={url}
                                                key={`${component.title}-external-link`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {cardContent}
                                            </a>
                                        ) : (
                                            <Link to={url} key={`${component.title}-internal-link`}>
                                                {cardContent}
                                            </Link>
                                        )

                                        return (
                                            <div key={component.title} className={classes.col}>
                                                {linkContent}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ) : null
                    })}
            </div>
        </section>
    )
}

export default memo(Overview)
