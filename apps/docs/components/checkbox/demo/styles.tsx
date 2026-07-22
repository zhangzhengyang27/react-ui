import React from 'react';
import { Checkbox, Stack } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const palette = ['blue', 'grape', 'violet', 'pink', 'red', 'orange', 'green', 'teal', 'cyan'] as const;

const App: React.FC = () => (
  <DemoWrap>
    <Stack gap="md">
      <Checkbox.Group
        defaultValue={['blue', 'green']}
        label="主题色"
      >
        <Stack gap="xs" mt="xs">
          {palette.map(c => (
            <Checkbox key={c} value={c} color={c} label={c} />
          ))}
        </Stack>
      </Checkbox.Group>

      <Checkbox.Group label="尺寸" defaultValue={['sm']}>
        <Stack gap="xs" mt="xs">
          <Checkbox value="xs" size="xs" label="xs" />
          <Checkbox value="sm" size="sm" label="sm（默认）" />
          <Checkbox value="md" size="md" label="md" />
          <Checkbox value="lg" size="lg" label="lg" />
          <Checkbox value="xl" size="xl" label="xl" />
        </Stack>
      </Checkbox.Group>

      <Checkbox.Group label="圆角" defaultValue={['md']}>
        <Stack gap="xs" mt="xs">
          <Checkbox value="xs" radius="xs" label="radius xs" />
          <Checkbox value="md" radius="md" label="radius md" />
          <Checkbox value="lg" radius="lg" label="radius lg" />
          <Checkbox value="xl" radius="xl" label="radius xl" />
        </Stack>
      </Checkbox.Group>

      <Checkbox
        label="错误状态"
        error="请勾选同意条款"
        defaultChecked
      />
    </Stack>
  </DemoWrap>
);

export default App;
