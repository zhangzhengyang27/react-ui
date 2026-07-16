import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Button } from '../Button'
import { HoverCard } from './HoverCard'

describe('HoverCard', () => {
    it('renders target element', () => {
        render(
            <UIProvider>
                <HoverCard>
                    <HoverCard.Target>
                        <Button>target</Button>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>dropdown content</HoverCard.Dropdown>
                </HoverCard>
            </UIProvider>
        )

        expect(screen.getByText('target')).toBeInTheDocument()
    })

    it('renders dropdown content when opened is true', () => {
        render(
            <UIProvider>
                <HoverCard opened>
                    <HoverCard.Target>
                        <Button>target</Button>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>dropdown content</HoverCard.Dropdown>
                </HoverCard>
            </UIProvider>
        )

        expect(screen.getByText('dropdown content')).toBeInTheDocument()
    })

    it('does not render dropdown content when disabled', () => {
        render(
            <UIProvider>
                <HoverCard opened disabled>
                    <HoverCard.Target>
                        <Button>target</Button>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>dropdown content</HoverCard.Dropdown>
                </HoverCard>
            </UIProvider>
        )

        expect(screen.queryByText('dropdown content')).not.toBeInTheDocument()
    })
})
