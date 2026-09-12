import { DEFAULT_THEME } from '@xiaoye-react/ui'
import { render, screen } from '@testing-library/react'
import { resolveChartColor } from './chart-theme'
import { ChartTooltip } from './ChartTooltip/ChartTooltip'

describe('resolveChartColor', () => {
    it('解析主题 token 为真实颜色值', () => {
        expect(resolveChartColor('indigo.6', DEFAULT_THEME, 'light')).toBe(DEFAULT_THEME.colors.indigo[6])
    })

    it('未带 shade 时使用主色调档位', () => {
        expect(resolveChartColor('indigo', DEFAULT_THEME, 'light')).toBe(DEFAULT_THEME.colors.indigo[6])
        expect(resolveChartColor('indigo', DEFAULT_THEME, 'dark')).toBe(DEFAULT_THEME.colors.indigo[8])
    })

    it('任意 CSS 颜色原样返回', () => {
        expect(resolveChartColor('#ff0000', DEFAULT_THEME, 'dark')).toBe('#ff0000')
    })
})

describe('ChartTooltip', () => {
    const colors = {
        colorScheme: 'light' as const,
        grid: '#eee',
        tick: '#999',
        tooltipBg: '#fff',
        tooltipBorder: '#ddd',
        tooltipTitle: '#000',
        tooltipText: '#555',
        cursor: '#ccc'
    }

    it('active=false 时不渲染', () => {
        const { container } = render(<ChartTooltip colors={colors} active={false} payload={[]} />)
        expect(container).toBeEmptyDOMElement()
    })

    it('渲染 label、系列名与格式化数值', () => {
        render(
            <ChartTooltip
                colors={colors}
                active
                label="2026-09-12"
                unit="次"
                payload={[{ name: 'pv', value: 123, color: '#4066f6' }]}
            />
        )
        expect(screen.getByText('2026-09-12')).toBeInTheDocument()
        expect(screen.getByText('pv')).toBeInTheDocument()
        expect(screen.getByText('123次')).toBeInTheDocument()
    })
})
