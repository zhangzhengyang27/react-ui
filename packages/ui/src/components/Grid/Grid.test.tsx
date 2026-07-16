import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Grid } from './Grid'

const renderGrid = (ui: React.ReactElement) => render(<UIProvider>{ui}</UIProvider>)

describe('Grid', () => {
    it('renders columns', () => {
        renderGrid(
            <Grid>
                <Grid.Col span={6}>A</Grid.Col>
                <Grid.Col span={6}>B</Grid.Col>
            </Grid>
        )

        expect(screen.getByText('A')).toBeInTheDocument()
        expect(screen.getByText('B')).toBeInTheDocument()
    })

    it('applies offset style', () => {
        const { container } = renderGrid(
            <Grid>
                <Grid.Col span={4} offset={2}>
                    Offset
                </Grid.Col>
            </Grid>
        )

        const col = container.querySelector('[class*="Grid-col"]')
        expect(col).toHaveStyle({ gridColumn: '3 / span 4' })
    })
})
