import { render, screen, fireEvent } from '@testing-library/react'
import { useHover } from './use-hover'

function TestComponent() {
    const { hovered, ref } = useHover<HTMLDivElement>()
    return (
        <div ref={ref} data-testid="target">
            {hovered ? 'hovered' : 'not hovered'}
        </div>
    )
}

describe('useHover', () => {
    it('toggles hovered state on mouseenter and mouseleave', () => {
        render(<TestComponent />)
        const target = screen.getByTestId('target')

        expect(target.textContent).toBe('not hovered')

        fireEvent.mouseEnter(target)
        expect(target.textContent).toBe('hovered')

        fireEvent.mouseLeave(target)
        expect(target.textContent).toBe('not hovered')
    })
})
