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

    // Popover 一路把 portalProps 传进了 context，但 PopoverDropdown 此前没有展开它，
    // 用户写的 target/className 全部静默无效。OptionalPortal 在 env==='test' 时会短路掉
    // Portal（连 withinPortal=false 也走不到 Portal），所以这里显式把 env 设回 'default'，
    // 让挂载点真正成为可断言的对象。
    it('forwards portalProps to the Portal that hosts the dropdown', () => {
        const host = document.createElement('div')
        host.id = 'popover-portal-host'
        document.body.appendChild(host)

        render(
            <UIProvider env="default">
                <Popover opened portalProps={{ target: '#popover-portal-host' }}>
                    <Popover.Target>
                        <Button>target</Button>
                    </Popover.Target>
                    <Popover.Dropdown>ported dropdown content</Popover.Dropdown>
                </Popover>
            </UIProvider>
        )

        expect(host).toHaveTextContent('ported dropdown content')
        host.remove()
    })
})
