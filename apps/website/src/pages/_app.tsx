import { AppProps } from 'next/app'
import Head from 'next/head'
import { CodeHighlightAdapterProvider, createShikiAdapter } from '@react-ui/code-highlight'
import { DirectionProvider, UIProvider, Notifications } from '@react-ui/ui'
import { UIEmotionProvider } from '@react-ui/emotion'
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

    return (
        <>
            <Head>
                <title>ReactUI</title>
                <meta
                    name="description"
                    content="一个功能完整的 React 组件库，包含 120+ 可定制组件、Hooks 与工具，助你更快构建无障碍 Web 应用。"
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
                <UIEmotionProvider cache={emotionCache}>
                    <UIProvider theme={theme} defaultColorScheme="light">
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
                    </UIProvider>
                </UIEmotionProvider>
            </DirectionProvider>
        </>
    )
}
