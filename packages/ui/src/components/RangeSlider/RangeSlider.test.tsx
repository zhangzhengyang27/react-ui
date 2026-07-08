import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { RangeSlider } from './RangeSlider'

describe('RangeSlider', () => {
    it('renders range slider with default value', () => {
        render(
            <MantineProvider>
                <RangeSlider defaultValue={[20, 80]} data-testid="range" />
            </MantineProvider>
        )

        const inputs = screen.getByTestId('range').querySelectorAll('input')
        expect(inputs[0].value).toBe('20')
        expect(inputs[1].value).toBe('80')
    })

    it('calls onChange when value changes', () => {
        const onChange = vi.fn()
        render(
            <MantineProvider>
                <RangeSlider defaultValue={[0, 100]} onChange={onChange} data-testid="range" />
            </MantineProvider>
        )

        const inputs = screen.getByTestId('range').querySelectorAll('input')
        fireEvent.change(inputs[0], { target: { value: '30' } })
        expect(onChange).toHaveBeenCalledWith([30, 100])
    })

    it('renders disabled range slider', () => {
        render(
            <MantineProvider>
                <RangeSlider disabled data-testid="range" />
            </MantineProvider>
        )

        expect(screen.getByTestId('range')).toHaveAttribute('data-disabled')
    })
})
