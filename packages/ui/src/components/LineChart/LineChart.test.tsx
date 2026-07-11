import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { LineChart } from './LineChart'

const DATA = [
    { name: '1月', sales: 4000, profit: 2400 },
    { name: '2月', sales: 3000, profit: 1398 }
]

describe('LineChart', () => {
    it('renders chart root', () => {
        render(
            <MantineProvider>
                <LineChart data={DATA} dataKey="name" series={[{ name: 'sales' }]} data-testid="chart" />
            </MantineProvider>
        )

        expect(screen.getByTestId('chart')).toBeInTheDocument()
    })

    it('renders with custom height', () => {
        render(
            <MantineProvider>
                <LineChart data={DATA} dataKey="name" series={[{ name: 'sales' }]} height={400} data-testid="chart" />
            </MantineProvider>
        )

        expect(screen.getByTestId('chart').getAttribute('style')).toContain('--line-chart-height')
    })
})
