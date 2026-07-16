import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UIProvider } from '../../core'
import { Menu } from './Menu'

describe('Menu', () => {
    it('renders target and dropdown when opened', () => {
        render(
            <UIProvider>
                <Menu opened onChange={vi.fn()}>
                    <Menu.Target>
                        <button type="button">Toggle menu</button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Label>Application</Menu.Label>
                        <Menu.Item>Settings</Menu.Item>
                        <Menu.Divider />
                        <Menu.Item color="red">Delete</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </UIProvider>
        )

        expect(screen.getByText('Toggle menu')).toBeInTheDocument()
        expect(screen.getByText('Application')).toBeInTheDocument()
        expect(screen.getByText('Settings')).toBeInTheDocument()
        expect(screen.getByText('Delete')).toBeInTheDocument()
    })

    it('does not render dropdown when closed', () => {
        render(
            <UIProvider>
                <Menu opened={false} onChange={vi.fn()}>
                    <Menu.Target>
                        <button type="button">Toggle menu</button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item>Settings</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </UIProvider>
        )

        expect(screen.getByText('Toggle menu')).toBeInTheDocument()
        expect(screen.queryByText('Settings')).not.toBeInTheDocument()
    })

    it('calls onChange when target is clicked in uncontrolled mode', () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <Menu onChange={onChange}>
                    <Menu.Target>
                        <button type="button">Toggle menu</button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item>Settings</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </UIProvider>
        )

        screen.getByText('Toggle menu').click()
        expect(onChange).toHaveBeenCalledWith(true)
    })

    it('renders disabled item', () => {
        render(
            <UIProvider>
                <Menu opened onChange={vi.fn()}>
                    <Menu.Target>
                        <button type="button">Toggle menu</button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item disabled>Disabled item</Menu.Item>
                    </Menu.Dropdown>
                </Menu>
            </UIProvider>
        )

        expect(screen.getByRole('menuitem')).toBeDisabled()
    })
})
