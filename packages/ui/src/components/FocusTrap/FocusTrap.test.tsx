import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { FocusTrap } from './FocusTrap'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('FocusTrap', () => {
    it('renders its child', () => {
        renderWithProvider(
            <FocusTrap>
                <div data-testid="trap-child">content</div>
            </FocusTrap>
        )

        expect(screen.getByTestId('trap-child')).toBeInTheDocument()
    })

    it('returns children unchanged when there is more than one child', () => {
        const { container } = renderWithProvider(
            <FocusTrap>
                <div>one</div>
                <div>two</div>
            </FocusTrap>
        )

        expect(container.textContent).toContain('one')
        expect(container.textContent).toContain('two')
    })

    it('exposes FocusTrap.InitialFocus', () => {
        renderWithProvider(
            <FocusTrap>
                <div>
                    <FocusTrap.InitialFocus data-testid="initial-focus" />
                    <button>first</button>
                </div>
            </FocusTrap>
        )

        const initialFocus = screen.getByTestId('initial-focus')
        expect(initialFocus).toHaveAttribute('data-autofocus')
        expect(initialFocus).toHaveAttribute('tabindex', '-1')
    })
})
