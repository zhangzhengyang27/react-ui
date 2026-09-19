import { useSearchParams } from 'react-router-dom'
import { FiArrowLeft, FiCode, FiLayout, FiList } from '../../theme/icons'
import { Affix, Button, Divider, Drawer, Group, ScrollArea, Text, Title, UnstyledButton } from '@xiaoye-react/ui'
import { useDisclosure } from '@xiaoye-react/hooks'
import { APP_SHELL_EXAMPLES_DATA, AppShellDemo } from '../../../demos/app-shell'
import classes from './app-shell.module.css'

export default function AppShellPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [opened, { open, close }] = useDisclosure()
    const currentExample = searchParams.get('e') || ''
    const currentState = searchParams.get('s') === 'code' ? 'code' : 'demo'
    const StateIcon = currentState === 'code' ? FiLayout : FiCode

    const handleNavigate = (id: string) => {
        setSearchParams({ e: id, s: currentState }, { replace: true })
        close()
    }

    const toggleState = () => {
        setSearchParams({ e: currentExample, s: currentState === 'code' ? 'demo' : 'code' }, { replace: true })
    }

    const examples = APP_SHELL_EXAMPLES_DATA.map(example => (
        <UnstyledButton
            key={example.id}
            mod={{ active: currentExample === example.id }}
            className={classes.control}
            onClick={() => handleNavigate(example.id)}
        >
            <Text span className={classes.name}>
                {example.name}
            </Text>
            <Text span className={classes.description}>
                {example.description}
            </Text>
        </UnstyledButton>
    ))

    return (
        <div>
            <AppShellDemo />

            <Affix zIndex={1000}>
                <Group p="xl">
                    <Button
                        component="a"
                        href="/components/app-shell"
                        variant="default"
                        size="md"
                        leftSection={<FiArrowLeft size={20} />}
                        style={{ boxShadow: 'var(--ui-shadow-sm)' }}
                        radius="xl"
                    >
                        返回文档
                    </Button>

                    <Button
                        onClick={toggleState}
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
                        leftSection={<FiList size={20} />}
                        w="var(--button-height)"
                        style={{ boxShadow: 'var(--ui-shadow-sm)' }}
                        aria-label="其他示例"
                        className={classes.menuButton}
                    />
                </Group>
            </Affix>

            <Drawer opened={opened} onClose={close} zIndex={2000} position="right" withCloseButton={false} padding={0}>
                <ScrollArea h="100dvh" type="always" p="md">
                    <Title order={3} fz="lg" fw={500} pl="lg" pt="md">
                        AppShell 组件示例
                    </Title>
                    <Divider my="sm" />
                    {examples}
                </ScrollArea>
            </Drawer>
        </div>
    )
}
