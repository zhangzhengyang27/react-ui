import { ArrowsLeftRightIcon } from '@phosphor-icons/react/dist/csr/ArrowsLeftRight'
import { ChatCircleIcon } from '@phosphor-icons/react/dist/csr/ChatCircle'
import { GearSixIcon } from '@phosphor-icons/react/dist/csr/GearSix'
import { ImageIcon } from '@phosphor-icons/react/dist/csr/Image'
import { MagnifyingGlassIcon } from '@phosphor-icons/react/dist/csr/MagnifyingGlass'
import { TrashIcon } from '@phosphor-icons/react/dist/csr/Trash'
import { Button, Menu, Text } from '@xiaoye-react/ui'

export function DemoMenuItems({ widthRightSection = true, withTarget = true }) {
    return (
        <>
            {withTarget && (
                <Menu.Target>
                    <Button>切换菜单</Button>
                </Menu.Target>
            )}

            <Menu.Dropdown>
                <Menu.Label>应用</Menu.Label>
                <Menu.Item leftSection={<GearSixIcon size={14} />}>设置</Menu.Item>
                <Menu.Item leftSection={<ChatCircleIcon size={14} />}>消息</Menu.Item>
                <Menu.Item leftSection={<ImageIcon size={14} />}>相册</Menu.Item>
                {widthRightSection && (
                    <Menu.Item
                        leftSection={<MagnifyingGlassIcon size={14} />}
                        rightSection={
                            <Text size="xs" c="dimmed">
                                ⌘K
                            </Text>
                        }
                    >
                        Search
                    </Menu.Item>
                )}
                <Menu.Divider />
                <Menu.Label>危险区域</Menu.Label>
                <Menu.Item leftSection={<ArrowsLeftRightIcon size={14} />}>转移我的数据</Menu.Item>
                <Menu.Item color="red" leftSection={<TrashIcon size={14} />}>
                    Delete my account
                </Menu.Item>
            </Menu.Dropdown>
        </>
    )
}
