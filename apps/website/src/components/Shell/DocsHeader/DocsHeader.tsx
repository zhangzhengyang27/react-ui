import Link from 'next/link'
import { useRouter } from 'next/router'
import { CaretDownIcon } from '@phosphor-icons/react'
import { Burger, Container, Menu, UnstyledButton } from '@react-ui/ui'
import { HeaderControls } from '@react-ui/header'
import { ReactUILogo } from '@react-ui/logo'
import { meta } from '@react-ui/meta'
import { searchHandlers } from '@/components/Search'
import { MDX_DATA, MdxNavCategory } from '@/mdx'
import packageJson from '../../../../../../package.json'
import { getActiveCategory } from '../get-active-category'
import { useShellContext } from '../Shell.context'
import classes from './DocsHeader.module.css'

const mainLinksData = [
    { link: '/colors-generator', label: '颜色生成器' }
]

interface NavigationLinkData {
    link: string
    label: string
    category: MdxNavCategory
}

const navigationLinksData: NavigationLinkData[] = [
    { link: MDX_DATA.GettingStarted.slug, label: '快速开始', category: 'gettingStarted' },
    { link: MDX_DATA.UIProvider.slug, label: '主题与样式', category: 'theming' },
    { link: MDX_DATA.HooksPackage.slug, label: '钩子', category: 'hooks' },
    { link: MDX_DATA.FormPackage.slug, label: '表单', category: 'form' },
    { link: MDX_DATA.CorePackage.slug, label: '组件', category: 'components' },
    { link: MDX_DATA.ExtensionsPackage.slug, label: '扩展', category: 'extensions' }
]

interface DocsHeaderProps {
    headerControlsProps?: Partial<React.ComponentProps<typeof HeaderControls>>
    withNav?: boolean
}

export function DocsHeader({ headerControlsProps, withNav }: DocsHeaderProps) {
    const router = useRouter()
    const activeCategory = getActiveCategory(router.pathname)
    const ctx = useShellContext()

    const mainLinks = mainLinksData.map(link => (
        <Link key={link.label} href={link.link} className={classes.mainLink}>
            {link.label}
        </Link>
    ))

    const navigationLinks = navigationLinksData.map(link => (
        <Link
            key={link.label}
            href={link.link}
            className={classes.mainLink}
            data-active={activeCategory === link.category || undefined}
        >
            {link.label}
        </Link>
    ))

    return (
        <header className={classes.header} data-without-nav={!withNav || undefined}>
            <Container size={1440}>
                <div className={classes.headerMain}>
                    <div className={classes.headerMainWrapper}>
                        <Burger
                            opened={ctx.navbarOpened}
                            size={20}
                            lineSize={2}
                            className={classes.burger}
                            onClick={ctx.toggleNavbar}
                        />

                        <div className={classes.headerMainSection}>
                            <Link href="/" className={classes.logoLink} aria-label="ReactUI 首页">
                                <ReactUILogo size={32} />
                            </Link>
                            <div className={classes.mainLinks}>
                            {mainLinks}
                            {withNav && navigationLinks}
                        </div>
                        </div>
                    </div>

                    <div className={classes.desktopHeaderControls}>
                        <Menu
                            width={180}
                            withinPortal={false}
                            radius="md"
                            position="bottom-start"
                            transitionProps={{ transition: 'pop', duration: 100 }}
                        >
                            <Menu.Target>
                                <UnstyledButton className={classes.versionControl}>
                                    <span>v{packageJson.version}</span>
                                    <CaretDownIcon size={16} className={classes.versionChevron} />
                                </UnstyledButton>
                            </Menu.Target>

                            <Menu.Dropdown>
                                <Menu.Item
                                    component="a"
                                    c="bright"
                                    href={meta.gitHubLinks.releases}
                                    target="_blank"
                                >
                                    <b>v{packageJson.version}</b>{' '}
                                    GitHub 发布页
                                </Menu.Item>
                            </Menu.Dropdown>
                        </Menu>

                        <HeaderControls
                            className={classes.controls}
                            onSearch={searchHandlers.open}
                            githubLink={meta.gitHubLinks.reactui}
                            withDiscord={false}
                            {...headerControlsProps}
                        />
                    </div>
                </div>

            </Container>
        </header>
    )
}
