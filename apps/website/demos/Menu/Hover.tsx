'use client'

import { Button, Menu } from '@react-ui/ui'

export default function MenuHoverDemo() {
    return (
        <Menu trigger="hover" openDelay={100} closeDelay={200}>
            <Menu.Target>
                <Button>悬停打开</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item>设置</Menu.Item>
                <Menu.Item>消息</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
