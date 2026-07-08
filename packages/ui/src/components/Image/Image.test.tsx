import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { Image } from './Image'

const renderWithProvider = (ui: React.ReactNode) => render(<MantineProvider>{ui}</MantineProvider>)

describe('Image', () => {
    it('renders an img with src and alt', () => {
        renderWithProvider(<Image src="image.png" alt="test image" data-testid="image" />)

        const img = screen.getByTestId('image').querySelector('img')
        expect(img).toHaveAttribute('src', 'image.png')
        expect(img).toHaveAttribute('alt', 'test image')
    })

    it('applies static classes', () => {
        renderWithProvider(<Image src="image.png" data-testid="image" />)

        expect(screen.getByTestId('image')).toHaveClass('mantine-Image-root')
    })

    it('renders fallback content when src is missing', () => {
        renderWithProvider(<Image data-testid="image" fallback={<span data-testid="fallback">fallback</span>} />)

        expect(screen.getByTestId('fallback')).toBeInTheDocument()
    })

    it('forwards additional props', () => {
        renderWithProvider(<Image src="image.png" data-testid="image" data-custom="value" />)

        expect(screen.getByTestId('image')).toHaveAttribute('data-custom', 'value')
    })
})
