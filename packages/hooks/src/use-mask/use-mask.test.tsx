import { render, screen, fireEvent } from '@testing-library/react'
import { useMask } from './use-mask'

function TestComponent({ mask }: { mask: string }) {
    const { ref, value, rawValue, isComplete } = useMask({ mask })
    return (
        <div>
            <input ref={ref} data-testid="input" />
            <span data-testid="value">{value}</span>
            <span data-testid="raw">{rawValue}</span>
            <span data-testid="complete">{isComplete ? 'yes' : 'no'}</span>
        </div>
    )
}

describe('useMask', () => {
    it('applies phone-like mask', () => {
        render(<TestComponent mask="000-0000" />)
        const input = screen.getByTestId('input') as HTMLInputElement

        fireEvent.input(input, { target: { value: '1234567' } })

        expect(screen.getByTestId('value').textContent).toBe('123-4567')
        expect(screen.getByTestId('raw').textContent).toBe('1234567')
        expect(screen.getByTestId('complete').textContent).toBe('yes')
    })

    it('ignores invalid characters', () => {
        render(<TestComponent mask="000" />)
        const input = screen.getByTestId('input') as HTMLInputElement

        fireEvent.input(input, { target: { value: 'abc12' } })

        expect(screen.getByTestId('value').textContent).toBe('12_')
        expect(screen.getByTestId('raw').textContent).toBe('12')
    })
})
