import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
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

    it('does not close the whole menu when interacting inside submenu dropdown (closeOnItemClick=false)', async () => {
        const onChange = vi.fn()
        render(
            <UIProvider>
                <Menu opened onChange={onChange} closeOnItemClick={false}>
                    <Menu.Target>
                        <button type="button">Toggle menu</button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item>Settings</Menu.Item>
                        <Menu.Sub>
                            <Menu.Sub.Target>
                                <Menu.Sub.Item>More options</Menu.Sub.Item>
                            </Menu.Sub.Target>
                            <Menu.Sub.Dropdown>
                                <Menu.Item>Sub action</Menu.Item>
                            </Menu.Sub.Dropdown>
                        </Menu.Sub>
                    </Menu.Dropdown>
                </Menu>
            </UIProvider>
        )

        // 点击触发项展开子菜单（子下拉经 Portal 挂在 body 级共享节点，与父下拉是兄弟；
        // 内容经 Transition 双重 rAF 后挂载，需等待异步帧）
        fireEvent.click(screen.getByText('More options'))
        expect(await screen.findByText('Sub action')).toBeInTheDocument()

        // 子下拉内 mousedown（修复前冒泡到 document 命中父 Menu 的 click-outside，整单误关）
        fireEvent.mouseDown(screen.getByText('Sub action'))
        // 子下拉内 keydown（如 MenuSearch 打字场景）
        fireEvent.keyDown(screen.getByText('Sub action'), { key: 'a' })

        expect(onChange).not.toHaveBeenCalledWith(false)
        expect(screen.getByText('Settings')).toBeInTheDocument()
        expect(screen.getByText('Sub action')).toBeInTheDocument()
    })
})
