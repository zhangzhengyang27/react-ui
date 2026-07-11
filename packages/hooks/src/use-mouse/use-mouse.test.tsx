import { render, screen, fireEvent } from '@testing-library/react'
import { useMouse } from './use-mouse'

function TestComponent() {
    const { ref, x, y } = useMouse<HTMLDivElement>()
    return (
        <div ref={ref} data-testid="target">
            {x},{y}
        </div>
    )
}

describe('useMouse', () => {
    it('updates position on mousemove', () => {
        render(<TestComponent />)
        const target = screen.getByTestId('target')

        fireEvent.mouseMove(target, { clientX: 10, clientY: 20 })
        expect(target.textContent).toBe('10,20')
    })
})
