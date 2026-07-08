import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { NumberInput } from './NumberInput'

function Wrapper({ children }: { children: React.ReactNode }) {
    return <MantineProvider>{children}</MantineProvider>
}

describe('NumberInput', () => {
    it('renders input with label, description and error', () => {
        render(
            <Wrapper>
                <NumberInput label="Amount" description="Enter a number" error="Invalid value" placeholder="0" />
            </Wrapper>
        )

        expect(screen.getByLabelText('Amount')).toBeInTheDocument()
        expect(screen.getByText('Enter a number')).toBeInTheDocument()
        expect(screen.getByText('Invalid value')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('0')).toBeInTheDocument()
    })

    it('renders stepper controls by default', () => {
        render(
            <Wrapper>
                <NumberInput />
            </Wrapper>
        )

        expect(screen.getAllByRole('button')).toHaveLength(2)
    })

    it('hides stepper controls when hideControls is set', () => {
        render(
            <Wrapper>
                <NumberInput hideControls />
            </Wrapper>
        )

        expect(screen.queryByRole('button')).not.toBeInTheDocument()
    })

    it('increments value via up control', () => {
        const onChange = vi.fn()
        render(
            <Wrapper>
                <NumberInput defaultValue={5} onChange={onChange} />
            </Wrapper>
        )

        const upControl = screen.getByRole('button', { name: 'Increment' })
        fireEvent.click(upControl)
        expect(onChange).toHaveBeenCalledWith(6)
    })

    it('decrements value via down control', () => {
        const onChange = vi.fn()
        render(
            <Wrapper>
                <NumberInput defaultValue={5} onChange={onChange} />
            </Wrapper>
        )

        const downControl = screen.getByRole('button', { name: 'Decrement' })
        fireEvent.click(downControl)
        expect(onChange).toHaveBeenCalledWith(4)
    })

    it('respects min and max boundaries', () => {
        const onChange = vi.fn()
        render(
            <Wrapper>
                <NumberInput defaultValue={9} max={10} onChange={onChange} />
            </Wrapper>
        )

        const upControl = screen.getByRole('button', { name: 'Increment' })
        fireEvent.click(upControl)
        expect(onChange).toHaveBeenCalledWith(10)

        fireEvent.click(upControl)
        expect(onChange).toHaveBeenLastCalledWith(10)
    })

    it('increments value on ArrowUp key', () => {
        const onChange = vi.fn()
        render(
            <Wrapper>
                <NumberInput defaultValue={3} onChange={onChange} />
            </Wrapper>
        )

        const input = screen.getByRole('spinbutton')
        input.focus()
        fireEvent.keyDown(input, { key: 'ArrowUp' })
        expect(onChange).toHaveBeenCalledWith(4)
    })

    it('decrements value on ArrowDown key', () => {
        const onChange = vi.fn()
        render(
            <Wrapper>
                <NumberInput defaultValue={3} onChange={onChange} />
            </Wrapper>
        )

        const input = screen.getByRole('spinbutton')
        input.focus()
        fireEvent.keyDown(input, { key: 'ArrowDown' })
        expect(onChange).toHaveBeenCalledWith(2)
    })

    it('supports controlled value', () => {
        const { rerender } = render(
            <Wrapper>
                <NumberInput value={5} onChange={() => {}} />
            </Wrapper>
        )

        expect(screen.getByRole('spinbutton')).toHaveValue(5)

        rerender(
            <Wrapper>
                <NumberInput value={10} onChange={() => {}} />
            </Wrapper>
        )

        expect(screen.getByRole('spinbutton')).toHaveValue(10)
    })
})
