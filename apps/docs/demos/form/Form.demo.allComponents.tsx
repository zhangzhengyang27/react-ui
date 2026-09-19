/* oxlint-disable no-console */
import {
  AngleSlider,
  Autocomplete,
  Button,
  Checkbox,
  Chip,
  ColorInput,
  ColorPicker,
  Fieldset,
  FileInput,
  Group,
  Input,
  JsonInput,
  MaskInput,
  MultiSelect,
  NativeSelect,
  NumberInput,
  PasswordInput,
  PinInput,
  Radio,
  RangeSlider,
  Rating,
  SegmentedControl,
  Select,
  Slider,
  Switch,
  TagsInput,
  Text,
  Textarea,
  TextInput,
} from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const codeTextInput = `
import { TextInput, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\\S+@\\S+$/.test(value) ? null : '无效的邮箱'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        label="邮箱"
        placeholder="yourname@example.com"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoTextInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : '无效的邮箱'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TextInput
        withAsterisk
        label="邮箱"
        placeholder="yourname@example.com"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const textInput: UIDemo = {
  type: 'code',
  component: DemoTextInput,
  code: codeTextInput,
};

const codeAngleSlider = `
import { AngleSlider, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      angle: 0,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <AngleSlider
        aria-label="角度"
        key={form.key('angle')}
        {...form.getInputProps('angle')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoAngleSlider() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      angle: 0,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <AngleSlider aria-label="角度" key={form.key('angle')} {...form.getInputProps('angle')} />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const angleSlider: UIDemo = {
  type: 'code',
  component: DemoAngleSlider,
  code: codeAngleSlider,
};

const codeCheckbox = `
import { Checkbox, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      termsParams: false,
    },

    validate: {
      termsParams: (value) => (value ? null : 'You must agree to sell your soul'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Checkbox
        label="我同意出售我的隐私"
        key={form.key('termsParams')}
        {...form.getInputProps('termsParams', { type: 'checkbox' })}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoCheckbox() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      termsParams: false,
    },

    validate: {
      termsParams: (value) => (value ? null : 'You must agree to sell your soul'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Checkbox
        label="我同意出售我的隐私"
        key={form.key('termsParams')}
        {...form.getInputProps('termsParams', { type: 'checkbox' })}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const checkbox: UIDemo = {
  type: 'code',
  component: DemoCheckbox,
  code: codeCheckbox,
};

const codeCheckboxGroup = `
import { Checkbox, Group, Button } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      favFrameworks: [],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Checkbox.Group
        label="选择你最喜欢的框架/库"
        key={form.key('favFrameworks')}
        {...form.getInputProps('favFrameworks')}
      >
        <Group mt="xs">
          <Checkbox value="react" label="React" />
          <Checkbox value="ui" label="ReactUI" />
          <Checkbox value="ng" label="Angular" />
          <Checkbox value="svelte" label="Svelte" />
        </Group>
      </Checkbox.Group>

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoCheckboxGroup() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      favFrameworks: [],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Checkbox.Group
        label="选择你最喜欢的框架/库"
        key={form.key('favFrameworks')}
        {...form.getInputProps('favFrameworks')}
      >
        <Group mt="xs">
          <Checkbox value="react" label="React" />
          <Checkbox value="ui" label="ReactUI" />
          <Checkbox value="ng" label="Angular" />
          <Checkbox value="svelte" label="Svelte" />
        </Group>
      </Checkbox.Group>

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const checkboxGroup: UIDemo = {
  type: 'code',
  component: DemoCheckboxGroup,
  code: codeCheckboxGroup,
};

const codeChip = `
import { Chip, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      awesome: false,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Chip
        key={form.key('awesome')}
        {...form.getInputProps('awesome', { type: 'checkbox' })}
      >
        ReactUI is awesome
      </Chip>

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoChip() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      awesome: false,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Chip key={form.key('awesome')} {...form.getInputProps('awesome', { type: 'checkbox' })}>
        ReactUI is awesome
      </Chip>

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const chip: UIDemo = {
  type: 'code',
  component: DemoChip,
  code: codeChip,
};

const codeColorInput = `
import { ColorInput, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      color: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <ColorInput
        label="你最喜欢的颜色"
        placeholder="选择颜色"
        key={form.key('color')}
        {...form.getInputProps('color')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoColorInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      color: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <ColorInput
        label="你最喜欢的颜色"
        placeholder="选择颜色"
        key={form.key('color')}
        {...form.getInputProps('color')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const colorInput: UIDemo = {
  type: 'code',
  component: DemoColorInput,
  code: codeColorInput,
};

const codeColorPicker = `
import { ColorPicker, Text, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      color: '#000000',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>选择颜色</Text>
      <ColorPicker
        format="hex"
        key={form.key('color')}
        {...form.getInputProps('color')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoColorPicker() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      color: '#000000',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>
        Pick color
      </Text>
      <ColorPicker format="hex" key={form.key('color')} {...form.getInputProps('color')} />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const colorPicker: UIDemo = {
  type: 'code',
  component: DemoColorPicker,
  code: codeColorPicker,
};

const codeFieldset = `
import { Fieldset, TextInput, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Fieldset legend="Personal information">
        <TextInput
          label="姓名"
          placeholder="你的姓名"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="邮箱"
          placeholder="你的邮箱"
          mt="md"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
      </Fieldset>

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoFieldset() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Fieldset legend="Personal information">
        <TextInput
          label="姓名"
          placeholder="你的姓名"
          key={form.key('name')}
          {...form.getInputProps('name')}
        />
        <TextInput
          label="邮箱"
          placeholder="你的邮箱"
          mt="md"
          key={form.key('email')}
          {...form.getInputProps('email')}
        />
      </Fieldset>

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const fieldset: UIDemo = {
  type: 'code',
  component: DemoFieldset,
  code: codeFieldset,
};

const codeFileInput = `
import { FileInput, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      avatar: null,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <FileInput
        label="头像"
        placeholder="上传头像"
        key={form.key('avatar')}
        {...form.getInputProps('avatar')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoFileInput() {
  const form = useForm<{ avatar: File | null }>({
    mode: 'uncontrolled',
    initialValues: {
      avatar: null,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <FileInput
        label="头像"
        placeholder="上传头像"
        key={form.key('avatar')}
        {...form.getInputProps('avatar')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const fileInput: UIDemo = {
  type: 'code',
  component: DemoFileInput,
  code: codeFileInput,
};

const codeInput = `
import { Input, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      phone: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Input.Wrapper label="电话" withAsterisk>
        <Input
          component="input"
          placeholder="你的电话"
          key={form.key('phone')}
          {...form.getInputProps('phone')}
        />
      </Input.Wrapper>

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      phone: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Input.Wrapper label="电话" withAsterisk>
        <Input
          component="input"
          placeholder="你的电话"
          key={form.key('phone')}
          {...form.getInputProps('phone')}
        />
      </Input.Wrapper>

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const input: UIDemo = {
  type: 'code',
  component: DemoInput,
  code: codeInput,
};

const codeJsonInput = `
import { JsonInput, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      packageJson: '{"name": "react-ui"}',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <JsonInput
        label="package.json"
        placeholder="package.json"
        formatOnBlur
        minRows={4}
        key={form.key('packageJson')}
        {...form.getInputProps('packageJson')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoJsonInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      packageJson: '{"name": "react-ui"}',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <JsonInput
        label="package.json"
        placeholder="package.json"
        formatOnBlur
        minRows={4}
        key={form.key('packageJson')}
        {...form.getInputProps('packageJson')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const jsonInput: UIDemo = {
  type: 'code',
  component: DemoJsonInput,
  code: codeJsonInput,
};

const codeNativeSelect = `
import { NativeSelect, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      framewrok: 'react',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <NativeSelect
        label="选择框架"
        data={['React', 'Angular', 'Svelte', 'Vue']}
        key={form.key('framewrok')}
        {...form.getInputProps('framewrok')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoNativeSelect() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      framewrok: 'react',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <NativeSelect
        label="选择框架"
        data={['React', 'Angular', 'Svelte', 'Vue']}
        key={form.key('framewrok')}
        {...form.getInputProps('framewrok')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const nativeSelect: UIDemo = {
  type: 'code',
  component: DemoNativeSelect,
  code: codeNativeSelect,
};

const codeNumberInput = `
import { NumberInput, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      age: 18,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <NumberInput
        label="你的年龄"
        placeholder="你的年龄"
        min={0}
        max={120}
        key={form.key('age')}
        {...form.getInputProps('age')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoNumberInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      age: 18,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <NumberInput
        label="你的年龄"
        placeholder="你的年龄"
        min={0}
        max={120}
        key={form.key('age')}
        {...form.getInputProps('age')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const numberInput: UIDemo = {
  type: 'code',
  component: DemoNumberInput,
  code: codeNumberInput,
};

const codePasswordInput = `
import { PasswordInput, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      password: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <PasswordInput
        label="密码"
        placeholder="你的密码"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoPasswordInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      password: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <PasswordInput
        label="密码"
        placeholder="你的密码"
        key={form.key('password')}
        {...form.getInputProps('password')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const passwordInput: UIDemo = {
  type: 'code',
  component: DemoPasswordInput,
  code: codePasswordInput,
};

const codePinInput = `
import { PinInput, Button, Group, Text } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      pin: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>输入 PIN</Text>
      <PinInput
        key={form.key('pin')}
        {...form.getInputProps('pin')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoPinInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      pin: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>
        Enter PIN
      </Text>
      <PinInput key={form.key('pin')} {...form.getInputProps('pin')} />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const pinInput: UIDemo = {
  type: 'code',
  component: DemoPinInput,
  code: codePinInput,
};

const codeRadioGroup = `
import { Radio, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      framework: 'react',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Radio.Group
        label="选择你最喜欢的框架/库"
        key={form.key('framework')}
        {...form.getInputProps('framework')}
      >
        <Group mt="xs">
          <Radio value="react" label="React" />
          <Radio value="ui" label="ReactUI" />
          <Radio value="ng" label="Angular" />
          <Radio value="svelte" label="Svelte" />
        </Group>
      </Radio.Group>

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoRadioGroup() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      framework: 'react',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Radio.Group
        label="选择你最喜欢的框架/库"
        key={form.key('framework')}
        {...form.getInputProps('framework')}
      >
        <Group mt="xs">
          <Radio value="react" label="React" />
          <Radio value="ui" label="ReactUI" />
          <Radio value="ng" label="Angular" />
          <Radio value="svelte" label="Svelte" />
        </Group>
      </Radio.Group>

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const radioGroup: UIDemo = {
  type: 'code',
  component: DemoRadioGroup,
  code: codeRadioGroup,
};

const codeRangeSlider = `
import { RangeSlider, Button, Group, Text } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      range: [20, 80] as [number, number],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>价格范围</Text>
      <RangeSlider
        key={form.key('range')}
        {...form.getInputProps('range')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoRangeSlider() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      range: [20, 80] as [number, number],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>
        Price range
      </Text>
      <RangeSlider key={form.key('range')} {...form.getInputProps('range')} />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const rangeSlider: UIDemo = {
  type: 'code',
  component: DemoRangeSlider,
  code: codeRangeSlider,
};

const codeRating = `
import { Rating, Button, Group, Text } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      rating: 0,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>评分</Text>
      <Rating
        key={form.key('rating')}
        {...form.getInputProps('rating')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoRating() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      rating: 0,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>
        Rating
      </Text>
      <Rating key={form.key('rating')} {...form.getInputProps('rating')} />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const rating: UIDemo = {
  type: 'code',
  component: DemoRating,
  code: codeRating,
};

const codeSegmentedControl = `
import { SegmentedControl, Button, Group, Text } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      framewrok: 'react',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>选择框架</Text>
      <SegmentedControl
        data={['React', 'Angular', 'Svelte', 'Vue']}
        key={form.key('framewrok')}
        {...form.getInputProps('framewrok')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoSegmentedControl() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      framewrok: 'react',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>
        Select framework
      </Text>
      <SegmentedControl
        data={['React', 'Angular', 'Svelte', 'Vue']}
        key={form.key('framewrok')}
        {...form.getInputProps('framewrok')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const segmentedControl: UIDemo = {
  type: 'code',
  component: DemoSegmentedControl,
  code: codeSegmentedControl,
};

const codeSlider = `
import { Slider, Button, Group, Text } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      value: 40,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>音量</Text>
      <Slider
        key={form.key('value')}
        {...form.getInputProps('value')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoSlider() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      value: 40,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Text size="sm" fw={500} mb={3}>
        Volume
      </Text>
      <Slider key={form.key('value')} {...form.getInputProps('value')} />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const slider: UIDemo = {
  type: 'code',
  component: DemoSlider,
  code: codeSlider,
};

const codeSwitch = `
import { Switch, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      notifications: false,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Switch
        label="启用通知"
        key={form.key('notifications')}
        {...form.getInputProps('notifications', { type: 'checkbox' })}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoSwitch() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      notifications: false,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Switch
        label="启用通知"
        key={form.key('notifications')}
        {...form.getInputProps('notifications', { type: 'checkbox' })}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const switchDemo: UIDemo = {
  type: 'code',
  component: DemoSwitch,
  code: codeSwitch,
};

const codeSwitchGroup = `
import { Switch, Group, Button } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      favFrameworks: [],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Switch.Group
        label="选择你最喜欢的框架/库"
        key={form.key('favFrameworks')}
        {...form.getInputProps('favFrameworks')}
      >
        <Group mt="xs">
          <Switch value="react" label="React" />
          <Switch value="ui" label="ReactUI" />
          <Switch value="ng" label="Angular" />
          <Switch value="svelte" label="Svelte" />
        </Group>
      </Switch.Group>

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoSwitchGroup() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      favFrameworks: [],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Switch.Group
        label="选择你最喜欢的框架/库"
        key={form.key('favFrameworks')}
        {...form.getInputProps('favFrameworks')}
      >
        <Group mt="xs">
          <Switch value="react" label="React" />
          <Switch value="ui" label="ReactUI" />
          <Switch value="ng" label="Angular" />
          <Switch value="svelte" label="Svelte" />
        </Group>
      </Switch.Group>

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const switchGroup: UIDemo = {
  type: 'code',
  component: DemoSwitchGroup,
  code: codeSwitchGroup,
};

const codeTextarea = `
import { Textarea, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      message: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Textarea
        label="你的消息"
        placeholder="你的消息"
        key={form.key('message')}
        {...form.getInputProps('message')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoTextarea() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      message: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Textarea
        label="你的消息"
        placeholder="你的消息"
        key={form.key('message')}
        {...form.getInputProps('message')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const textarea: UIDemo = {
  type: 'code',
  component: DemoTextarea,
  code: codeTextarea,
};

const codeAutocomplete = `
import { Autocomplete, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      framework: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Autocomplete
        label="选择框架"
        placeholder="选择框架"
        data={['React', 'Angular', 'Svelte', 'Vue']}
        key={form.key('framework')}
        {...form.getInputProps('framework')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoAutocomplete() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      framework: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Autocomplete
        label="选择框架"
        placeholder="选择框架"
        data={['React', 'Angular', 'Svelte', 'Vue']}
        key={form.key('framework')}
        {...form.getInputProps('framework')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const autocomplete: UIDemo = {
  type: 'code',
  component: DemoAutocomplete,
  code: codeAutocomplete,
};

const codeMultiSelect = `
import { MultiSelect, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      frameworks: [],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <MultiSelect
        label="选择框架"
        placeholder="选择框架"
        data={['React', 'Angular', 'Svelte', 'Vue']}
        key={form.key('frameworks')}
        {...form.getInputProps('frameworks')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoMultiSelect() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      frameworks: [],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <MultiSelect
        label="选择框架"
        placeholder="选择框架"
        data={['React', 'Angular', 'Svelte', 'Vue']}
        key={form.key('frameworks')}
        {...form.getInputProps('frameworks')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const multiSelect: UIDemo = {
  type: 'code',
  component: DemoMultiSelect,
  code: codeMultiSelect,
};

const codeSelect = `
import { Select, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      framework: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Select
        label="选择框架"
        placeholder="选择框架"
        data={['React', 'Angular', 'Svelte', 'Vue']}
        key={form.key('framework')}
        {...form.getInputProps('framework')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoSelect() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      framework: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <Select
        label="选择框架"
        placeholder="选择框架"
        data={['React', 'Angular', 'Svelte', 'Vue']}
        key={form.key('framework')}
        {...form.getInputProps('framework')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const select: UIDemo = {
  type: 'code',
  component: DemoSelect,
  code: codeSelect,
};

const codeTagsInput = `
import { TagsInput, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      frameworks: [],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TagsInput
        label="按 Enter 提交标签"
        placeholder="输入标签"
        key={form.key('frameworks')}
        {...form.getInputProps('frameworks')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoTagsInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      frameworks: [],
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <TagsInput
        label="按 Enter 提交标签"
        placeholder="输入标签"
        key={form.key('frameworks')}
        {...form.getInputProps('frameworks')}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const tagsInput: UIDemo = {
  type: 'code',
  component: DemoTagsInput,
  code: codeTagsInput,
};

const codeMaskInput = `
import { MaskInput, Button, Group } from '@xiaoye-react/ui';
import { useForm } from '@xiaoye-react/ui';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      phone: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <MaskInput
        mask="(999) 999-9999"
        placeholder="(___) ___-____"
        label="电话"
        key={form.key('phone')}
        defaultValue={form.getValues().phone}
        onChangeRaw={(raw) => form.setFieldValue('phone', raw, { forceUpdate: false })}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}
`;

function DemoMaskInput() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      phone: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log(values))}>
      <MaskInput
        mask="(999) 999-9999"
        placeholder="(___) ___-____"
        label="电话"
        key={form.key('phone')}
        defaultValue={form.getValues().phone}
        onChangeRaw={(raw) => form.setFieldValue('phone', raw, { forceUpdate: false })}
      />

      <Group mt="md">
        <Button type="submit">提交</Button>
      </Group>
    </form>
  );
}

export const maskInput: UIDemo = {
  type: 'code',
  component: DemoMaskInput,
  code: codeMaskInput,
};
