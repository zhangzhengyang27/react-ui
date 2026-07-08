import { describe, expect, it, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { Chip } from './Chip'

describe('Chip', () => {
    it('renders chip label', () => {
        render(
            <MantineProvider>
                <Chip>React</Chip>
            </MantineProvider>
        )

        expect(screen.getByText('React')).toBeInTheDocument()
    })

    it('calls onChange with true when unchecked chip is clicked', async () => {
        const onChange = vi.fn()
        render(
            <MantineProvider>
                <Chip onChange={onChange}>Vue</Chip>
            </MantineProvider>
        )

        act(() => {
            screen.getByRole('button', { name: 'Vue' }).click()
        })
        expect(onChange).toHaveBeenCalledWith(true)
    })

    it('calls onChange with false when checked chip is clicked', () => {
        const onChange = vi.fn()
        render(
            <MantineProvider>
                <Chip checked onChange={onChange}>
                    Vue
                </Chip>
            </MantineProvider>
        )

        act(() => {
            screen.getByRole('button', { name: 'Vue' }).click()
        })
        expect(onChange).toHaveBeenLastCalledWith(false)
    })

    it('respects controlled checked prop', () => {
        render(
            <MantineProvider>
                <Chip checked>Checked</Chip>
            </MantineProvider>
        )

        expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    })

    it('renders disabled chip', () => {
        render(
            <MantineProvider>
                <Chip disabled>Disabled</Chip>
            </MantineProvider>
        )

        expect(screen.getByRole('button')).toBeDisabled()
    })
})
