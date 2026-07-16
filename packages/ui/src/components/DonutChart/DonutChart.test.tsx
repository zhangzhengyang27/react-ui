import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UIProvider } from '../../core'
import { DonutChart } from './DonutChart'

const DATA = [
    { name: 'A', value: 10 },
    { name: 'B', value: 20 },
    { name: 'C', value: 30 }
]

describe('DonutChart', () => {
    it('renders chart root', () => {
        render(
            <UIProvider>
                <DonutChart data={DATA} nameKey="name" valueKey="value" data-testid="chart" />
            </UIProvider>
        )

        expect(screen.getByTestId('chart')).toBeInTheDocument()
    })

    it('applies custom height', () => {
        render(
            <UIProvider>
                <DonutChart data={DATA} nameKey="name" valueKey="value" height={400} data-testid="chart" />
            </UIProvider>
        )

        expect(screen.getByTestId('chart').getAttribute('style')).toContain('--donut-chart-height')
    })
})
