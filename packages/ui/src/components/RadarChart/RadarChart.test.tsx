import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { RadarChart } from './RadarChart'

const DATA = [
    { subject: 'A', x: 80, y: 60 },
    { subject: 'B', x: 70, y: 90 },
    { subject: 'C', x: 60, y: 70 }
]

describe('RadarChart', () => {
    it('renders chart root', () => {
        render(
            <MantineProvider>
                <RadarChart data={DATA} dataKey="subject" series={[{ name: 'x' }, { name: 'y' }]} data-testid="chart" />
            </MantineProvider>
        )

        expect(screen.getByTestId('chart')).toBeInTheDocument()
    })

    it('applies custom height', () => {
        render(
            <MantineProvider>
                <RadarChart data={DATA} dataKey="subject" series={[{ name: 'x' }]} height={400} data-testid="chart" />
            </MantineProvider>
        )

        expect(screen.getByTestId('chart').getAttribute('style')).toContain('--radar-chart-height')
    })
})
