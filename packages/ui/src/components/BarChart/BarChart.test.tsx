import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UIProvider } from '../../core'
import { BarChart } from './BarChart'

const DATA = [
    { name: '1月', sales: 4000 },
    { name: '2月', sales: 3000 }
]

describe('BarChart', () => {
    it('renders chart root', () => {
        render(
            <UIProvider>
                <BarChart data={DATA} dataKey="name" series={[{ name: 'sales' }]} data-testid="chart" />
            </UIProvider>
        )

        expect(screen.getByTestId('chart')).toBeInTheDocument()
    })

    it('renders with custom height', () => {
        render(
            <UIProvider>
                <BarChart data={DATA} dataKey="name" series={[{ name: 'sales' }]} height={400} data-testid="chart" />
            </UIProvider>
        )

        expect(screen.getByTestId('chart').getAttribute('style')).toContain('--bar-chart-height')
    })
})
