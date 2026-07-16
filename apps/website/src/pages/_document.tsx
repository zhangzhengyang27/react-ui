import { Head, Html, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'
import { readFileSync } from 'fs'
import { join } from 'path'
import { ColorSchemeScript } from '@react-ui/ui'

interface MyDocumentProps extends DocumentInitialProps {
    css: string
}

export default function Document({ css }: MyDocumentProps) {
    return (
        <Html lang="zh-CN" data-ui-color-scheme="light">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
                    rel="stylesheet"
                />
                <ColorSchemeScript defaultColorScheme="light" />
                <style dangerouslySetInnerHTML={{ __html: css }} />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

Document.getInitialProps = async (ctx: DocumentContext): Promise<MyDocumentProps> => {
    const initialProps = await ctx.defaultGetInitialProps(ctx)
    const uiCss = readFileSync(join(process.cwd(), '../../packages/ui/es/style.css'), 'utf-8')
    const variablesCss = readFileSync(join(process.cwd(), 'src/styles/variables.css'), 'utf-8')
    return {
        ...initialProps,
        css: `${uiCss}\n${variablesCss}`
    }
}
