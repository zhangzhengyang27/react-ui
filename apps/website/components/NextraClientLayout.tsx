'use client'

import { Layout, Navbar, Footer } from 'nextra-theme-docs'
import { Provider } from '@react-ui/ui'

interface NextraClientLayoutProps {
    children: React.ReactNode
    pageMap: any[]
}

export function NextraClientLayout({ children, pageMap }: NextraClientLayoutProps) {
    return (
        <Provider>
            <Layout
                navbar={
                    <Navbar
                        logo={
                            <span
                                style={{
                                    fontWeight: 700,
                                    fontSize: 18,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 8
                                }}
                            >
                                @react-ui/ui
                            </span>
                        }
                        projectLink="https://github.com/xiaoye-tech/react-ui"
                    />
                }
                pageMap={pageMap}
                docsRepositoryBase="https://github.com/xiaoye-tech/react-ui"
                editLink={null}
                feedback={{ content: null }}
                footer={<Footer>MIT {new Date().getFullYear()} © 小叶科技.</Footer>}
                nextThemes={{
                    defaultTheme: 'dark'
                }}
            >
                {children}
            </Layout>
        </Provider>
    )
}
