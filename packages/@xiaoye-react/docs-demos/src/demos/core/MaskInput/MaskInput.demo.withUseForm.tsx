/* oxlint-disable no-console */
import { Button, MaskInput } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/form';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, MaskInput } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { phone: '' },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <MaskInput
        mask="(999) 999-9999"
        placeholder="(___) ___-____"
        label="电话"
        onChangeRaw={(raw) => form.setFieldValue('phone', raw, { forceUpdate: false })}
      />

      <Button type="submit" mt="md">
        提交
      </Button>
    </form>
  );
}
`;

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { phone: '' },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <MaskInput
        mask="(999) 999-9999"
        placeholder="(___) ___-____"
        label="电话"
        onChangeRaw={(raw) => form.setFieldValue('phone', raw, { forceUpdate: false })}
      />

      <Button type="submit" mt="md">
        提交
      </Button>
    </form>
  );
}

export const withUseForm: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
