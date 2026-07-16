import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { UIProvider } from '../../core'
import { MediaQuery } from './MediaQuery'

const renderWithProvider = (ui: React.ReactNode) => render(<UIProvider>{ui}</UIProvider>)

function mockMatchMedia(matches: boolean) {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
            matches,
            media: query,
            onchange: null,
            addListener: vi.fn(),
            removeListener: vi.fn(),
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            dispatchEvent: vi.fn()
        }))
    })
}

describe('MediaQuery', () => {
    it('renders children when the media query matches', () => {
        mockMatchMedia(true)
        renderWithProvider(<MediaQuery query="(min-width: 768px)">visible content</MediaQuery>)
        expect(screen.getByText('visible content')).toBeInTheDocument()
    })

    it('renders nothing when the media query does not match', () => {
        mockMatchMedia(false)
        renderWithProvider(<MediaQuery query="(min-width: 768px)">hidden content</MediaQuery>)
        expect(screen.queryByText('hidden content')).not.toBeInTheDocument()
    })
})
