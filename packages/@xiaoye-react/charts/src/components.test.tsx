import { UIProvider } from '@xiaoye-react/ui'
import { render, screen } from '@testing-library/react'
import { AreaChart } from './AreaChart/AreaChart'
import { BarChart } from './BarChart/BarChart'
import { DonutChart } from './DonutChart/DonutChart'
import { LineChart } from './LineChart/LineChart'
import { Sparkline } from './Sparkline/Sparkline'

const data = [
    { date: '09-10', pv: 100, uv: 40 },
    { date: '09-11', pv: 160, uv: 66 },
    { date: '09-12', pv: 130, uv: 52 }
]

const series = [
    { name: 'pv', color: 'indigo.6' },
    { name: 'uv', color: 'teal.6' }
]

function Wrapper({ children }: { children: React.ReactNode }) {
    return <UIProvider>{children}</UIProvider>
}

describe.each([
    ['AreaChart', AreaChart],
    ['LineChart', LineChart],
    ['BarChart', BarChart]
])('%s', (_name, Chart) => {
    it('渲染图例与系列（smoke）', () => {
        render(
            <Wrapper>
                <Chart data={data} dataKey="date" series={series} withLegend h={200} />
            </Wrapper>
        )
        expect(screen.getByText('pv')).toBeInTheDocument()
        expect(screen.getByText('uv')).toBeInTheDocument()
    })

    it('withLegend=false 时不渲染图例', () => {
        render(
            <Wrapper>
                <Chart data={data} dataKey="date" series={series} h={200} />
            </Wrapper>
        )
        expect(screen.queryByText('pv')).not.toBeInTheDocument()
    })
})

describe('DonutChart', () => {
    it('渲染图例（smoke）', () => {
        render(
            <Wrapper>
                <DonutChart
                    h={200}
                    withLegend
                    data={[
                        { name: 'Chrome', value: 60, color: 'blue.6' },
                        { name: 'Safari', value: 30, color: 'teal.6' }
                    ]}
                />
            </Wrapper>
        )
        expect(screen.getByText('Chrome')).toBeInTheDocument()
        expect(screen.getByText('Safari')).toBeInTheDocument()
    })
})

describe('Sparkline', () => {
    it('渲染 svg 路径', () => {
        const { container } = render(
            <Wrapper>
                <Sparkline data={[3, 8, 5, 12, 9]} h={40} />
            </Wrapper>
        )
        const path = container.querySelector('svg path[fill="none"]')
        expect(path).not.toBeNull()
        expect(path?.getAttribute('d')).toMatch(/^M /)
    })

    it('withAreaFill 渲染填充路径', () => {
        const { container } = render(
            <Wrapper>
                <Sparkline data={[1, 5, 3]} withAreaFill h={40} />
            </Wrapper>
        )
        expect(container.querySelector('path[fill-opacity]')).not.toBeNull()
    })
})
