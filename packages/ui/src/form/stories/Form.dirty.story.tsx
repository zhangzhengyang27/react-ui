import { TrashIcon } from '@phosphor-icons/react';
import { ActionIcon } from '../../components/ActionIcon/index';
import { Button } from '../../components/Button/index';
import { Code } from '../../components/Code/Code';
import { Group } from '../../components/Group/Group';
import { Text } from '../../components/Text/index';
import { TextInput } from '../../components/TextInput/TextInput';
import { useForm } from '../use-form';

export default { title: 'Form' };

export function Dirty() {
  const form = useForm<{ formArray: Array<{ key: string; one: string; two: string }> }>({
    initialValues: {
      formArray: [
        {
          key: 'item-a',
          one: '1',
          two: '1',
        },
        {
          key: 'item-b',
          one: '2',
          two: '2',
        },
      ],
    },
  });

  return (
    <>
      {/* 列表项用稳定 key 而非 index:删除中间项时 index key 会与数据错位 */}
      {form.values.formArray.map((item, index) => (
        <Group key={item.key}>
          <ActionIcon onClick={() => form.removeListItem('formArray', index)}>
            <TrashIcon size={16} />
          </ActionIcon>
          <TextInput {...form.getInputProps(`formArray.${index}.one`)} />
          <TextInput {...form.getInputProps(`formArray.${index}.two`)} />
        </Group>
      ))}
      <Button
        onClick={() =>
          form.insertListItem('formArray', {
            key: window.crypto.randomUUID(),
            one: '',
            two: '',
          })
        }
      >
        Add item
      </Button>
      <Text>{form.isDirty() ? 'Dirty' : 'Not Dirty'}</Text>
      <Code block>{JSON.stringify(form.values, null, 2)}</Code>
    </>
  );
}

export function DirtyUncontrolled() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      text: '1',
    },
  });

  return (
    <div style={{ maxWidth: 500, margin: 'auto', padding: 40 }}>
      <TextInput {...form.getInputProps('text')} key={form.key('text')} />
      <div>{form.isDirty() ? 'Dirty' : 'Not dirty'}</div>
    </div>
  );
}
