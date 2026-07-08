import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { Slider } from './Slider'

describe('Slider', () => {
    it('renders slider with default value', () => {
        render(
            <MantineProvider>
                <Slider defaultValue={40} data-testid="slider" />
            </MantineProvider>
        )

        const input = screen.getByTestId('slider').querySelector('input') as HTMLInputElement
        expect(input.value).toBe('40')
    })

    it('calls onChange when value changes', () => {
        const onChange = vi.fn()
        render(
            <MantineProvider>
                <Slider defaultValue={0} onChange={onChange} data-testid="slider" />
            </MantineProvider>
        )

        const input = screen.getByTestId('slider').querySelector('input') as HTMLInputElement
        fireEvent.change(input, { target: { value: '60' } })
        expect(onChange).toHaveBeenCalledWith(60)
    })

    it('renders disabled slider', () => {
        render(
            <MantineProvider>
                <Slider disabled data-testid="slider" />
            </MantineProvider>
        )

        expect(screen.getByTestId('slider')).toHaveAttribute('data-disabled')
    })

    it('formats label value', () => {
        render(
            <MantineProvider>
                <Slider value={50} label={v => `${v}%`} labelAlwaysOn data-testid="slider" />
            </MantineProvider>
        )

        expect(screen.getByText('50%')).toBeInTheDocument()
    })
})
