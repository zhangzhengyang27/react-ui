import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { EmptyState } from './EmptyState'

function Wrapper({ children }: { children: React.ReactNode }) {
    return <UIProvider>{children}</UIProvider>
}

describe('@react-ui/ui/EmptyState', () => {
    it('renders title and description', () => {
        render(<EmptyState title="No data" description="There is nothing here yet." />, {
            wrapper: Wrapper
        })
        expect(screen.getByText('No data')).toBeInTheDocument()
        expect(screen.getByText('There is nothing here yet.')).toBeInTheDocument()
    })

    it('renders icon inside indicator', () => {
        const { container } = render(<EmptyState icon={<span data-testid="icon">icon</span>} />, {
            wrapper: Wrapper
        })
        expect(container.querySelector('[data-testid="icon"]')).toBeInTheDocument()
    })

    it('renders compound components', () => {
        render(
            <EmptyState>
                <EmptyState.Indicator>
                    <span data-testid="compound-icon">icon</span>
                </EmptyState.Indicator>
                <EmptyState.Title>Compound Title</EmptyState.Title>
                <EmptyState.Description>Compound Description</EmptyState.Description>
                <EmptyState.Actions>
                    <button>Action</button>
                </EmptyState.Actions>
            </EmptyState>,
            { wrapper: Wrapper }
        )
        expect(screen.getByText('Compound Title')).toBeInTheDocument()
        expect(screen.getByText('Compound Description')).toBeInTheDocument()
        expect(screen.getByText('Action')).toBeInTheDocument()
        expect(screen.getByTestId('compound-icon')).toBeInTheDocument()
    })

    it('applies align data attribute', () => {
        const { container } = render(<EmptyState align="left" />, { wrapper: Wrapper })
        expect(container.querySelector('.ui-EmptyState-root')).toHaveAttribute('data-align', 'left')
    })

    it('applies variant data attribute', () => {
        const { container } = render(<EmptyState variant="filled" />, { wrapper: Wrapper })
        expect(container.querySelector('.ui-EmptyState-root')).toHaveAttribute('data-variant', 'filled')
    })
})
