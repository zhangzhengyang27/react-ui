import { TrashIcon } from '@phosphor-icons/react';
import { ActionIcon, Box, Button, Group, Switch, Text, TextInput } from '@react-ui/ui';
import { useForm } from '@react-ui/form';
import { randomId } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useForm } from '@react-ui/form';
import { TextInput, Switch, Group, ActionIcon, Box, Text, Button } from '@react-ui/ui';
import { randomId } from '@react-ui/hooks';
import { TrashIcon } from '@phosphor-icons/react';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      employees: [{ name: '', active: false, key: 'employee-1' }],
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
    <Box maw={500} mx="auto">
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
          这里没人...
        </Text>
      )}

      {fields}

      <Group justify="center" mt="md">
        <Button
          onClick={() =>
            form.insertListItem('employees', { name: '', active: false, key: randomId() })
          }
        >
          添加员工
        </Button>
      </Group>
    </Box>
  );
}
`;

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      employees: [{ name: '', active: false, key: 'employee-1' }],
    },
  });

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
  ));

  return (
    <Box maw={500} mx="auto">
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
          这里没人...
        </Text>
      )}

      {fields}

      <Group justify="center" mt="md">
        <Button
          onClick={() =>
            form.insertListItem('employees', { name: '', active: false, key: randomId() })
          }
        >
          添加员工
        </Button>
      </Group>
    </Box>
  );
}

export const lists: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
