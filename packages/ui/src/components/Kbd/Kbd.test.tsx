import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { Kbd } from './Kbd'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Kbd', () => {
    it('renders a kbd element by default', () => {
        renderWithProvider(<Kbd data-testid="kbd">Ctrl</Kbd>)

        const element = screen.getByTestId('kbd')
        expect(element.tagName).toBe('KBD')
        expect(element).toHaveTextContent('Ctrl')
    })

    it('applies static classes', () => {
        renderWithProvider(<Kbd data-testid="kbd">Ctrl</Kbd>)

        expect(screen.getByTestId('kbd')).toHaveClass('mantine-Kbd-root')
    })

    it('sets data-size attribute', () => {
        renderWithProvider(
            <Kbd data-testid="kbd" size="lg">
                Ctrl
            </Kbd>
        )

        expect(screen.getByTestId('kbd')).toHaveAttribute('data-size', 'lg')
    })
})
