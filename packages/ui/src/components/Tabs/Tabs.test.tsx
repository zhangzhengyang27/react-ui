import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Tabs } from './Tabs'

const wrapper = ({ children }: { children: React.ReactNode }) => <UIProvider>{children}</UIProvider>

describe('Tabs', () => {
    it('renders tabs and panels as a compound component', () => {
        render(
            <Tabs defaultValue="first">
                <Tabs.List>
                    <Tabs.Tab value="first">First</Tabs.Tab>
                    <Tabs.Tab value="second">Second</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="first">First panel</Tabs.Panel>
                <Tabs.Panel value="second">Second panel</Tabs.Panel>
            </Tabs>,
            { wrapper }
        )

        expect(screen.getByRole('tab', { name: 'First' })).toBeInTheDocument()
        expect(screen.getByRole('tab', { name: 'Second' })).toBeInTheDocument()
        expect(screen.getByText('First panel')).toBeInTheDocument()
        expect(screen.queryByText('Second panel')).not.toBeInTheDocument()
    })

    it('activates tab on click and calls onChange', () => {
        const onChange = vi.fn()
        render(
            <Tabs defaultValue="first" onChange={onChange}>
                <Tabs.List>
                    <Tabs.Tab value="first">First</Tabs.Tab>
                    <Tabs.Tab value="second">Second</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="first">First panel</Tabs.Panel>
                <Tabs.Panel value="second">Second panel</Tabs.Panel>
            </Tabs>,
            { wrapper }
        )

        fireEvent.click(screen.getByRole('tab', { name: 'Second' }))
        expect(onChange).toHaveBeenCalledWith('second')
        expect(screen.getByText('Second panel')).toBeInTheDocument()
        expect(screen.queryByText('First panel')).not.toBeInTheDocument()
    })

    it('supports controlled value', () => {
        const { rerender } = render(
            <Tabs value="first">
                <Tabs.List>
                    <Tabs.Tab value="first">First</Tabs.Tab>
                    <Tabs.Tab value="second">Second</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="first">First panel</Tabs.Panel>
                <Tabs.Panel value="second">Second panel</Tabs.Panel>
            </Tabs>,
            { wrapper }
        )

        expect(screen.getByText('First panel')).toBeInTheDocument()

        rerender(
            <Tabs value="second">
                <Tabs.List>
                    <Tabs.Tab value="first">First</Tabs.Tab>
                    <Tabs.Tab value="second">Second</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="first">First panel</Tabs.Panel>
                <Tabs.Panel value="second">Second panel</Tabs.Panel>
            </Tabs>
        )

        expect(screen.getByText('Second panel')).toBeInTheDocument()
    })

    it('keeps inactive panels mounted when keepMounted is true', () => {
        render(
            <Tabs defaultValue="first" keepMounted>
                <Tabs.List>
                    <Tabs.Tab value="first">First</Tabs.Tab>
                    <Tabs.Tab value="second">Second</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="first">First panel</Tabs.Panel>
                <Tabs.Panel value="second">Second panel</Tabs.Panel>
            </Tabs>,
            { wrapper }
        )

        expect(screen.getByText('First panel')).toBeInTheDocument()
        expect(screen.getByText('Second panel')).toBeInTheDocument()
    })

    it('does not activate disabled tab on click', () => {
        const onChange = vi.fn()
        render(
            <Tabs defaultValue="first" onChange={onChange}>
                <Tabs.List>
                    <Tabs.Tab value="first">First</Tabs.Tab>
                    <Tabs.Tab value="second" disabled>
                        Second
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="first">First panel</Tabs.Panel>
                <Tabs.Panel value="second">Second panel</Tabs.Panel>
            </Tabs>,
            { wrapper }
        )

        fireEvent.click(screen.getByRole('tab', { name: 'Second' }))
        expect(onChange).not.toHaveBeenCalled()
        expect(screen.queryByText('Second panel')).not.toBeInTheDocument()
    })

    it('applies orientation and variant data attributes', () => {
        const { container } = render(
            <Tabs defaultValue="first" orientation="vertical" variant="pills">
                <Tabs.List>
                    <Tabs.Tab value="first">First</Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="first">First panel</Tabs.Panel>
            </Tabs>,
            { wrapper }
        )

        const root = container.querySelector('[data-orientation="vertical"]')
        expect(root).toBeInTheDocument()
        expect(root).toHaveAttribute('data-variant', 'pills')
    })

    it('renders left and right sections', () => {
        render(
            <Tabs defaultValue="first">
                <Tabs.List>
                    <Tabs.Tab value="first" leftSection="L" rightSection="R">
                        First
                    </Tabs.Tab>
                </Tabs.List>
                <Tabs.Panel value="first">First panel</Tabs.Panel>
            </Tabs>,
            { wrapper }
        )

        expect(screen.getByText('L')).toBeInTheDocument()
        expect(screen.getByText('R')).toBeInTheDocument()
    })
})
