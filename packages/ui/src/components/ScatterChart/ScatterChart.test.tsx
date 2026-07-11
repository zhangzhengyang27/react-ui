import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { ScatterChart } from './ScatterChart'

const DATA = [
    { x: 10, y: 20, z: 30 },
    { x: 20, y: 30, z: 40 },
    { x: 30, y: 40, z: 50 }
]

describe('ScatterChart', () => {
    it('renders chart root', () => {
        render(
            <MantineProvider>
                <ScatterChart data={DATA} xAxisKey="x" yAxisKey="y" data-testid="chart" />
            </MantineProvider>
        )

        expect(screen.getByTestId('chart')).toBeInTheDocument()
    })

    it('applies custom height', () => {
        render(
            <MantineProvider>
                <ScatterChart data={DATA} xAxisKey="x" yAxisKey="y" height={400} data-testid="chart" />
            </MantineProvider>
        )

        expect(screen.getByTestId('chart').getAttribute('style')).toContain('--scatter-chart-height')
    })
})
