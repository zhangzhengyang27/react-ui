import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { PieChart } from './PieChart'

const DATA = [
    { name: 'A', value: 400 },
    { name: 'B', value: 300 }
]

describe('PieChart', () => {
    it('renders chart root', () => {
        render(
            <MantineProvider>
                <PieChart data={DATA} nameKey="name" valueKey="value" data-testid="chart" />
            </MantineProvider>
        )

        expect(screen.getByTestId('chart')).toBeInTheDocument()
    })

    it('renders with custom height', () => {
        render(
            <MantineProvider>
                <PieChart data={DATA} nameKey="name" valueKey="value" height={400} data-testid="chart" />
            </MantineProvider>
        )

        expect(screen.getByTestId('chart').getAttribute('style')).toContain('--pie-chart-height')
    })
})
