import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { ColorSwatch } from './ColorSwatch'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('ColorSwatch', () => {
    it('renders with given color', () => {
        renderWithProvider(<ColorSwatch color="#ff0000" data-testid="swatch" />)
        expect(screen.getByTestId('swatch')).toBeInTheDocument()
    })

    it('renders children', () => {
        renderWithProvider(
            <ColorSwatch color="#0000ff" data-testid="swatch">
                <span data-testid="child">x</span>
            </ColorSwatch>
        )
        expect(screen.getByTestId('child')).toBeInTheDocument()
    })
})
