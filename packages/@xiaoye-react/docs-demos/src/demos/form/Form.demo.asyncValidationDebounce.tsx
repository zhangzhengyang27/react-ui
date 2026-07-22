/* oxlint-disable no-console */

import { Button, Group, Loader, TextInput } from '@xiaoye-react/ui';
import { isEmail, useForm } from '@xiaoye-react/form';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Group, Loader, TextInput } from '@xiaoye-react/ui';
import { useForm, isEmail } from '@xiaoye-react/form';

// Simulates an async API call to check if the username is available
function checkUsernameAvailability(username: string, signal?: AbortSignal): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const taken = ['admin', 'user', 'test', 'ui'];
      resolve(taken.includes(username.toLowerCase()) ? '用户名已被占用' : null);
    }, 800);

    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { username: '', email: '' },

    // Debounce async validation by 500ms – prevents firing
    // an API call on every keystroke
    validateDebounce: 500,
    validateInputOnChange: ['username'],

    validate: {
      username: async (value, _values, _path, signal) => {
        if (value.trim().length < 3) {
          return '用户名至少包含 3 个字符';
        }
        return checkUsernameAvailability(value, signal);
      },
      email: isEmail('无效的邮箱'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        label="用户名"
        description="尝试：admin、user、test、ui"
        placeholder="请输入用户名"
        key={form.key('username')}
        disabled={form.submitting}
        rightSection={form.isValidating('username') ? <Loader size={16} /> : null}
        {...form.getInputProps('username')}
      />

      <TextInput
        withAsterisk
        mt="md"
        label="邮箱"
        placeholder="yourname@example.com"
        key={form.key('email')}
        disabled={form.submitting}
        {...form.getInputProps('email')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit" loading={form.submitting}>
          提交
        </Button>
      </Group>
    </form>
  );
}
`;

function checkUsernameAvailability(username: string, signal?: AbortSignal): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      const taken = ['admin', 'user', 'test', 'ui'];
      resolve(taken.includes(username.toLowerCase()) ? '用户名已被占用' : null);
    }, 800);

    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { username: '', email: '' },

    // Debounce async validation by 500ms – prevents firing
    // an API call on every keystroke
    validateDebounce: 500,
    validateInputOnChange: ['username'],

    validate: {
      username: async (value, _values, _path, signal) => {
        if (value.trim().length < 3) {
          return '用户名至少包含 3 个字符';
        }
        return checkUsernameAvailability(value, signal);
      },
      email: isEmail('无效的邮箱'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        label="用户名"
        description="尝试：admin、user、test、ui"
        placeholder="请输入用户名"
        key={form.key('username')}
        disabled={form.submitting}
        rightSection={form.isValidating('username') ? <Loader size={16} /> : null}
        {...form.getInputProps('username')}
      />

      <TextInput
        withAsterisk
        mt="md"
        label="邮箱"
        placeholder="yourname@example.com"
        key={form.key('email')}
        disabled={form.submitting}
        {...form.getInputProps('email')}
      />

      <Group justify="flex-end" mt="md">
        <Button type="submit" loading={form.submitting}>
          提交
        </Button>
      </Group>
    </form>
  );
}

export const asyncValidationDebounce: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
