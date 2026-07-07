'use client'

import { Layout, Navbar, Footer } from 'nextra-theme-docs'
import { Search } from 'nextra/components'
import { Box, Zap } from 'lucide-react'
import { Provider } from '@react-ui/ui'

interface NextraClientLayoutProps {
    children: React.ReactNode
    pageMap: any[]
}

function Logo() {
    return (
        <span
            style={{
                fontWeight: 700,
                fontSize: 18,
                display: 'flex',
                alignItems: 'center',
                gap: 8
            }}
        >
            <span
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: 'var(--nextra-primary-color, #0070f3)',
                    color: '#fff'
                }}
            >
                <Box size={18} />
            </span>
            @react-ui/ui
        </span>
    )
}

function AppFooter() {
    return (
        <Footer>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 12,
                    width: '100%'
                }}
            >
                <span>MIT {new Date().getFullYear()} © 小叶科技.</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Zap size={14} />
                    基于 React 19 + TypeScript 构建
                </span>
            </div>
        </Footer>
    )
}

export function NextraClientLayout({ children, pageMap }: NextraClientLayoutProps) {
    return (
        <Provider>
            <Layout
                navbar={<Navbar logo={<Logo />} projectLink="https://github.com/xiaoye-tech/react-ui" />}
                search={<Search placeholder="搜索文档..." />}
                pageMap={pageMap}
                docsRepositoryBase="https://github.com/xiaoye-tech/react-ui"
                editLink={null}
                feedback={{ content: null }}
                footer={<AppFooter />}
                nextThemes={{
                    defaultTheme: 'dark'
                }}
            >
                {children}
            </Layout>
        </Provider>
    )
}
