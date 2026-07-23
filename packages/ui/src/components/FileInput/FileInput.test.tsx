import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { FileInput } from './FileInput'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('FileInput', () => {
    it('renders placeholder when no file is selected', () => {
        renderWithProvider(<FileInput placeholder="Please select file" data-testid="file-input" />)
        expect(screen.getByText('Please select file')).toBeInTheDocument()
    })

    it('displays selected file name', () => {
        const file = new File(['hello'], 'hello.txt', { type: 'text/plain' })
        renderWithProvider(<FileInput defaultValue={file} data-testid="file-input" />)
        expect(screen.getByText('hello.txt')).toBeInTheDocument()
    })

    it('calls onChange with file when input changes', () => {
        const handleChange = vi.fn()
        const file = new File(['hello'], 'hello.txt', { type: 'text/plain' })

        renderWithProvider(<FileInput onChange={handleChange} data-testid="file-input" />)

        const input = document.querySelector('input[type="file"]') as HTMLInputElement
        fireEvent.change(input, { target: { files: [file] } })
        expect(handleChange).toHaveBeenCalledWith(file)
    })

    it('calls onChange with multiple files', () => {
        const handleChange = vi.fn()
        const files = [
            new File(['a'], 'a.txt', { type: 'text/plain' }),
            new File(['b'], 'b.txt', { type: 'text/plain' })
        ]

        renderWithProvider(<FileInput multiple onChange={handleChange} data-testid="file-input" />)

        const input = document.querySelector('input[type="file"]') as HTMLInputElement
        fireEvent.change(input, { target: { files } })
        expect(handleChange).toHaveBeenCalledWith(files)
    })

    it('clears value when clear button is clicked', () => {
        const handleChange = vi.fn()
        const file = new File(['hello'], 'hello.txt', { type: 'text/plain' })

        renderWithProvider(<FileInput clearable defaultValue={file} onChange={handleChange} />)
        fireEvent.click(screen.getByLabelText('Clear'))
        expect(handleChange).toHaveBeenCalledWith(null)
    })
})
