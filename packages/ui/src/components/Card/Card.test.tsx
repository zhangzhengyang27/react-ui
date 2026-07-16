import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Card } from './Card'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('Card', () => {
    it('renders with children', () => {
        renderWithProvider(<Card data-testid="card">Card content</Card>)

        expect(screen.getByTestId('card')).toHaveTextContent('Card content')
    })

    it('renders as div by default', () => {
        renderWithProvider(<Card data-testid="card">Card content</Card>)

        expect(screen.getByTestId('card').tagName).toBe('DIV')
    })

    it('applies static classes', () => {
        renderWithProvider(<Card data-testid="card">Card content</Card>)

        expect(screen.getByTestId('card')).toHaveClass('ui-Card-root')
    })

    it('adds data-with-border when withBorder is true', () => {
        renderWithProvider(
            <Card data-testid="card" withBorder>
                Card content
            </Card>
        )

        expect(screen.getByTestId('card')).toHaveAttribute('data-with-border')
    })

    it('renders Card.Section', () => {
        renderWithProvider(
            <Card data-testid="card">
                <Card.Section data-testid="section">Section content</Card.Section>
            </Card>
        )

        expect(screen.getByTestId('section')).toHaveClass('ui-Card-section')
    })

    it('adds data-inherit-padding to Card.Section', () => {
        renderWithProvider(
            <Card data-testid="card">
                <Card.Section data-testid="section" inheritPadding>
                    Section content
                </Card.Section>
            </Card>
        )

        expect(screen.getByTestId('section')).toHaveAttribute('data-inherit-padding')
    })

    it('adds data-with-border to Card.Section', () => {
        renderWithProvider(
            <Card data-testid="card">
                <Card.Section data-testid="section" withBorder>
                    Section content
                </Card.Section>
            </Card>
        )

        expect(screen.getByTestId('section')).toHaveAttribute('data-with-border')
    })
})
