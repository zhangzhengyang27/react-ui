import { TrashIcon } from '@phosphor-icons/react/dist/csr/Trash'
import { ActionIcon, Button, Group, Switch, Text, TextInput } from '@xiaoye-react/ui'
import { formRootRule, isNotEmpty, useForm } from '@xiaoye-react/ui'
import { randomId } from '@xiaoye-react/hooks'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { TrashIcon } from '@phosphor-icons/react/dist/csr/Trash';
import { ActionIcon, Button, Group, Switch, Text, TextInput } from '@xiaoye-react/ui';
import { formRootRule, isNotEmpty, useForm } from '@xiaoye-react/ui';
import { randomId } from '@xiaoye-react/hooks';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      employees: [{ name: '', active: false, key: 'employee-1' }],
    },
    validate: {
      employees: {
        [formRootRule]: isNotEmpty('至少需要一名员工'),
        name: isNotEmpty('姓名必填'),
      },
    },
  });

  const fields = form.getValues().employees.map((item, index) => (
    <Group key={item.key} mt="xs">
      <TextInput
        placeholder="张三"
        withAsterisk
        style={{ flex: 1 }}
        key={form.key(\`employees.\${index}.name\`)}
        {...form.getInputProps(\`employees.\${index}.name\`)}
      />
      <Switch
        label="激活"
        key={form.key(\`employees.\${index}.active\`)}
        {...form.getInputProps(\`employees.\${index}.active\`, { type: 'checkbox' })}
      />
      <ActionIcon color="red" onClick={() => form.removeListItem('employees', index)}>
        <TrashIcon size={16} />
      </ActionIcon>
    </Group>
  ));

  return (
    <form onSubmit={form.onSubmit(() => {})}>
      {fields.length > 0 ? (
        <Group mb="xs">
          <Text fw={500} size="sm" style={{ flex: 1 }}>
            姓名
          </Text>
          <Text fw={500} size="sm" pr={90}>
            状态
          </Text>
        </Group>
      ) : (
        <Text c="dimmed" ta="center">
          No one here...
        </Text>
      )}

      {fields}

      {form.errors.employees && (
        <Text c="red" size="sm" mt="sm">
          {form.errors.employees}
        </Text>
      )}

      <Group justify="space-between" mt="md">
        <Button
          variant="default"
          onClick={() => {
            form.insertListItem('employees', { name: '', active: false, key: randomId() });
            form.clearFieldError('employees');
          }}
        >
          Add employee
        </Button>
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`

function Demo() {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            employees: [{ name: '', active: false, key: 'employee-1' }]
        },
        validate: {
            employees: {
                [formRootRule]: isNotEmpty('至少需要一名员工'),
                name: isNotEmpty('姓名必填')
            }
        }
    })

    const fields = form.getValues().employees.map((item, index) => (
        <Group key={item.key} mt="xs">
            <TextInput
                placeholder="张三"
                withAsterisk
                style={{ flex: 1 }}
                key={form.key(`employees.${index}.name`)}
                {...form.getInputProps(`employees.${index}.name`)}
            />
            <Switch
                label="激活"
                key={form.key(`employees.${index}.active`)}
                {...form.getInputProps(`employees.${index}.active`, { type: 'checkbox' })}
            />
            <ActionIcon color="red" onClick={() => form.removeListItem('employees', index)}>
                <TrashIcon size={16} />
            </ActionIcon>
        </Group>
    ))

    return (
        <form onSubmit={form.onSubmit(() => {})}>
            {fields.length > 0 ? (
                <Group mb="xs">
                    <Text fw={500} size="sm" style={{ flex: 1 }}>
                        姓名
                    </Text>
                    <Text fw={500} size="sm" pr={90}>
                        状态
                    </Text>
                </Group>
            ) : (
                <Text c="dimmed" ta="center">
                    No one here...
                </Text>
            )}

            {fields}

            {form.errors.employees && (
                <Text c="red" size="sm" mt="sm">
                    {form.errors.employees}
                </Text>
            )}

            <Group justify="space-between" mt="md">
                <Button
                    variant="default"
                    onClick={() => {
                        form.insertListItem('employees', { name: '', active: false, key: randomId() })
                        form.clearFieldError('employees')
                    }}
                >
                    Add employee
                </Button>
                <Button type="submit">提交</Button>
            </Group>
        </form>
    )
}

export const rootRuleArray: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    centered: true,
    defaultExpanded: false,
    maxWidth: 440
}
