import { getPageMap } from 'nextra/page-map'
import 'nextra-theme-docs/style.css'
import './globals.css'
import { NextraClientLayout } from '../components/NextraClientLayout'

export const metadata = {
    title: {
        default: '小叶科技 | @react-ui/ui',
        template: '%s | @react-ui/ui'
    },
    description: '小叶科技官方 React UI 组件库'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const pageMap = await getPageMap()

    return (
        <html lang="zh-CN" suppressHydrationWarning>
            <body>
                <NextraClientLayout pageMap={pageMap}>{children}</NextraClientLayout>
            </body>
        </html>
    )
}
