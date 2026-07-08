import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MantineProvider } from '../../core'
import { CopyButton } from './CopyButton'

function Wrapper({ children }: { children: React.ReactNode }) {
    return <MantineProvider>{children}</MantineProvider>
}

Object.assign(navigator, {
    clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined)
    }
})

describe('@react-ui/ui/CopyButton', () => {
    it('calls children with copy function and copied state', () => {
        render(
            <CopyButton value="test-value">
                {({ copied, copy }) => (
                    <button onClick={copy} data-testid="copy-btn">
                        {copied ? 'Copied' : 'Copy'}
                    </button>
                )}
            </CopyButton>,
            { wrapper: Wrapper }
        )

        expect(screen.getByTestId('copy-btn')).toHaveTextContent('Copy')
    })
})
