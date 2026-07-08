import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { AspectRatio } from './AspectRatio'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('AspectRatio', () => {
    it('renders a div by default', () => {
        renderWithProvider(<AspectRatio data-testid="ar">content</AspectRatio>)

        const element = screen.getByTestId('ar')
        expect(element.tagName).toBe('DIV')
        expect(element).toHaveTextContent('content')
    })

    it('applies static classes', () => {
        renderWithProvider(<AspectRatio data-testid="ar">content</AspectRatio>)

        expect(screen.getByTestId('ar')).toHaveClass('mantine-AspectRatio-root')
    })

    it('supports polymorphic rendering', () => {
        renderWithProvider(
            <AspectRatio component="figure" data-testid="ar">
                figure content
            </AspectRatio>
        )

        expect(screen.getByTestId('ar').tagName).toBe('FIGURE')
    })

    it('sets aspect-ratio css variable', () => {
        renderWithProvider(
            <AspectRatio data-testid="ar" ratio={16 / 9}>
                content
            </AspectRatio>
        )

        expect(screen.getByTestId('ar')).toHaveStyle('--ar-ratio: 1.7777777777777777')
    })
})
