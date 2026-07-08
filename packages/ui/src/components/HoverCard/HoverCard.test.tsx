import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { Button } from '../Button'
import { HoverCard } from './HoverCard'

describe('HoverCard', () => {
    it('renders target element', () => {
        render(
            <MantineProvider>
                <HoverCard>
                    <HoverCard.Target>
                        <Button>target</Button>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>dropdown content</HoverCard.Dropdown>
                </HoverCard>
            </MantineProvider>
        )

        expect(screen.getByText('target')).toBeInTheDocument()
    })

    it('renders dropdown content when opened is true', () => {
        render(
            <MantineProvider>
                <HoverCard opened>
                    <HoverCard.Target>
                        <Button>target</Button>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>dropdown content</HoverCard.Dropdown>
                </HoverCard>
            </MantineProvider>
        )

        expect(screen.getByText('dropdown content')).toBeInTheDocument()
    })

    it('does not render dropdown content when disabled', () => {
        render(
            <MantineProvider>
                <HoverCard opened disabled>
                    <HoverCard.Target>
                        <Button>target</Button>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>dropdown content</HoverCard.Dropdown>
                </HoverCard>
            </MantineProvider>
        )

        expect(screen.queryByText('dropdown content')).not.toBeInTheDocument()
    })
})
