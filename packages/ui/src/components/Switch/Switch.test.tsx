import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Switch } from './Switch'

const renderSwitch = (ui: React.ReactElement) => render(<UIProvider>{ui}</UIProvider>)

describe('Switch', () => {
    it('renders with label', () => {
        renderSwitch(<Switch label="Enable feature" />)
        expect(screen.getByText('Enable feature')).toBeInTheDocument()
        expect(screen.getByRole('checkbox')).toBeInTheDocument()
    })

    it('toggles on click', () => {
        const onChange = vi.fn()
        renderSwitch(<Switch onChange={onChange} />)

        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).not.toBeChecked()

        fireEvent.click(checkbox)
        expect(onChange).toHaveBeenCalledTimes(1)
        expect(checkbox).toBeChecked()

        fireEvent.click(checkbox)
        expect(onChange).toHaveBeenCalledTimes(2)
        expect(checkbox).not.toBeChecked()
    })

    it('supports defaultChecked', () => {
        renderSwitch(<Switch defaultChecked />)
        expect(screen.getByRole('checkbox')).toBeChecked()
    })

    it('supports controlled checked state', () => {
        const { rerender } = renderSwitch(<Switch checked />)
        expect(screen.getByRole('checkbox')).toBeChecked()

        rerender(
            <UIProvider>
                <Switch checked={false} />
            </UIProvider>
        )
        expect(screen.getByRole('checkbox')).not.toBeChecked()
    })

    it('disabled prevents change', () => {
        const onChange = vi.fn()
        renderSwitch(<Switch disabled onChange={onChange} />)

        const checkbox = screen.getByRole('checkbox')
        expect(checkbox).toBeDisabled()

        fireEvent.click(checkbox)
        expect(onChange).not.toHaveBeenCalled()
        expect(checkbox).not.toBeChecked()
    })

    it('renders onLabel and offLabel', () => {
        renderSwitch(<Switch onLabel="ON" offLabel="OFF" />)
        expect(screen.getByText('ON')).toBeInTheDocument()
        expect(screen.getByText('OFF')).toBeInTheDocument()
    })
})
