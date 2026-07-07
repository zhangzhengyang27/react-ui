import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { Divider } from './Divider'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Divider', () => {
    it('renders a div by default', () => {
        renderWithProvider(<Divider data-testid="divider" />)

        const element = screen.getByTestId('divider')
        expect(element.tagName).toBe('DIV')
        expect(element).toHaveAttribute('role', 'separator')
    })

    it('applies static classes', () => {
        renderWithProvider(<Divider data-testid="divider" />)

        expect(screen.getByTestId('divider')).toHaveClass('mantine-Divider-root')
    })

    it('sets orientation data attribute', () => {
        renderWithProvider(<Divider data-testid="divider" orientation="vertical" />)

        expect(screen.getByTestId('divider')).toHaveAttribute('data-orientation', 'vertical')
    })

    it('renders label with data-with-label and label static class', () => {
        renderWithProvider(<Divider data-testid="divider" label="Label" />)

        const root = screen.getByTestId('divider')
        expect(root).toHaveAttribute('data-with-label')
        expect(screen.getByText('Label')).toHaveClass('mantine-Divider-label')
    })

    it('sets label position data attribute', () => {
        renderWithProvider(<Divider data-testid="divider" label="Label" labelPosition="left" />)

        expect(screen.getByText('Label')).toHaveAttribute('data-position', 'left')
    })

    it('forwards additional props', () => {
        renderWithProvider(<Divider data-testid="divider" aria-label="separator" />)

        expect(screen.getByTestId('divider')).toHaveAttribute('aria-label', 'separator')
    })
})
