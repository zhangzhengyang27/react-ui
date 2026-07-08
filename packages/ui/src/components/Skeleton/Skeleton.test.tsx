import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { Skeleton } from './Skeleton'

describe('Skeleton', () => {
    it('renders skeleton element', () => {
        render(
            <MantineProvider>
                <Skeleton data-testid="skeleton" />
            </MantineProvider>
        )

        expect(screen.getByTestId('skeleton')).toBeInTheDocument()
    })

    it('renders children as placeholder template', () => {
        render(
            <MantineProvider>
                <Skeleton data-testid="skeleton">Content</Skeleton>
            </MantineProvider>
        )

        expect(screen.getByText('Content')).toBeInTheDocument()
    })

    it('renders circle skeleton', () => {
        render(
            <MantineProvider>
                <Skeleton data-testid="skeleton" circle />
            </MantineProvider>
        )

        expect(screen.getByTestId('skeleton')).toHaveAttribute('data-circle')
    })

    it('renders non-animated skeleton', () => {
        render(
            <MantineProvider>
                <Skeleton data-testid="skeleton" animate={false} />
            </MantineProvider>
        )

        expect(screen.getByTestId('skeleton')).not.toHaveAttribute('data-animate')
    })
})
