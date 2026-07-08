import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from '../Button'
import { MantineProvider } from '../../core'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
    it('renders tooltip with target element', () => {
        render(
            <MantineProvider>
                <Tooltip label="tooltip content">
                    <Button>target</Button>
                </Tooltip>
            </MantineProvider>
        )

        expect(screen.getByText('target')).toBeInTheDocument()
    })

    it('renders tooltip content when opened is true', () => {
        render(
            <MantineProvider>
                <Tooltip label="tooltip content" opened>
                    <Button>target</Button>
                </Tooltip>
            </MantineProvider>
        )

        expect(screen.getByText('tooltip content')).toBeInTheDocument()
    })

    it('does not render tooltip content when disabled', () => {
        render(
            <MantineProvider>
                <Tooltip label="tooltip content" opened disabled>
                    <Button>target</Button>
                </Tooltip>
            </MantineProvider>
        )

        expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()
    })
})
