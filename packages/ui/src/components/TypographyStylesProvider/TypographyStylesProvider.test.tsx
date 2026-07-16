import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { TypographyStylesProvider } from './TypographyStylesProvider'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('TypographyStylesProvider', () => {
    it('renders children inside a div', () => {
        renderWithProvider(
            <TypographyStylesProvider data-testid="tsp">
                <h1>Title</h1>
                <p>Paragraph</p>
            </TypographyStylesProvider>
        )

        const root = screen.getByTestId('tsp')
        expect(root.tagName).toBe('DIV')
        expect(root).toHaveTextContent('Title')
        expect(root).toHaveTextContent('Paragraph')
    })

    it('applies static classes', () => {
        renderWithProvider(<TypographyStylesProvider data-testid="tsp">content</TypographyStylesProvider>)

        expect(screen.getByTestId('tsp')).toHaveClass('ui-TypographyStylesProvider-root')
    })

    it('supports polymorphic rendering', () => {
        renderWithProvider(
            <TypographyStylesProvider component="article" data-testid="tsp">
                content
            </TypographyStylesProvider>
        )

        expect(screen.getByTestId('tsp').tagName).toBe('ARTICLE')
    })
})
