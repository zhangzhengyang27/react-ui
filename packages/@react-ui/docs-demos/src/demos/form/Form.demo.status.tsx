/* oxlint-disable no-console */

import { Button, TextInput } from '@react-ui/ui';
import { useForm } from '@react-ui/form';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useForm } from '@react-ui/form';
import { TextInput, Button } from '@react-ui/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { text: '初始值' },
  });

  return (
    <div>
      <TextInput
        {...form.getInputProps('text')}
        key={form.key('text')}
        label="已触碰/已修改演示"
        placeholder="已触碰/已修改演示"
      />

      <Button
        onClick={() =>
          console.log({ touched: form.isTouched('text'), dirty: form.isDirty('text') })
        }
      >
        Log status to console
      </Button>
    </div>
  );
}
`;

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { text: '初始值' },
  });

  return (
    <div>
      <TextInput
        {...form.getInputProps('text')}
        key={form.key('text')}
        label="已触碰/已修改演示"
        placeholder="已触碰/已修改演示"
      />

      <Button
        mt="md"
        onClick={() =>
          console.log({ touched: form.isTouched('text'), dirty: form.isDirty('text') })
        }
      >
        Log status to console
      </Button>
    </div>
  );
}

export const status: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
