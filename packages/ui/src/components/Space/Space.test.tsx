import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { Space } from './Space'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Space', () => {
    it('renders a div by default', () => {
        renderWithProvider(<Space data-testid="space" />)

        expect(screen.getByTestId('space').tagName).toBe('DIV')
    })

    it('applies width and height style props', () => {
        renderWithProvider(<Space data-testid="space" w={100} h={50} />)

        const element = screen.getByTestId('space')
        expect(element).toHaveStyle({
            width: 'calc(6.25rem * var(--mantine-scale))',
            height: 'calc(3.125rem * var(--mantine-scale))'
        })
    })

    it('mirrors w and h to min-width and min-height by default', () => {
        renderWithProvider(<Space data-testid="space" w={100} h={50} />)

        const element = screen.getByTestId('space')
        expect(element).toHaveStyle({
            minWidth: 'calc(6.25rem * var(--mantine-scale))',
            minHeight: 'calc(3.125rem * var(--mantine-scale))'
        })
    })
})
