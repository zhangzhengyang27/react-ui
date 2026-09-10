import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check'
import { ActionIcon, Center, Group, RingProgress, Text } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { ActionIcon, RingProgress, Text, Center } from '@xiaoye-react/ui';
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
function Demo() {
  return (
    <>
      <RingProgress
        sections={[{ value: 40, color: 'blue' }]}
        label={
          <Text c="blue" fw={700} ta="center" size="xl">
            40%
          </Text>
        }
      />

      <RingProgress
        sections={[{ value: 100, color: 'teal' }]}
        label={
          <Center>
            <ActionIcon color="teal" variant="light" radius="xl" size="xl">
              <CheckIcon size={22} />
            </ActionIcon>
          </Center>
        }
      />
    </>
  );
}
`

function Demo() {
    return (
        <Group justify="center">
            <RingProgress
                sections={[{ value: 40, color: 'blue' }]}
                label={
                    <Text c="blue" fw={700} ta="center" size="xl">
                        40%
                    </Text>
                }
            />

            <RingProgress
                sections={[{ value: 100, color: 'teal' }]}
                label={
                    <Center>
                        <ActionIcon color="teal" variant="light" radius="xl" size="xl">
                            <CheckIcon size={22} />
                        </ActionIcon>
                    </Center>
                }
            />
        </Group>
    )
}

export const label: UIDemo = {
    type: 'code',
    code,
    component: Demo
}
