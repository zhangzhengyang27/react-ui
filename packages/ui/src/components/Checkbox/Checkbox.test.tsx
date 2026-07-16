import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Checkbox } from './Checkbox'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('Checkbox', () => {
    it('renders a hidden checkbox input', () => {
        renderWithProvider(<Checkbox data-testid="checkbox" label="Accept terms" />)

        const input = screen.getByRole('checkbox', { hidden: true })
        expect(input).toHaveAttribute('type', 'checkbox')
        expect(input).toHaveClass('ui-Checkbox-input')
        expect(screen.getByText('Accept terms')).toBeInTheDocument()
    })

    it('toggles checked state when clicked', () => {
        renderWithProvider(<Checkbox label="Accept terms" />)

        const input = screen.getByRole('checkbox', { hidden: true }) as HTMLInputElement
        expect(input.checked).toBe(false)

        fireEvent.click(input)
        expect(input.checked).toBe(true)

        fireEvent.click(input)
        expect(input.checked).toBe(false)
    })

    it('calls onChange when clicked', () => {
        const onChange = vi.fn()
        renderWithProvider(<Checkbox label="Accept terms" onChange={onChange} />)

        fireEvent.click(screen.getByRole('checkbox', { hidden: true }))
        expect(onChange).toHaveBeenCalled()
    })

    it('respects disabled state', () => {
        renderWithProvider(<Checkbox label="Accept terms" disabled />)

        const input = screen.getByRole('checkbox', { hidden: true }) as HTMLInputElement
        expect(input).toBeDisabled()
        expect(input).not.toBeChecked()

        input.click()
        expect(input).not.toBeChecked()
    })

    it('supports controlled checked state', () => {
        const { rerender } = renderWithProvider(<Checkbox label="Accept terms" checked={false} readOnly />)

        const input = screen.getByRole('checkbox', { hidden: true }) as HTMLInputElement
        expect(input).not.toBeChecked()

        rerender(
            <UIProvider>
                <Checkbox label="Accept terms" checked readOnly />
            </UIProvider>
        )
        expect(input).toBeChecked()
    })

    it('renders description and error', () => {
        renderWithProvider(<Checkbox label="Accept terms" description="Read carefully" error="Required" />)

        expect(screen.getByText('Read carefully')).toBeInTheDocument()
        expect(screen.getByText('Required')).toBeInTheDocument()
    })

    it('renders indeterminate state', () => {
        renderWithProvider(<Checkbox label="Select all" indeterminate />)

        const input = screen.getByRole('checkbox', { hidden: true })
        expect(input).toHaveAttribute('data-indeterminate')
    })
})
