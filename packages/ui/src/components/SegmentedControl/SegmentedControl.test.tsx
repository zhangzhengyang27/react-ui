import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UIProvider } from '../../core'
import { SegmentedControl } from './SegmentedControl'

describe('SegmentedControl', () => {
    it('renders controls from string data', () => {
        render(
            <UIProvider>
                <SegmentedControl data={['React', 'Vue', 'Angular']} data-testid="sc" />
            </UIProvider>
        )

        expect(screen.getByText('React')).toBeInTheDocument()
        expect(screen.getByText('Vue')).toBeInTheDocument()
        expect(screen.getByText('Angular')).toBeInTheDocument()
    })

    it('calls onChange when selection changes', () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <SegmentedControl data={['A', 'B', 'C']} onChange={onChange} data-testid="sc" />
            </UIProvider>
        )

        screen.getByText('B').click()
        expect(onChange).toHaveBeenCalledWith('B')
    })

    it('supports disabled item', () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <SegmentedControl
                    data={[
                        { value: 'A', label: 'A' },
                        { value: 'B', label: 'B', disabled: true }
                    ]}
                    onChange={onChange}
                    data-testid="sc"
                />
            </UIProvider>
        )

        expect(screen.getByText('B').parentElement).toHaveAttribute('data-disabled')
    })
})
