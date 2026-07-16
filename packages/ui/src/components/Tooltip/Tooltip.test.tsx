import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Button } from '../Button'
import { UIProvider } from '../../core'
import { Tooltip } from './Tooltip'

describe('Tooltip', () => {
    it('renders tooltip with target element', () => {
        render(
            <UIProvider>
                <Tooltip label="tooltip content">
                    <Button>target</Button>
                </Tooltip>
            </UIProvider>
        )

        expect(screen.getByText('target')).toBeInTheDocument()
    })

    it('renders tooltip content when opened is true', () => {
        render(
            <UIProvider>
                <Tooltip label="tooltip content" opened>
                    <Button>target</Button>
                </Tooltip>
            </UIProvider>
        )

        expect(screen.getByText('tooltip content')).toBeInTheDocument()
    })

    it('does not render tooltip content when disabled', () => {
        render(
            <UIProvider>
                <Tooltip label="tooltip content" opened disabled>
                    <Button>target</Button>
                </Tooltip>
            </UIProvider>
        )

        expect(screen.queryByText('tooltip content')).not.toBeInTheDocument()
    })
})
