import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { NavLink } from './NavLink'

function Wrapper({ children }: { children: React.ReactNode }) {
    return <UIProvider>{children}</UIProvider>
}

describe('NavLink', () => {
    it('renders label and description', () => {
        render(
            <Wrapper>
                <NavLink label="Home" description="Go to home page" />
            </Wrapper>
        )

        expect(screen.getByText('Home')).toBeInTheDocument()
        expect(screen.getByText('Go to home page')).toBeInTheDocument()
    })

    it('renders left and right sections', () => {
        render(
            <Wrapper>
                <NavLink label="Settings" leftSection="L" rightSection="R" />
            </Wrapper>
        )

        expect(screen.getByText('L')).toBeInTheDocument()
        expect(screen.getByText('R')).toBeInTheDocument()
    })

    it('toggles nested children on click', async () => {
        render(
            <Wrapper>
                <NavLink label="Parent">
                    <NavLink label="Child" />
                </NavLink>
            </Wrapper>
        )

        expect(screen.queryByText('Child')).not.toBeInTheDocument()

        screen.getByText('Parent').click()
        await waitFor(() => expect(screen.getByText('Child')).toBeInTheDocument())

        screen.getByText('Parent').click()
        await waitFor(() => expect(screen.queryByText('Child')).not.toBeInTheDocument())
    })

    it('calls onChange when toggled', async () => {
        const onChange = vi.fn()
        render(
            <Wrapper>
                <NavLink label="Parent" onChange={onChange}>
                    <NavLink label="Child" />
                </NavLink>
            </Wrapper>
        )

        screen.getByText('Parent').click()
        await waitFor(() => expect(onChange).toHaveBeenCalledWith(true))

        screen.getByText('Parent').click()
        await waitFor(() => expect(onChange).toHaveBeenCalledWith(false))
    })

    it('respects defaultOpened', () => {
        render(
            <Wrapper>
                <NavLink label="Parent" defaultOpened>
                    <NavLink label="Child" />
                </NavLink>
            </Wrapper>
        )

        expect(screen.getByText('Child')).toBeInTheDocument()
    })

    it('supports controlled opened state', async () => {
        const { rerender } = render(
            <Wrapper>
                <NavLink label="Parent" opened={false}>
                    <NavLink label="Child" />
                </NavLink>
            </Wrapper>
        )

        expect(screen.queryByText('Child')).not.toBeInTheDocument()

        rerender(
            <Wrapper>
                <NavLink label="Parent" opened={true}>
                    <NavLink label="Child" />
                </NavLink>
            </Wrapper>
        )

        await waitFor(() => expect(screen.getByText('Child')).toBeInTheDocument())
    })

    it('sets disabled attribute and skips toggle when disabled', () => {
        const onChange = vi.fn()
        render(
            <Wrapper>
                <NavLink label="Parent" disabled onChange={onChange}>
                    <NavLink label="Child" />
                </NavLink>
            </Wrapper>
        )

        expect(screen.getByRole('button')).toBeDisabled()
        screen.getByText('Parent').click()
        expect(onChange).not.toHaveBeenCalled()
        expect(screen.queryByText('Child')).not.toBeInTheDocument()
    })

    it('renders with active state', () => {
        render(
            <Wrapper>
                <NavLink label="Active" active />
            </Wrapper>
        )

        expect(screen.getByRole('button')).toHaveAttribute('data-active', 'true')
    })
})
