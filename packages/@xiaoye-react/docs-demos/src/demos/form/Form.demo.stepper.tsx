import { useState } from 'react';
import { Button, Code, Group, PasswordInput, Stepper, TextInput } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/form';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Stepper, Button, Group, TextInput, PasswordInput, Code } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/form';

function Demo() {
  const [active, setActive] = useState(0);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
      name: '',
      email: '',
      website: '',
      github: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          username:
            values.username.trim().length < 6
              ? '用户名至少包含 6 个字符'
              : null,
          password:
            values.password.length < 6 ? '密码至少包含 6 个字符' : null,
        };
      }

      if (active === 1) {
        return {
          name: values.name.trim().length < 2 ? '姓名至少包含 2 个字符' : null,
          email: /^\\S+@\\S+$/.test(values.email) ? null : '无效的邮箱',
        };
      }

      return {};
    },
  });

  const nextStep = async () => {
    const result = await form.validate();
    if (!result.hasErrors) {
      setActive((current) => (current < 3 ? current + 1 : current));
    }
  };

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active}>
        <Stepper.Step label="第一步" description="个人资料设置">
          <TextInput
            label="用户名"
            placeholder="用户名"
            key={form.key('username')}
            {...form.getInputProps('username')}
          />
          <PasswordInput
            mt="md"
            label="密码"
            placeholder="密码"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
        </Stepper.Step>

        <Stepper.Step label="第二步" description="个人信息">
          <TextInput
            label="姓名"
            placeholder="姓名"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            mt="md"
            label="邮箱"
            placeholder="邮箱"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
        </Stepper.Step>

        <Stepper.Step label="最后一步" description="社交媒体">
          <TextInput
            label="网站"
            placeholder="网站"
            key={form.key('website')}
            {...form.getInputProps('website')}
          />
          <TextInput
            mt="md"
            label="GitHub 用户名"
            placeholder="GitHub 用户名"
            key={form.key('github')}
            {...form.getInputProps('github')}
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(form.getValues(), null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>下一步</Button>}
      </Group>
    </>
  );
}
`;

function Demo() {
  const [active, setActive] = useState(0);

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      username: '',
      password: '',
      name: '',
      email: '',
      website: '',
      github: '',
    },

    validate: (values) => {
      if (active === 0) {
        return {
          username:
            values.username.trim().length < 6
              ? '用户名至少包含 6 个字符'
              : null,
          password:
            values.password.length < 6 ? '密码至少包含 6 个字符' : null,
        };
      }

      if (active === 1) {
        return {
          name: values.name.trim().length < 2 ? '姓名至少包含 2 个字符' : null,
          email: /^\S+@\S+$/.test(values.email) ? null : '无效的邮箱',
        };
      }

      return {};
    },
  });

  const nextStep = async () => {
    const result = await form.validate();
    if (!result.hasErrors) {
      setActive((current) => (current < 3 ? current + 1 : current));
    }
  };

  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <>
      <Stepper active={active}>
        <Stepper.Step label="第一步" description="个人资料设置">
          <TextInput
            label="用户名"
            placeholder="用户名"
            key={form.key('username')}
            {...form.getInputProps('username')}
          />
          <PasswordInput
            mt="md"
            label="密码"
            placeholder="密码"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
        </Stepper.Step>

        <Stepper.Step label="第二步" description="个人信息">
          <TextInput
            label="姓名"
            placeholder="姓名"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            mt="md"
            label="邮箱"
            placeholder="邮箱"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
        </Stepper.Step>

        <Stepper.Step label="最后一步" description="社交媒体">
          <TextInput
            label="网站"
            placeholder="网站"
            key={form.key('website')}
            {...form.getInputProps('website')}
          />
          <TextInput
            mt="md"
            label="GitHub 用户名"
            placeholder="GitHub 用户名"
            key={form.key('github')}
            {...form.getInputProps('github')}
          />
        </Stepper.Step>
        <Stepper.Completed>
          Completed! Form values:
          <Code block mt="xl">
            {JSON.stringify(form.getValues(), null, 2)}
          </Code>
        </Stepper.Completed>
      </Stepper>

      <Group justify="flex-end" mt="xl">
        {active !== 0 && (
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
        )}
        {active !== 3 && <Button onClick={nextStep}>下一步</Button>}
      </Group>
    </>
  );
}

export const stepper: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
