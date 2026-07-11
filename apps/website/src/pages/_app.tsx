import { AppProps } from 'next/app'
import Head from 'next/head'
import { CodeHighlightAdapterProvider, createShikiAdapter } from '@react-ui/code-highlight'
import { DirectionProvider, MantineProvider, Notifications } from '@react-ui/ui'
import { MantineEmotionProvider } from '@react-ui/emotion'
import { useHotkeys, useLocalStorage } from '@react-ui/hooks'
import { GaScript } from '@/components/GaScript'
import { HotKeysHandler } from '@/components/HotKeysHandler'
import { MdxProvider } from '@/components/MdxProvider'
import { ModalsProviderDemo } from '@/components/ModalsProviderDemo'
import { Search } from '@/components/Search'
import { Shell } from '@/components/Shell'
import { theme } from '../../theme'
import { emotionCache } from '../emotion'

const excludeShell = ['/', '/combobox', '/app-shell']

async function loadShiki() {
    const { createHighlighter } = await import('shiki')
    const shiki = await createHighlighter({
        langs: ['tsx', 'scss', 'html', 'bash', 'json'],
        themes: []
    })

    return shiki
}

const shikiAdapter = createShikiAdapter(loadShiki)

export default function App({ Component, pageProps, router }: AppProps) {
    const shouldRenderShell = !excludeShell.includes(router.pathname)
    const [navbarOpened, setNavbarOpened] = useLocalStorage({
        key: 'mantine-navbar-opened',
        defaultValue: true
    })

    useHotkeys([['mod + alt + N', () => setNavbarOpened(!navbarOpened)]])

    return (
        <>
            <Head>
                <title>ReactUI</title>
                <meta
                    name="description"
                    content="A fully featured React components library with 120+ customizable components, hooks, and utilities. Build accessible web applications faster."
                />
                <link rel="shortcut icon" href="/favicon.svg" />
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
                />
                <meta name="og:image:width" content="1280" />
                <meta name="og:image:height" content="640" />
                <meta name="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="@xiaoye" />
                <meta
                    name="og:image"
                    content="/social-preview.png"
                />
            </Head>
            <GaScript />
            <DirectionProvider initialDirection="ltr" detectDirection={false}>
                <MantineEmotionProvider cache={emotionCache}>
                    <MantineProvider theme={theme} defaultColorScheme="light">
                        <CodeHighlightAdapterProvider adapter={shikiAdapter}>
                            <Search />
                            <Notifications />
                            <ModalsProviderDemo>
                                <MdxProvider>
                                    <HotKeysHandler />
                                    {shouldRenderShell ? (
                                        <Shell>
                                            <Component {...pageProps} />
                                        </Shell>
                                    ) : (
                                        <Component {...pageProps} />
                                    )}
                                </MdxProvider>
                            </ModalsProviderDemo>
                        </CodeHighlightAdapterProvider>
                    </MantineProvider>
                </MantineEmotionProvider>
            </DirectionProvider>
        </>
    )
}
