import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Spoiler } from './Spoiler'

vi.mock('@react-ui/hooks', async () => {
    const actual = await vi.importActual<typeof import('@react-ui/hooks')>('@react-ui/hooks')
    return {
        ...actual,
        useElementSize: () => ({ ref: vi.fn(), width: 200, height: 300 })
    }
})

function Wrapper({ children }: { children: React.ReactNode }) {
    return <UIProvider>{children}</UIProvider>
}

const defaultProps = {
    maxHeight: 100,
    showLabel: 'show',
    hideLabel: 'hide',
    children: 'test-children'
}

describe('@react-ui/ui/Spoiler', () => {
    it('renders children', () => {
        render(<Spoiler {...defaultProps} />, { wrapper: Wrapper })
        expect(screen.getByText('test-children')).toBeInTheDocument()
    })

    it('toggles expanded state on control click', () => {
        render(<Spoiler {...defaultProps} />, { wrapper: Wrapper })
        const control = screen.getByRole('button')
        expect(control).toHaveTextContent('show')
        expect(control.tagName).toBe('BUTTON')
        act(() => {
            fireEvent.click(control)
        })
        expect(screen.getByRole('button')).toHaveTextContent('hide')
    })

    it('supports controlled expanded state', () => {
        render(<Spoiler {...defaultProps} expanded onExpandedChange={() => {}} />, {
            wrapper: Wrapper
        })
        expect(screen.getByRole('button')).toHaveTextContent('hide')
    })

    it('sets aria attributes on control', () => {
        render(<Spoiler {...defaultProps} />, { wrapper: Wrapper })
        const control = screen.getByRole('button')
        expect(control).toHaveAttribute('aria-expanded', 'false')
        expect(control).toHaveAttribute('aria-controls')
    })
})
