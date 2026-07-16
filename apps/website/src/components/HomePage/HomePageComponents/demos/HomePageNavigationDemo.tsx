import { useState } from 'react';
import {
  ArrowsClockwiseIcon,
  CaretRightIcon,
  ChatCircleIcon,
  DotsThreeIcon,
  GearSixIcon,
  HeartIcon,
  ImageIcon,
  PauseIcon,
  SignOutIcon,
  StarIcon,
  TrashIcon,
} from '@phosphor-icons/react';
import {
  Avatar,
  Button,
  Group,
  Input,
  Menu,
  Pagination,
  SimpleGrid,
  Stepper,
  Tabs,
  Text,
  useUITheme,
} from '@react-ui/ui';

function MenuDemo() {
  const theme = useUITheme();
  return (
    <Menu
      width={300}
      position="bottom-start"
      transitionProps={{ transition: 'pop' }}
      styles={{ item: { fontSize: 16 }, label: { fontSize: 14 } }}
      radius="md"
    >
      <Menu.Target>
        <Button
          variant="default"
          rightSection={<DotsThreeIcon size={24} />}
          miw={200}
          size="lg"
          radius="md"
          justify="space-between"
        >
          用户菜单
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item rightSection={<CaretRightIcon size={18} />}>
          <Group>
            <Avatar
              radius="xl"
              src="https://avatars.githubusercontent.com/u/1?s=200&v=4"
            />

            <div>
              <Text fw={500}>王小美</Text>
              <Text size="xs" c="dimmed">
                xiaomei@react-ui.dev
              </Text>
            </div>
          </Group>
        </Menu.Item>

        <Menu.Divider />

        <Menu.Item leftSection={<HeartIcon weight="fill" size={18} color={theme.colors.red[6]} />}>
          点赞的文章
        </Menu.Item>
        <Menu.Item
          leftSection={<StarIcon weight="fill" size={18} color={theme.colors.yellow[6]} />}
        >
          收藏的文章
        </Menu.Item>
        <Menu.Item
          leftSection={<ChatCircleIcon weight="fill" size={18} color={theme.colors.blue[6]} />}
        >
          我的评论
        </Menu.Item>

        <Menu.Label>设置</Menu.Label>
        <Menu.Item leftSection={<GearSixIcon size={18} />}>账户设置</Menu.Item>
        <Menu.Item leftSection={<ArrowsClockwiseIcon size={18} />}>切换账户</Menu.Item>
        <Menu.Item leftSection={<SignOutIcon size={18} />}>退出登录</Menu.Item>

        <Menu.Divider />

        <Menu.Label>危险操作</Menu.Label>
        <Menu.Item leftSection={<PauseIcon size={18} />}>暂停订阅</Menu.Item>
        <Menu.Item color="red" leftSection={<TrashIcon size={18} />}>
          删除账户
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function StepperDemo() {
  const [active, setActive] = useState(1);

  return (
    <>
      <Stepper active={active} onStepClick={setActive} visibleFrom="sm">
        <Stepper.Step label="第一步" description="创建账户" />
        <Stepper.Step label="第二步" description="验证邮箱" />
        <Stepper.Step label="最后一步" description="获取完整权限" />
        <Stepper.Completed>已完成，点击返回按钮回到上一步</Stepper.Completed>
      </Stepper>

      <Stepper active={active} onStepClick={setActive} hiddenFrom="sm" orientation="vertical">
        <Stepper.Step label="第一步" description="创建账户" />
        <Stepper.Step label="第二步" description="验证邮箱" />
        <Stepper.Step label="最后一步" description="获取完整权限" />
        <Stepper.Completed>已完成，点击返回按钮回到上一步</Stepper.Completed>
      </Stepper>
    </>
  );
}

function TabsDemo() {
  return (
    <Tabs
      defaultValue="gallery"
      styles={{ tab: { fontSize: 'var(--ui-font-size-md)', gap: 3, paddingInlineStart: 10 } }}
      radius="md"
    >
      <Tabs.List>
        <Tabs.Tab
          value="gallery"
          leftSection={<ImageIcon size={18} color="var(--ui-color-dimmed)" />}
        >
          相册
        </Tabs.Tab>
        <Tabs.Tab
          value="messages"
          leftSection={<ChatCircleIcon size={18} color="var(--ui-color-dimmed)" />}
        >
          消息
        </Tabs.Tab>
        <Tabs.Tab
          value="settings"
          leftSection={<GearSixIcon size={18} color="var(--ui-color-dimmed)" />}
        >
          设置
        </Tabs.Tab>
      </Tabs.List>
    </Tabs>
  );
}

export function HomePageNavigationDemo() {
  return (
    <SimpleGrid cols={{ md: 2 }} spacing={50}>
      <div>
        <Input.Label labelElement="div" size="lg" mb="sm" display="block">
          Stepper
        </Input.Label>
        <StepperDemo />
      </div>

      <div>
        <Input.Label labelElement="div" size="lg" mb="sm" display="block">
          Tabs
        </Input.Label>
        <TabsDemo />
      </div>

      <div>
        <Input.Label labelElement="div" size="lg" mb="sm" display="block">
          Pagination
        </Input.Label>
        <Pagination total={56} size="lg" radius="md" />
      </div>

      <div>
        <Input.Label labelElement="div" size="lg" mb="sm" display="block">
          Menu
        </Input.Label>
        <MenuDemo />
      </div>
    </SimpleGrid>
  );
}
