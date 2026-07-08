import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { ColorPicker } from './ColorPicker'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('ColorPicker', () => {
    it('renders default picker', () => {
        renderWithProvider(<ColorPicker data-testid="picker" />)
        expect(screen.getByTestId('picker')).toBeInTheDocument()
    })

    it('renders hidden input when name is provided', () => {
        const { container } = renderWithProvider(<ColorPicker name="color" />)
        expect(container.querySelector('input[type="hidden"]')).toBeInTheDocument()
    })

    it('renders swatches', () => {
        renderWithProvider(<ColorPicker swatches={['#ff0000', '#00ff00']} />)
        expect(screen.getByLabelText('#ff0000')).toBeInTheDocument()
        expect(screen.getByLabelText('#00ff00')).toBeInTheDocument()
    })

    it('calls onChange when a swatch is clicked', () => {
        const handleChange = vi.fn()
        renderWithProvider(<ColorPicker swatches={['#ff0000']} onChange={handleChange} />)
        fireEvent.click(screen.getByLabelText('#ff0000'))
        expect(handleChange).toHaveBeenCalledWith('#ff0000')
    })
})
