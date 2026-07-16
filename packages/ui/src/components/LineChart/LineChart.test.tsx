import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UIProvider } from '../../core'
import { LineChart } from './LineChart'

const DATA = [
    { name: '1月', sales: 4000, profit: 2400 },
    { name: '2月', sales: 3000, profit: 1398 }
]

describe('LineChart', () => {
    it('renders chart root', () => {
        render(
            <UIProvider>
                <LineChart data={DATA} dataKey="name" series={[{ name: 'sales' }]} data-testid="chart" />
            </UIProvider>
        )

        expect(screen.getByTestId('chart')).toBeInTheDocument()
    })

    it('renders with custom height', () => {
        render(
            <UIProvider>
                <LineChart data={DATA} dataKey="name" series={[{ name: 'sales' }]} height={400} data-testid="chart" />
            </UIProvider>
        )

        expect(screen.getByTestId('chart').getAttribute('style')).toContain('--line-chart-height')
    })
})
