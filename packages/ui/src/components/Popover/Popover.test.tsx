import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { UIProvider } from '../../core'
import { Button } from '../Button'
import { Popover } from './Popover'

describe('Popover', () => {
    it('renders target element', () => {
        render(
            <UIProvider>
                <Popover>
                    <Popover.Target>
                        <Button>target</Button>
                    </Popover.Target>
                    <Popover.Dropdown>dropdown content</Popover.Dropdown>
                </Popover>
            </UIProvider>
        )

        expect(screen.getByText('target')).toBeInTheDocument()
    })

    it('renders dropdown content when opened is true', () => {
        render(
            <UIProvider>
                <Popover opened>
                    <Popover.Target>
                        <Button>target</Button>
                    </Popover.Target>
                    <Popover.Dropdown>dropdown content</Popover.Dropdown>
                </Popover>
            </UIProvider>
        )

        expect(screen.getByText('dropdown content')).toBeInTheDocument()
    })

    it('does not render dropdown content when disabled', () => {
        render(
            <UIProvider>
                <Popover opened disabled>
                    <Popover.Target>
                        <Button>target</Button>
                    </Popover.Target>
                    <Popover.Dropdown>dropdown content</Popover.Dropdown>
                </Popover>
            </UIProvider>
        )

        expect(screen.queryByText('dropdown content')).not.toBeInTheDocument()
    })
})
