import { CaretRightIcon } from '@phosphor-icons/react/dist/csr/CaretRight'
import { Avatar, Group, Menu, Text, UnstyledButton } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'
import { DemoMenuItems } from './_menu-items'

const code = `
import { CaretRightIcon } from '@phosphor-icons/react/dist/csr/CaretRight';
import { Group, Avatar, Text, Menu, UnstyledButton } from '@xiaoye-react/ui';

interface UserButtonProps extends React.ComponentProps<'button'> {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

function UserButton({ image, name, email, icon, ...others }: UserButtonProps) {
  return (
    <UnstyledButton
      style={{
        padding: 'var(--ui-spacing-md)',
        color: 'var(--ui-color-text)',
        borderRadius: 'var(--ui-radius-sm)',
      }}
      {...others}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {name}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon || <CaretRightIcon size={16} />}
      </Group>
    </UnstyledButton>
  );
}

function Demo() {
  return (
    <Menu withArrow>
      <Menu.Target>
        <UserButton
          image="/demo/avatars/avatar-8.png"
          name="Harriette Spoonlicker"
          email="hspoonlicker@outlook.com"
        />
      </Menu.Target>
      {/* ... menu items */}
    </Menu>
  );
}
`

interface UserButtonProps extends React.ComponentProps<'button'> {
    image: string
    name: string
    email: string
    icon?: React.ReactNode
}

function UserButton({ image, name, email, icon, ...others }: UserButtonProps) {
    return (
        <UnstyledButton
            style={{
                padding: 'var(--ui-spacing-md)',
                color: 'var(--ui-color-text)',
                borderRadius: 'var(--ui-radius-sm)'
            }}
            {...others}
        >
            <Group>
                <Avatar src={image} radius="xl" />

                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        {name}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {email}
                    </Text>
                </div>

                {icon || <CaretRightIcon size={16} />}
            </Group>
        </UnstyledButton>
    )
}

function Demo() {
    return (
        <Menu withArrow>
            <Menu.Target>
                <UserButton
                    image="/demo/avatars/avatar-8.png"
                    name="Harriette Spoonlicker"
                    email="hspoonlicker@outlook.com"
                />
            </Menu.Target>
            <DemoMenuItems withTarget={false} />
        </Menu>
    )
}

export const customControl: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    centered: true
}
