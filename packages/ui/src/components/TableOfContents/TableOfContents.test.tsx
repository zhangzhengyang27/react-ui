import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { TableOfContents } from './TableOfContents'

function Wrapper({ children }: { children: React.ReactNode }) {
    return <MantineProvider>{children}</MantineProvider>
}

vi.mock('@react-ui/hooks', async () => {
    const actual = await vi.importActual<typeof import('@react-ui/hooks')>('@react-ui/hooks')
    return {
        ...actual,
        useScrollSpy: () => ({
            active: 0,
            data: [],
            initialized: false,
            reinitialize: vi.fn()
        })
    }
})

describe('@react-ui/ui/TableOfContents', () => {
    it('renders initial data controls', () => {
        render(
            <TableOfContents
                initialData={[
                    { depth: 1, value: 'Introduction', id: 'intro' },
                    { depth: 2, value: 'Usage', id: 'usage' }
                ]}
            />,
            { wrapper: Wrapper }
        )
        expect(screen.getByText('Introduction')).toBeInTheDocument()
        expect(screen.getByText('Usage')).toBeInTheDocument()
    })

    it('renders nothing without data', () => {
        const { container } = render(<TableOfContents />, { wrapper: Wrapper })
        expect(container.querySelectorAll('button').length).toBe(0)
    })
})
