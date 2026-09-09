import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '@xiaoye-react/ui'
import { PageContainer } from './PageContainer'

const wrapper = ({ children }: { children: React.ReactNode }) => <UIProvider>{children}</UIProvider>

describe('@xiaoye-react/pro/PageContainer', () => {
    it('渲染标题、副标题与面包屑', () => {
        render(
            <PageContainer title="用户管理" subtitle="管理平台账号" breadcrumbs={<nav>首页 / 用户</nav>}>
                <div>content</div>
            </PageContainer>,
            { wrapper }
        )

        expect(screen.getByText('用户管理')).toBeInTheDocument()
        expect(screen.getByText('管理平台账号')).toBeInTheDocument()
        expect(screen.getByText('首页 / 用户')).toBeInTheDocument()
        expect(screen.getByText('content')).toBeInTheDocument()
    })

    it('extra 操作区渲染在标题行', () => {
        render(
            <PageContainer title="用户管理" extra={<button type="button">新建用户</button>}>
                <div>content</div>
            </PageContainer>,
            { wrapper }
        )

        expect(screen.getByRole('button', { name: '新建用户' })).toBeInTheDocument()
    })

    it('无标题相关 props 时不渲染 header，仅渲染内容', () => {
        const { container } = render(
            <PageContainer>
                <div>content-only</div>
            </PageContainer>,
            { wrapper }
        )

        expect(container.querySelector('header')).toBeNull()
        expect(screen.getByText('content-only')).toBeInTheDocument()
    })
})
