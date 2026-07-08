import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { LoadingOverlay } from './LoadingOverlay'

describe('LoadingOverlay', () => {
    it('renders children when not visible', () => {
        render(
            <MantineProvider>
                <LoadingOverlay visible={false} data-testid="wrapper">
                    <div data-testid="content">Content</div>
                </LoadingOverlay>
            </MantineProvider>
        )

        expect(screen.getByTestId('content')).toBeInTheDocument()
    })

    it('renders overlay and loader when visible', () => {
        render(
            <MantineProvider>
                <LoadingOverlay visible data-testid="wrapper">
                    <div data-testid="content">Content</div>
                </LoadingOverlay>
            </MantineProvider>
        )

        expect(screen.getByTestId('content')).toBeInTheDocument()
        expect(
            document.querySelector('[data-overlay]') || document.querySelector('.mantine-Overlay-root')
        ).toBeInTheDocument()
    })
})
