import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MantineProvider } from '../../core'
import { Button } from '../Button'
import { Popover } from './Popover'

describe('Popover', () => {
    it('renders target element', () => {
        render(
            <MantineProvider>
                <Popover>
                    <Popover.Target>
                        <Button>target</Button>
                    </Popover.Target>
                    <Popover.Dropdown>dropdown content</Popover.Dropdown>
                </Popover>
            </MantineProvider>
        )

        expect(screen.getByText('target')).toBeInTheDocument()
    })

    it('renders dropdown content when opened is true', () => {
        render(
            <MantineProvider>
                <Popover opened>
                    <Popover.Target>
                        <Button>target</Button>
                    </Popover.Target>
                    <Popover.Dropdown>dropdown content</Popover.Dropdown>
                </Popover>
            </MantineProvider>
        )

        expect(screen.getByText('dropdown content')).toBeInTheDocument()
    })

    it('does not render dropdown content when disabled', () => {
        render(
            <MantineProvider>
                <Popover opened disabled>
                    <Popover.Target>
                        <Button>target</Button>
                    </Popover.Target>
                    <Popover.Dropdown>dropdown content</Popover.Dropdown>
                </Popover>
            </MantineProvider>
        )

        expect(screen.queryByText('dropdown content')).not.toBeInTheDocument()
    })
})
