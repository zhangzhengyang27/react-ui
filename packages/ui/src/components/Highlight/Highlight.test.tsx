import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Highlight } from './Highlight'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('Highlight', () => {
    it('renders children and highlights matching substring', () => {
        renderWithProvider(<Highlight highlight="world">Hello world</Highlight>)

        expect(screen.getByText(content => content.includes('Hello'))).toBeInTheDocument()
        const mark = screen.getByText('world')
        expect(mark.tagName).toBe('MARK')
        expect(mark).toHaveClass('ui-Mark-root')
    })

    it('renders plain text when highlight does not match', () => {
        renderWithProvider(<Highlight highlight="xyz">Hello world</Highlight>)

        expect(screen.getByText('Hello world')).toBeInTheDocument()
    })

    it('renders plain text when highlight is empty', () => {
        renderWithProvider(<Highlight highlight="">Hello world</Highlight>)

        expect(screen.getByText('Hello world')).toBeInTheDocument()
    })

    it('accepts a custom color for highlighted chunks', () => {
        renderWithProvider(
            <Highlight highlight="world" color="red">
                Hello world
            </Highlight>
        )

        expect(screen.getByText('world')).toBeInTheDocument()
    })
})
