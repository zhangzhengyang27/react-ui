import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Avatar } from './Avatar'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

describe('Avatar', () => {
    it('renders image when src is provided', () => {
        renderWithProvider(<Avatar src="https://example.com/avatar.png" alt="User avatar" data-testid="avatar" />)

        const img = screen.getByAltText('User avatar')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', 'https://example.com/avatar.png')
    })

    it('renders fallback children when no src is provided', () => {
        renderWithProvider(<Avatar data-testid="avatar">AB</Avatar>)

        expect(screen.getByTestId('avatar')).toHaveTextContent('AB')
    })

    it('renders fallback when image fails to load', () => {
        renderWithProvider(
            <Avatar src="invalid-url" alt="User avatar" data-testid="avatar">
                fallback
            </Avatar>
        )

        fireEvent.error(screen.getByAltText('User avatar'))

        expect(screen.getByTestId('avatar')).toHaveTextContent('fallback')
    })

    it('sets title attribute from alt text', () => {
        renderWithProvider(<Avatar src="https://example.com/avatar.png" alt="User avatar" data-testid="avatar" />)

        expect(screen.getByTestId('avatar')).toHaveAttribute('title', 'User avatar')
    })

    it('applies static classes', () => {
        renderWithProvider(<Avatar data-testid="avatar">AB</Avatar>)

        expect(screen.getByTestId('avatar')).toHaveClass('ui-Avatar-root')
    })
})
