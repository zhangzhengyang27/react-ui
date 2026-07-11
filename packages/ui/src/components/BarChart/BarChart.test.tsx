import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { BarChart } from './BarChart'

const DATA = [
    { name: '1月', sales: 4000 },
    { name: '2月', sales: 3000 }
]

describe('BarChart', () => {
    it('renders chart root', () => {
        render(
            <MantineProvider>
                <BarChart data={DATA} dataKey="name" series={[{ name: 'sales' }]} data-testid="chart" />
            </MantineProvider>
        )

        expect(screen.getByTestId('chart')).toBeInTheDocument()
    })

    it('renders with custom height', () => {
        render(
            <MantineProvider>
                <BarChart data={DATA} dataKey="name" series={[{ name: 'sales' }]} height={400} data-testid="chart" />
            </MantineProvider>
        )

        expect(screen.getByTestId('chart').getAttribute('style')).toContain('--bar-chart-height')
    })
})
