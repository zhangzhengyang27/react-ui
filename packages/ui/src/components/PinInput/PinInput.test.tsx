import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { PinInput } from './PinInput'

const renderPinInput = (ui: React.ReactElement) => render(<MantineProvider>{ui}</MantineProvider>)

describe('PinInput', () => {
    it('renders 4 inputs by default', () => {
        renderPinInput(<PinInput />)
        expect(screen.getAllByRole('textbox')).toHaveLength(4)
    })

    it('renders custom length of inputs', () => {
        renderPinInput(<PinInput length={6} />)
        expect(screen.getAllByRole('textbox')).toHaveLength(6)
    })

    it('inputs value and moves focus to next field', () => {
        renderPinInput(<PinInput />)
        const inputs = screen.getAllByRole('textbox')

        fireEvent.change(inputs[0], { target: { value: '1' } })
        expect(inputs[0]).toHaveValue('1')
    })

    it('filters non-numeric characters when type is number', () => {
        renderPinInput(<PinInput type="number" />)
        const inputs = screen.getAllByRole('textbox')

        fireEvent.change(inputs[0], { target: { value: 'a' } })
        expect(inputs[0]).toHaveValue('')

        fireEvent.change(inputs[0], { target: { value: '5' } })
        expect(inputs[0]).toHaveValue('5')
    })

    it('calls onChange with combined value', () => {
        const onChange = vi.fn()
        renderPinInput(<PinInput onChange={onChange} />)
        const inputs = screen.getAllByRole('textbox')

        fireEvent.change(inputs[0], { target: { value: '1' } })
        expect(onChange).toHaveBeenCalledWith('1')
    })

    it('calls onComplete when all inputs are filled', () => {
        const onComplete = vi.fn()
        renderPinInput(<PinInput onComplete={onComplete} />)
        const inputs = screen.getAllByRole('textbox')

        inputs.forEach((input, index) => {
            fireEvent.change(input, { target: { value: String(index + 1) } })
        })

        expect(onComplete).toHaveBeenCalledWith('1234')
    })

    it('moves focus back on backspace when current input is empty', () => {
        renderPinInput(<PinInput />)
        const inputs = screen.getAllByRole('textbox')

        fireEvent.change(inputs[0], { target: { value: '1' } })
        fireEvent.keyDown(inputs[1], { key: 'Backspace' })
        expect(inputs[0]).toHaveFocus()
    })

    it('navigates with arrow keys', () => {
        renderPinInput(<PinInput />)
        const inputs = screen.getAllByRole('textbox')

        fireEvent.change(inputs[0], { target: { value: '1' } })
        fireEvent.keyDown(inputs[1], { key: 'ArrowLeft' })
        expect(inputs[0]).toHaveFocus()

        fireEvent.keyDown(inputs[0], { key: 'ArrowRight' })
        expect(inputs[1]).toHaveFocus()
    })

    it('pastes value across inputs', () => {
        const onComplete = vi.fn()
        renderPinInput(<PinInput onComplete={onComplete} />)
        const inputs = screen.getAllByRole('textbox')

        fireEvent.paste(inputs[0], {
            clipboardData: { getData: () => '5678' }
        } as unknown as React.ClipboardEvent)

        expect(onComplete).toHaveBeenCalledWith('5678')
    })

    it('renders masked inputs', () => {
        renderPinInput(<PinInput mask />)
        const inputs = screen.getAllByRole('textbox')
        expect(inputs[0]).toHaveAttribute('data-masked')
    })

    it('disables inputs when disabled is set', () => {
        renderPinInput(<PinInput disabled />)
        const inputs = screen.getAllByRole('textbox')
        inputs.forEach(input => {
            expect(input).toBeDisabled()
        })
    })

    it('renders hidden input with name when provided', () => {
        const { container } = renderPinInput(<PinInput name="pin" />)
        const hiddenInput = container.querySelector('input[type="hidden"]')
        expect(hiddenInput).toHaveAttribute('name', 'pin')
    })
})
