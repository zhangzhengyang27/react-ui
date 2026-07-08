import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { Rating } from './Rating'

describe('Rating', () => {
    it('renders rating with default value', () => {
        render(
            <MantineProvider>
                <Rating defaultValue={3} data-testid="rating" />
            </MantineProvider>
        )

        expect(screen.getByTestId('rating')).toBeInTheDocument()
        expect(screen.getAllByRole('button').length).toBe(5)
    })

    it('calls onChange when star is clicked', () => {
        const onChange = vi.fn()
        render(
            <MantineProvider>
                <Rating onChange={onChange} data-testid="rating" />
            </MantineProvider>
        )

        const buttons = screen.getAllByRole('button')
        buttons[3].click()
        expect(onChange).toHaveBeenCalledWith(4)
    })

    it('supports clearable rating', () => {
        const onChange = vi.fn()
        render(
            <MantineProvider>
                <Rating value={3} clearable onChange={onChange} data-testid="rating" />
            </MantineProvider>
        )

        const buttons = screen.getAllByRole('button')
        buttons[2].click()
        expect(onChange).toHaveBeenCalledWith(0)
    })

    it('does not call onChange when readOnly', () => {
        const onChange = vi.fn()
        render(
            <MantineProvider>
                <Rating readOnly onChange={onChange} data-testid="rating" />
            </MantineProvider>
        )

        const buttons = screen.getAllByRole('button')
        expect(buttons[0]).toBeDisabled()
    })
})
