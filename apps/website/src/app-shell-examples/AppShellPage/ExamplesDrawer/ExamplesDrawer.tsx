import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeftIcon, CodeIcon, LayoutIcon, ListIcon } from '@phosphor-icons/react';
import {
  Affix,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Text,
  Title,
  UnstyledButton,
} from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';
import { APP_SHELL_EXAMPLES_DATA } from '@react-ui/docs-demos';
import classes from './ExamplesDrawer.module.css';

export function ExamplesDrawer() {
  const [opened, { open, close }] = useDisclosure();
  const router = useRouter();
  const currentExample = router.query.e as string;
  const currentState = router.query.s === 'code' ? 'code' : 'demo';
  const StateIcon = currentState === 'code' ? LayoutIcon : CodeIcon;

  const examples = APP_SHELL_EXAMPLES_DATA.map((example) => (
    <UnstyledButton
      component={Link}
      href={`/app-shell?e=${example.id}`}
      key={example.id}
      mod={{ active: router.query.e === example.id }}
      className={classes.control}
      onClick={close}
    >
      <Text span className={classes.name}>
        {example.name}
      </Text>
      <Text span className={classes.description}>
        {example.description}
      </Text>
    </UnstyledButton>
  ));

  return (
    <>
      <Affix zIndex={1000}>
        <Group p="xl">
          <Button
            component={Link}
            href="/core/app-shell"
            variant="default"
            size="md"
            leftSection={<ArrowLeftIcon className="ui-rotate-rtl" size={20} />}
            style={{ boxShadow: 'var(--ui-shadow-sm)' }}
            radius="xl"
          >
            返回文档
          </Button>

          <Button
            component={Link}
            href={`/app-shell?e=${currentExample}&s=${currentState === 'code' ? 'demo' : 'code'}`}
            variant="default"
            size="md"
            w={160}
            leftSection={<StateIcon size={20} />}
            style={{ boxShadow: 'var(--ui-shadow-sm)' }}
            radius="xl"
          >
            {currentState === 'code' ? '查看演示' : '查看代码'}
          </Button>

          <Button
            onClick={open}
            size="md"
            radius="xl"
            leftSection={<ListIcon size={20} />}
            w="var(--button-height)"
            style={{ boxShadow: 'var(--ui-shadow-sm)' }}
            aria-label="其他示例"
            className={classes.menuButton}
          />
        </Group>
      </Affix>

      <Drawer
        opened={opened}
        onClose={close}
        zIndex={2000}
        position="right"
        withCloseButton={false}
        padding={0}
      >
        <ScrollArea h="100dvh" type="scroll" p="md">
          <Title order={3} fz="lg" fw={500} pl="lg" pt="md">
            AppShell 组件示例
          </Title>

          <Divider my="sm" />

          {examples}
        </ScrollArea>
      </Drawer>
    </>
  );
}
