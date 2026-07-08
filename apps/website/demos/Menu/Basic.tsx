'use client'

import { Button, Menu } from '@react-ui/ui'

export default function MenuBasicDemo() {
    return (
        <Menu>
            <Menu.Target>
                <Button>打开菜单</Button>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>应用</Menu.Label>
                <Menu.Item>设置</Menu.Item>
                <Menu.Item>消息</Menu.Item>
                <Menu.Divider />
                <Menu.Item color="red">退出登录</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )
}
