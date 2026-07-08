import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { Code } from './Code'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Code', () => {
    it('renders a code element by default', () => {
        renderWithProvider(<Code data-testid="code">npm install</Code>)

        const element = screen.getByTestId('code')
        expect(element.tagName).toBe('CODE')
        expect(element).toHaveTextContent('npm install')
    })

    it('applies static classes', () => {
        renderWithProvider(<Code data-testid="code">npm install</Code>)

        expect(screen.getByTestId('code')).toHaveClass('mantine-Code-root')
    })

    it('renders a pre element when block is true', () => {
        renderWithProvider(
            <Code data-testid="code" block>
                block code
            </Code>
        )

        expect(screen.getByTestId('code').tagName).toBe('PRE')
        expect(screen.getByTestId('code')).toHaveAttribute('data-block')
    })

    it('accepts a custom color', () => {
        renderWithProvider(
            <Code data-testid="code" color="green">
                npm install
            </Code>
        )

        expect(screen.getByTestId('code')).toBeInTheDocument()
    })
})
