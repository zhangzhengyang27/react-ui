import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { Center } from './Center'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Center', () => {
    it('renders a div by default', () => {
        renderWithProvider(<Center data-testid="center">content</Center>)

        const element = screen.getByTestId('center')
        expect(element.tagName).toBe('DIV')
        expect(element).toHaveTextContent('content')
    })

    it('applies static classes', () => {
        renderWithProvider(<Center data-testid="center">content</Center>)

        expect(screen.getByTestId('center')).toHaveClass('mantine-Center-root')
    })

    it('supports polymorphic rendering', () => {
        renderWithProvider(
            <Center component="section" data-testid="center">
                section content
            </Center>
        )

        expect(screen.getByTestId('center').tagName).toBe('SECTION')
    })

    it('sets data-inline when inline is true', () => {
        renderWithProvider(
            <Center data-testid="center" inline>
                content
            </Center>
        )

        expect(screen.getByTestId('center')).toHaveAttribute('data-inline')
    })
})
