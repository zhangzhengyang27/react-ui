import { describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { Portal } from './Portal'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Portal', () => {
    it('renders children into a shared portal node in document.body by default', async () => {
        renderWithProvider(
            <div data-testid="outside">
                <Portal>
                    <span data-testid="portal-content">portaled</span>
                </Portal>
            </div>
        )

        await waitFor(() => {
            expect(screen.getByTestId('portal-content')).toBeInTheDocument()
        })

        const portalNode = document.querySelector('[data-react-ui-shared-portal-node]')
        expect(portalNode).toBeInTheDocument()
        expect(portalNode?.parentElement).toBe(document.body)
    })

    it('renders into a custom target element', async () => {
        const target = document.createElement('div')
        target.setAttribute('data-testid', 'custom-target')
        document.body.appendChild(target)

        renderWithProvider(
            <Portal target={target}>
                <span data-testid="portal-content">portaled</span>
            </Portal>
        )

        await waitFor(() => {
            expect(target.contains(screen.getByTestId('portal-content'))).toBe(true)
        })

        document.body.removeChild(target)
    })

    it('renders into a target matched by CSS selector', async () => {
        const target = document.createElement('div')
        target.id = 'portal-target'
        document.body.appendChild(target)

        renderWithProvider(
            <Portal target="#portal-target">
                <span data-testid="portal-content">portaled</span>
            </Portal>
        )

        await waitFor(() => {
            expect(target.contains(screen.getByTestId('portal-content'))).toBe(true)
        })

        document.body.removeChild(target)
    })

    it('creates a separate portal node when reuseTargetNode is false', async () => {
        renderWithProvider(
            <>
                <Portal reuseTargetNode={false}>
                    <span data-testid="portal-1">one</span>
                </Portal>
                <Portal reuseTargetNode={false}>
                    <span data-testid="portal-2">two</span>
                </Portal>
            </>
        )

        await waitFor(() => {
            expect(screen.getByTestId('portal-1')).toBeInTheDocument()
            expect(screen.getByTestId('portal-2')).toBeInTheDocument()
        })

        const nodes = document.querySelectorAll('[data-portal]')
        expect(nodes.length).toBeGreaterThanOrEqual(2)
    })
})
