import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { Flex } from './Flex'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Flex', () => {
    it('renders a div by default', () => {
        renderWithProvider(<Flex data-testid="flex">content</Flex>)

        const element = screen.getByTestId('flex')
        expect(element.tagName).toBe('DIV')
        expect(element).toHaveTextContent('content')
    })

    it('applies static classes', () => {
        renderWithProvider(<Flex data-testid="flex">content</Flex>)

        expect(screen.getByTestId('flex')).toHaveClass('mantine-Flex-root')
    })

    it('supports polymorphic rendering', () => {
        renderWithProvider(
            <Flex component="section" data-testid="flex">
                section content
            </Flex>
        )

        expect(screen.getByTestId('flex').tagName).toBe('SECTION')
    })

    it('applies flex inline styles', () => {
        renderWithProvider(
            <Flex data-testid="flex" gap="md" justify="center" align="center" direction="column">
                content
            </Flex>
        )

        const element = screen.getByTestId('flex')
        expect(element).toHaveStyle({
            gap: 'var(--ui-spacing-md)',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        })
    })
})
