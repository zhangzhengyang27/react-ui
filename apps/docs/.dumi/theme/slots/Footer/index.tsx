import React from 'react'
import {
    AiOutlineBgColors,
    AiOutlineBug,
    AiOutlineGithub,
    AiOutlineHistory,
    AiOutlineMessage,
    AiOutlineQuestionCircle,
    AiOutlineRobot
} from '../../icons'
import { FormattedMessage, Link } from 'dumi'

import useLocale from '../../../hooks/useLocale'
import useLocation from '../../../hooks/useLocation'
import SiteContext from '../SiteContext'
import AdditionalInfo from './AdditionalInfo'

import classes from './Footer.module.css'

const locales = {
    cn: {
        owner: 'react-ui 开源社区'
    },
    en: {
        owner: 'react-ui Community'
    }
}

const REACT_UI_GITHUB = 'https://github.com/xiaoye/react-ui'

interface FooterLinkItem {
    icon?: React.ReactNode
    title: React.ReactNode
    description?: string
    url: string
    openExternal?: boolean
}

interface FooterColumn {
    title: React.ReactNode
    items: FooterLinkItem[]
}

const Footer: React.FC = () => {
    const location = useLocation()
    const [locale] = useLocale(locales)
    const { isMobile } = React.use(SiteContext)

    const { getLink } = location

    const getColumns = React.useMemo<FooterColumn[]>(() => {
        const col1: FooterColumn = {
            title: <FormattedMessage id="app.footer.resources" />,
            items: [
                {
                    title: 'react-ui Charts',
                    url: '/docs/charts/getting-started'
                },
                {
                    title: 'react-ui Hooks',
                    url: '/docs/hooks/package'
                },
                {
                    title: 'react-ui Form',
                    url: '/docs/form/package'
                },
                {
                    title: 'react-ui Theming',
                    url: '/docs/theming/theme-object'
                },
                {
                    title: 'dumi',
                    description: '文档站点框架',
                    url: 'https://d.umijs.org',
                    openExternal: true
                },
                {
                    title: 'Umi',
                    description: '企业级前端框架',
                    url: 'https://umijs.org',
                    openExternal: true
                }
            ]
        }

        const col2: FooterColumn = {
            title: <FormattedMessage id="app.footer.help" />,
            items: [
                {
                    icon: <AiOutlineGithub />,
                    title: 'GitHub',
                    url: REACT_UI_GITHUB,
                    openExternal: true
                },
                {
                    icon: <AiOutlineHistory />,
                    title: <FormattedMessage id="app.footer.change-log" />,
                    url: getLink('/changelog')
                },
                {
                    icon: <AiOutlineQuestionCircle />,
                    title: <FormattedMessage id="app.footer.faq" />,
                    url: `${REACT_UI_GITHUB}/discussions`,
                    openExternal: true
                },
                {
                    icon: <AiOutlineRobot />,
                    title: 'For Agents',
                    url: '/.well-known/agent-skills/index.json',
                    openExternal: true
                },
                {
                    icon: <AiOutlineBug />,
                    title: <FormattedMessage id="app.footer.bug-report" />,
                    url: `${REACT_UI_GITHUB}/issues/new`,
                    openExternal: true
                },
                {
                    icon: <AiOutlineMessage />,
                    title: <FormattedMessage id="app.footer.discussions" />,
                    url: `${REACT_UI_GITHUB}/discussions`,
                    openExternal: true
                },
                {
                    icon: <AiOutlineBgColors />,
                    title: <FormattedMessage id="app.footer.theme" />,
                    url: getLink('/theme-editor')
                }
            ]
        }

        return [col1, col2]
    }, [getLink])

    const renderLink = (item: FooterLinkItem) => {
        const children = (
            <>
                {item.icon && <span className={classes.itemIcon}>{item.icon}</span>}
                <span>{item.title}</span>
                {item.description && <span className={classes.description}>{item.description}</span>}
            </>
        )

        return item.openExternal ? (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className={classes.link}>
                {children}
            </a>
        ) : (
            <Link to={item.url} className={classes.link}>
                {children}
            </Link>
        )
    }

    return (
        <>
            <footer className={classes.footer}>
                <div className={classes.container}>
                    <div className={classes.columns}>
                        {getColumns.map((column, index) => (
                            <div key={index} style={{ marginBottom: isMobile && index === 0 ? 60 : 0 }}>
                                <h2 className={classes.columnTitle}>{column.title}</h2>
                                {column.items.map((item, itemIndex) => (
                                    <div key={`${index}-${itemIndex}-${item.url}`} className={classes.item}>
                                        {renderLink(item)}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                    <div className={classes.bottom}>
                        <div style={{ opacity: 0.4 }}>
                            Made with <span className={classes.heart}>❤</span> by
                        </div>
                        <div className={classes.owner}>{locale.owner}</div>
                    </div>
                </div>
            </footer>
            <AdditionalInfo />
        </>
    )
}

export default Footer
