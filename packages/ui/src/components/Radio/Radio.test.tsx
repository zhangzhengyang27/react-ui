import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { Radio } from './Radio'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Radio', () => {
    it('renders a hidden radio input', () => {
        renderWithProvider(<Radio data-testid="radio" label="Option A" />)

        const input = screen.getByRole('radio', { hidden: true })
        expect(input).toHaveAttribute('type', 'radio')
        expect(input).toHaveClass('mantine-Radio-input')
        expect(screen.getByText('Option A')).toBeInTheDocument()
    })

    it('toggles checked state when clicked', () => {
        renderWithProvider(<Radio label="Option A" />)

        const input = screen.getByRole('radio', { hidden: true }) as HTMLInputElement
        expect(input.checked).toBe(false)

        fireEvent.click(input)
        expect(input.checked).toBe(true)
    })

    it('calls onChange when clicked', () => {
        const onChange = vi.fn()
        renderWithProvider(<Radio label="Option A" onChange={onChange} />)

        fireEvent.click(screen.getByRole('radio', { hidden: true }))
        expect(onChange).toHaveBeenCalled()
    })

    it('respects disabled state', () => {
        renderWithProvider(<Radio label="Option A" disabled />)

        const input = screen.getByRole('radio', { hidden: true }) as HTMLInputElement
        expect(input).toBeDisabled()
        expect(input).not.toBeChecked()

        input.click()
        expect(input).not.toBeChecked()
    })

    it('supports controlled checked state', () => {
        const { rerender } = renderWithProvider(<Radio label="Option A" checked={false} readOnly />)

        const input = screen.getByRole('radio', { hidden: true }) as HTMLInputElement
        expect(input).not.toBeChecked()

        rerender(
            <MantineProvider>
                <Radio label="Option A" checked readOnly />
            </MantineProvider>
        )
        expect(input).toBeChecked()
    })

    it('renders description and error', () => {
        renderWithProvider(<Radio label="Option A" description="More info" error="Required" />)

        expect(screen.getByText('More info')).toBeInTheDocument()
        expect(screen.getByText('Required')).toBeInTheDocument()
    })
})
