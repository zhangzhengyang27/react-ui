import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { Button } from '../Button'
import { FileButton } from './FileButton'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('FileButton', () => {
    it('renders children', () => {
        renderWithProvider(
            <FileButton onChange={vi.fn()}>{({ onClick }) => <Button onClick={onClick}>Upload</Button>}</FileButton>
        )
        expect(screen.getByText('Upload')).toBeInTheDocument()
    })

    it('calls onChange with file when input changes', () => {
        const handleChange = vi.fn()
        const file = new File(['hello'], 'hello.txt', { type: 'text/plain' })

        renderWithProvider(
            <FileButton onChange={handleChange} inputProps={{ 'data-testid': 'file-input' } as any}>
                {({ onClick }) => <Button onClick={onClick}>Upload</Button>}
            </FileButton>
        )

        const input = screen.getByTestId('file-input') as HTMLInputElement
        fireEvent.change(input, { target: { files: [file] } })
        expect(handleChange).toHaveBeenCalledWith(file)
    })

    it('calls onChange with multiple files', () => {
        const handleChange = vi.fn()
        const files = [
            new File(['a'], 'a.txt', { type: 'text/plain' }),
            new File(['b'], 'b.txt', { type: 'text/plain' })
        ]

        renderWithProvider(
            <FileButton onChange={handleChange} multiple inputProps={{ 'data-testid': 'file-input' } as any}>
                {({ onClick }) => <Button onClick={onClick}>Upload</Button>}
            </FileButton>
        )

        const input = screen.getByTestId('file-input') as HTMLInputElement
        fireEvent.change(input, { target: { files } })
        expect(handleChange).toHaveBeenCalledWith(files)
    })
})
