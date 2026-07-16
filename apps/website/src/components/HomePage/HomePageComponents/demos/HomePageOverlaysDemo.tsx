import { SlidersHorizontalIcon } from '@phosphor-icons/react';
import {
  Anchor,
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Drawer,
  Group,
  HoverCard,
  Input,
  Modal,
  Popover,
  Radio,
  SegmentedControl,
  SimpleGrid,
  Stack,
  Text,
  Tooltip,
} from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';
import { AuthenticationForm } from '@react-ui/docs-demos';
import classes from './HomePageOverlaysDemo.module.css';

export function HomePageOverlaysDemo() {
  const [modalOpened, modalHandlers] = useDisclosure(false);
  const [drawerOpened, drawerHandlers] = useDisclosure(false);

  return (
    <>
      <Modal opened={modalOpened} onClose={modalHandlers.close} title="身份验证" radius="md">
        <AuthenticationForm noShadow noPadding />
      </Modal>

      <Drawer
        opened={drawerOpened}
        onClose={drawerHandlers.close}
        title="身份验证"
        radius="md"
        offset={5}
      >
        <AuthenticationForm noShadow noPadding />
      </Drawer>

      <SimpleGrid cols={{ md: 2 }} spacing="xl">
        <SimpleGrid cols={{ xs: 2 }}>
          <div>
            <Input.Label labelElement="div" size="lg" mb="sm" display="block">
              Popover
            </Input.Label>

            <Popover radius="md" position="bottom-start" shadow="md">
              <Popover.Target>
                <Button
                  miw={200}
                  size="lg"
                  variant="default"
                  radius="md"
                  rightSection={<SlidersHorizontalIcon size={22} />}
                  justify="space-between"
                >
                  筛选
                </Button>
              </Popover.Target>

              <Popover.Dropdown className={classes.popoverDropdown}>
                <Input.Label
                  labelElement="div"
                  display="block"
                  mb={3}
                  size="md"
                  className={classes.label}
                >
                  订单状态
                </Input.Label>
                <SegmentedControl data={['进行中', '已送达']} radius="md" size="md" />

                <Input.Label
                  labelElement="div"
                  display="block"
                  mb={5}
                  mt="md"
                  size="md"
                  className={classes.label}
                >
                  品牌
                </Input.Label>

                <Checkbox label="佳能" size="md" defaultChecked />
                <Checkbox label="尼康" mt={8} size="md" defaultChecked />
                <Checkbox label="索尼" mt={8} size="md" />
                <Checkbox label="富士" mt={8} size="md" />
                <Checkbox label="徕卡" mt={8} size="md" />

                <Input.Label
                  labelElement="div"
                  display="block"
                  mb={5}
                  mt={24}
                  size="md"
                  className={classes.label}
                >
                  价格区间
                </Input.Label>

                <Radio.Group defaultValue="200">
                  <Stack gap={8}>
                    <Radio label="低于 $100" value="100" size="md" />
                    <Radio label="$100 - $200" value="200" size="md" />
                    <Radio label="$200 - $500" value="500" size="md" />
                    <Radio label="$500 - $1000" value="1000" size="md" />
                    <Radio label="高于 $1000" value="1001" size="md" />
                  </Stack>
                </Radio.Group>
              </Popover.Dropdown>
            </Popover>
          </div>

          <div>
            <Input.Label labelElement="div" size="lg" mb="sm">
              悬停卡片
            </Input.Label>
            <HoverCard
              width={320}
              shadow="md"
              withArrow
              openDelay={200}
              closeDelay={400}
              position="bottom-start"
              arrowOffset={15}
              radius="md"
            >
              <HoverCard.Target>
                <Group w="max-content">
                  <Avatar
                    src="https://avatars.githubusercontent.com/u/79146003?s=200&v=4"
                    radius="xl"
                  />
                  <Stack gap={5}>
                    <Text size="sm" fw={700} lh={1} c="bright">
                      ReactUI
                    </Text>
                    <Anchor href="https://github.com/xiaoye/react-ui" c="dimmed" size="xs" lh={1}>
                      @xiaoye
                    </Anchor>
                  </Stack>
                </Group>
              </HoverCard.Target>
              <HoverCard.Dropdown>
                <Group>
                  <Avatar
                    src="https://avatars.githubusercontent.com/u/79146003?s=200&v=4"
                    radius="xl"
                  />
                  <Stack gap={5}>
                    <Text size="sm" fw={700} lh={1} c="bright">
                      ReactUI
                    </Text>
                    <Anchor href="https://github.com/xiaoye/react-ui" c="dimmed" size="xs" lh={1}>
                      @xiaoye
                    </Anchor>
                  </Stack>
                </Group>

                <Text size="sm" mt="md">
                  可定制的 React 组件与 Hooks 库，专注于可用性、可访问性与开发者体验
                </Text>

                <Group mt="md" gap="xl">
                  <Text size="sm">
                    <Box component="b" c="bright">
                      0
                    </Box>{' '}
                    正在关注
                  </Text>
                  <Text size="sm">
                    <Box component="b" c="bright">
                      1,174
                    </Box>{' '}
                    关注者
                  </Text>
                </Group>
              </HoverCard.Dropdown>
            </HoverCard>
          </div>

          <div>
            <Input.Label labelElement="div" size="lg" mb="sm" display="block">
              提示框
            </Input.Label>
            <Tooltip label="提示文本" withArrow>
              <Badge className={classes.tooltip} size="lg" variant="dot" color="yellow">
                悬停查看提示框
              </Badge>
            </Tooltip>
          </div>
          <div>
            <Input.Label labelElement="div" size="lg" mb="sm" display="block">
              模态框与抽屉
            </Input.Label>
            <Group>
              <Button variant="default" radius="md" onClick={modalHandlers.open}>
                打开模态框
              </Button>
              <Button variant="default" radius="md" onClick={drawerHandlers.open}>
                打开抽屉
              </Button>
            </Group>
          </div>
        </SimpleGrid>

        <div>
          <Input.Label labelElement="div" size="lg">
            浮动提示框
          </Input.Label>
          <Tooltip.Floating label="浮动提示文本" withinPortal={false}>
            <div className={classes.floating}>
              悬停查看跟随鼠标的浮动提示框
            </div>
          </Tooltip.Floating>
        </div>
      </SimpleGrid>
    </>
  );
}
