import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UIProvider } from '../../core'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
    it('renders skeleton element', () => {
        render(
            <UIProvider>
                <Skeleton data-testid="skeleton" />
            </UIProvider>
        )

        expect(screen.getByTestId('skeleton')).toBeInTheDocument()
    })

    it('renders children as placeholder template', () => {
        render(
            <UIProvider>
                <Skeleton data-testid="skeleton">Content</Skeleton>
            </UIProvider>
        )

        expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('renders circle skeleton', () => {
        render(
            <UIProvider>
                <Skeleton data-testid="skeleton" circle />
            </UIProvider>
        )

        expect(screen.getByTestId('skeleton')).toHaveAttribute('data-circle')
    })

    it('renders non-animated skeleton', () => {
        render(
            <UIProvider>
                <Skeleton data-testid="skeleton" animate={false} />
            </UIProvider>
        )

        expect(screen.getByTestId('skeleton')).not.toHaveAttribute('data-animate')
    })
})
