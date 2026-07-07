import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { Blockquote } from './Blockquote'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Blockquote', () => {
    it('renders a blockquote by default', () => {
        renderWithProvider(<Blockquote data-testid="bq">quote</Blockquote>)

        const element = screen.getByTestId('bq')
        expect(element.tagName).toBe('BLOCKQUOTE')
        expect(element).toHaveTextContent('quote')
    })

    it('applies static classes', () => {
        renderWithProvider(<Blockquote data-testid="bq">quote</Blockquote>)

        expect(screen.getByTestId('bq')).toHaveClass('mantine-Blockquote-root')
    })

    it('renders icon and cite', () => {
        renderWithProvider(
            <Blockquote data-testid="bq" icon="@" cite="Author">
                quote
            </Blockquote>
        )

        expect(screen.getByText('@')).toHaveClass('mantine-Blockquote-icon')
        expect(screen.getByText('Author')).toHaveClass('mantine-Blockquote-cite')
    })
})
