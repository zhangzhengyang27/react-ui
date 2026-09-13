import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { Rating } from './Rating'

describe('Rating', () => {
    it('renders rating with default value', () => {
        render(
            <UIProvider>
                <Rating defaultValue={3} data-testid="rating" />
            </UIProvider>
        )

        expect(screen.getByTestId('rating')).toBeInTheDocument()
        expect(screen.getAllByRole('radio').length).toBe(5)
    })

    it('calls onChange when star is selected', () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <Rating onChange={onChange} data-testid="rating" />
            </UIProvider>
        )

        const radios = screen.getAllByRole('radio')
        fireEvent.click(radios[3])
        expect(onChange).toHaveBeenCalledWith(4)
    })

    it('supports clearable rating by clicking the active star', () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <Rating value={3} clearable onChange={onChange} data-testid="rating" />
            </UIProvider>
        )

        const radios = screen.getAllByRole('radio')
        // 第 3 颗星处于选中态，点击已选中的 radio 不触发 change，经 click 清零
        fireEvent.click(radios[2])
        expect(onChange).toHaveBeenCalledWith(0)
    })

    it('does not call onChange when readOnly', () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <Rating readOnly onChange={onChange} data-testid="rating" />
            </UIProvider>
        )

        const radios = screen.getAllByRole('radio')
        expect(radios[0]).toBeDisabled()
        fireEvent.click(radios[2])
        expect(onChange).not.toHaveBeenCalled()
    })

    it('marks the checked star radio for value 3', () => {
        render(
            <UIProvider>
                <Rating value={3} data-testid="rating" />
            </UIProvider>
        )

        const radios = screen.getAllByRole('radio') as HTMLInputElement[]
        expect(radios[2].checked).toBe(true)
        expect(radios[0].checked).toBe(false)
    })
})
