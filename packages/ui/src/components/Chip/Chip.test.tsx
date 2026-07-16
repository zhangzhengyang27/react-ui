import { describe, expect, it, vi } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import { UIProvider } from '../../core'
import { Chip } from './Chip'

describe('Chip', () => {
    it('renders chip label', () => {
        render(
            <UIProvider>
                <Chip>React</Chip>
            </UIProvider>
        )

        expect(screen.getByText('React')).toBeInTheDocument()
    })

    it('calls onChange with true when unchecked chip is clicked', async () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <Chip onChange={onChange}>Vue</Chip>
            </UIProvider>
        )

        act(() => {
            screen.getByRole('button', { name: 'Vue' }).click()
        })
        expect(onChange).toHaveBeenCalledWith(true)
    })

    it('calls onChange with false when checked chip is clicked', () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <Chip checked onChange={onChange}>
                    Vue
                </Chip>
            </UIProvider>
        )

        act(() => {
            screen.getByRole('button', { name: 'Vue' }).click()
        })
        expect(onChange).toHaveBeenLastCalledWith(false)
    })

    it('respects controlled checked prop', () => {
        render(
            <UIProvider>
                <Chip checked>Checked</Chip>
            </UIProvider>
        )

        expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'true')
    })

    it('renders disabled chip', () => {
        render(
            <UIProvider>
                <Chip disabled>Disabled</Chip>
            </UIProvider>
        )

        expect(screen.getByRole('button')).toBeDisabled()
    })
})
