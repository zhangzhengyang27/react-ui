import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Descriptions } from './Descriptions'

const wrapper = ({ children }: { children: React.ReactNode }) => <UIProvider>{children}</UIProvider>

describe('Descriptions', () => {
    it('渲染描述项的标签与内容', () => {
        render(
            <Descriptions>
                <Descriptions.Item label="名称">react-ui</Descriptions.Item>
                <Descriptions.Item label="版本">1.1.0</Descriptions.Item>
            </Descriptions>,
            { wrapper }
        )

        expect(screen.getByRole('table')).toBeInTheDocument()
        expect(screen.getByText('名称')).toBeInTheDocument()
        expect(screen.getByText('react-ui')).toBeInTheDocument()
        expect(screen.getByText('1.1.0')).toBeInTheDocument()
    })

    it('span 让内容占据多列', () => {
        render(
            <Descriptions columns={3}>
                <Descriptions.Item label="名称">react-ui</Descriptions.Item>
                <Descriptions.Item label="描述" span={2}>
                    一套 React 组件库
                </Descriptions.Item>
            </Descriptions>,
            { wrapper }
        )

        const valueCell = screen.getByText('一套 React 组件库').closest('td')!
        expect(valueCell).toHaveAttribute('colspan', '3') // span 2 → 2*2-1 物理列
    })

    it('span 超过剩余空间时整项换行', () => {
        render(
            <Descriptions columns={2}>
                <Descriptions.Item label="A">1</Descriptions.Item>
                <Descriptions.Item label="B">2</Descriptions.Item>
                <Descriptions.Item label="C">3</Descriptions.Item>
            </Descriptions>,
            { wrapper }
        )

        const rows = screen.getAllByRole('row')
        expect(rows).toHaveLength(2)
    })

    it('bordered 模式添加 data 属性与表头单元格', () => {
        const { container } = render(
            <Descriptions bordered columns={1}>
                <Descriptions.Item label="名称">react-ui</Descriptions.Item>
            </Descriptions>,
            { wrapper }
        )

        expect(container.querySelector('table')).toHaveAttribute('data-bordered')
        expect(screen.getByRole('rowheader')).toBeInTheDocument()
    })

    it('vertical 布局在单元格内堆叠标签与内容', () => {
        render(
            <Descriptions layout="vertical" columns={2}>
                <Descriptions.Item label="名称">react-ui</Descriptions.Item>
                <Descriptions.Item label="版本">1.1.0</Descriptions.Item>
            </Descriptions>,
            { wrapper }
        )

        const cell = screen.getByText('react-ui').closest('td')!
        expect(cell).toHaveAttribute('colspan', '1')
        expect(cell.textContent).toContain('名称')
    })

    it('忽略非 Descriptions.Item 子元素', () => {
        render(
            <Descriptions>
                <div>not-an-item</div>
                <Descriptions.Item label="名称">react-ui</Descriptions.Item>
            </Descriptions>,
            { wrapper }
        )

        expect(screen.queryByText('not-an-item')).not.toBeInTheDocument()
        expect(screen.getByText('react-ui')).toBeInTheDocument()
    })
})
