import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MantineProvider } from '../../core'
import { SegmentedControl } from './SegmentedControl'

describe('SegmentedControl', () => {
    it('renders controls from string data', () => {
        render(
            <MantineProvider>
                <SegmentedControl data={['React', 'Vue', 'Angular']} data-testid="sc" />
            </MantineProvider>
        )

        expect(screen.getByText('React')).toBeInTheDocument()
        expect(screen.getByText('Vue')).toBeInTheDocument()
        expect(screen.getByText('Angular')).toBeInTheDocument()
    })

    it('calls onChange when selection changes', () => {
        const onChange = vi.fn()
        render(
            <MantineProvider>
                <SegmentedControl data={['A', 'B', 'C']} onChange={onChange} data-testid="sc" />
            </MantineProvider>
        )

        screen.getByText('B').click()
        expect(onChange).toHaveBeenCalledWith('B')
    })

    it('supports disabled item', () => {
        const onChange = vi.fn()
        render(
            <MantineProvider>
                <SegmentedControl
                    data={[
                        { value: 'A', label: 'A' },
                        { value: 'B', label: 'B', disabled: true }
                    ]}
                    onChange={onChange}
                    data-testid="sc"
                />
            </MantineProvider>
        )

        expect(screen.getByText('B').parentElement).toHaveAttribute('data-disabled')
    })
})
