/* oxlint-disable no-console */
import { useEffect } from 'react';
import { Checkbox, TextInput } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useEffect } from 'react';
import { useForm } from '@xiaoye-react/ui';
import { TextInput, Checkbox } from '@xiaoye-react/ui';

interface FormValues {
  email: string;
  terms: boolean;
}

function loadInitialValues(): Promise<FormValues> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ email: 'test@email', terms: true }), 2000);
  });
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { email: '', terms: false },
  });

  useEffect(() => {
    loadInitialValues().then((values) => {
      form.setValues(values);
      form.resetDirty(values);
    });
  }, []);

  return (
    <form onSubmit={form.onSubmit(console.log)}>
      <TextInput
        label="邮箱"
        placeholder="邮箱"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <Checkbox
        mt="sm"
        label="我接受条款和条件"
        key={form.key('terms')}
        {...form.getInputProps('terms', { type: 'checkbox' })}
      />
    </form>
  );
}
`;

interface FormValues {
  email: string;
  terms: boolean;
}

function loadInitialValues(): Promise<FormValues> {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ email: 'test@email', terms: true }), 2000);
  });
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { email: '', terms: false },
  });

  useEffect(() => {
    loadInitialValues().then((values) => {
      form.setValues(values);
      form.resetDirty(values);
    });
  }, []);

  return (
    <form onSubmit={form.onSubmit(console.log)}>
      <TextInput
        label="邮箱"
        placeholder="邮箱"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
      <Checkbox
        mt="sm"
        label="我接受条款和条件"
        key={form.key('terms')}
        {...form.getInputProps('terms', { type: 'checkbox' })}
      />
    </form>
  );
}

export const asyncSetValues: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
