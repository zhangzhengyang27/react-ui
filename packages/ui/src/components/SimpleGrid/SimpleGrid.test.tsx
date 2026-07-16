import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { SimpleGrid } from './SimpleGrid'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('SimpleGrid', () => {
    it('renders a div by default', () => {
        renderWithProvider(<SimpleGrid data-testid="grid">content</SimpleGrid>)

        const element = screen.getByTestId('grid')
        expect(element.tagName).toBe('DIV')
        expect(element).toHaveTextContent('content')
    })

    it('applies static classes', () => {
        renderWithProvider(<SimpleGrid data-testid="grid">content</SimpleGrid>)

        expect(screen.getByTestId('grid')).toHaveClass('ui-SimpleGrid-root')
    })

    it('sets data-auto-cols when minColWidth is provided', () => {
        renderWithProvider(
            <SimpleGrid data-testid="grid" minColWidth={200}>
                content
            </SimpleGrid>
        )

        expect(screen.getByTestId('grid')).toHaveAttribute('data-auto-cols', 'auto-fill')
    })

    it('respects autoFlow prop', () => {
        renderWithProvider(
            <SimpleGrid data-testid="grid" minColWidth={200} autoFlow="auto-fit">
                content
            </SimpleGrid>
        )

        expect(screen.getByTestId('grid')).toHaveAttribute('data-auto-cols', 'auto-fit')
    })
})
