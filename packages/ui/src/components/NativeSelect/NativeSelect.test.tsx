import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { NativeSelect } from './NativeSelect'

const renderSelect = (ui: React.ReactElement) => render(<MantineProvider>{ui}</MantineProvider>)

describe('NativeSelect', () => {
    it('renders with string data and label', () => {
        renderSelect(<NativeSelect data={['react', 'vue', 'angular']} label="Framework" />)

        expect(screen.getByLabelText('Framework')).toBeInTheDocument()
        expect(screen.getByRole('combobox')).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'react' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'vue' })).toBeInTheDocument()
        expect(screen.getByRole('option', { name: 'angular' })).toBeInTheDocument()
    })

    it('renders with object data', () => {
        renderSelect(
            <NativeSelect
                data={[
                    { value: 'react', label: 'React' },
                    { value: 'vue', label: 'Vue', disabled: true },
                    { value: 'angular', label: 'Angular' }
                ]}
            />
        )

        expect(screen.getByRole('option', { name: 'React' })).toHaveValue('react')
        expect(screen.getByRole('option', { name: 'Vue' })).toBeDisabled()
        expect(screen.getByRole('option', { name: 'Angular' })).toHaveValue('angular')
    })

    it('calls onChange when selection changes', () => {
        const onChange = vi.fn()
        renderSelect(<NativeSelect data={['a', 'b', 'c']} onChange={onChange} />)

        const select = screen.getByRole('combobox')
        fireEvent.change(select, { target: { value: 'b' } })

        expect(onChange).toHaveBeenCalledTimes(1)
        expect(select).toHaveValue('b')
    })

    it('supports defaultValue', () => {
        renderSelect(<NativeSelect data={['a', 'b', 'c']} defaultValue="c" />)
        expect(screen.getByRole('combobox')).toHaveValue('c')
    })

    it('supports controlled value', () => {
        const { rerender } = renderSelect(<NativeSelect data={['a', 'b', 'c']} value="a" />)
        expect(screen.getByRole('combobox')).toHaveValue('a')

        rerender(
            <MantineProvider>
                <NativeSelect data={['a', 'b', 'c']} value="c" />
            </MantineProvider>
        )
        expect(screen.getByRole('combobox')).toHaveValue('c')
    })

    it('disabled prevents change', () => {
        const onChange = vi.fn()
        renderSelect(<NativeSelect data={['a', 'b']} disabled onChange={onChange} />)

        const select = screen.getByRole('combobox')
        expect(select).toBeDisabled()

        fireEvent.change(select, { target: { value: 'b' } })
        expect(onChange).not.toHaveBeenCalled()
    })

    it('renders description and error', () => {
        renderSelect(<NativeSelect data={['a', 'b']} description="Choose one" error="Required" />)

        expect(screen.getByText('Choose one')).toBeInTheDocument()
        expect(screen.getByText('Required')).toBeInTheDocument()
    })
})
