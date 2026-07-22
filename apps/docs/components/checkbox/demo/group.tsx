import React, { useState } from 'react';
import { Checkbox, Stack, Text } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const fruits = [
  { label: '苹果', value: 'apple', description: '一天一苹果，医生远离我' },
  { label: '香蕉', value: 'banana', description: '富含钾元素' },
  { label: '橙子', value: 'orange', description: '富含维生素 C' },
  { label: '葡萄', value: 'grape', description: '可以酿葡萄酒' },
];

const App: React.FC = () => {
  const [value, setValue] = useState<string[]>(['apple', 'banana']);

  return (
    <DemoWrap>
      <Stack gap="sm">
        <Checkbox
          label="全选"
          indeterminate={value.length > 0 && value.length < fruits.length}
          checked={value.length === fruits.length}
          onChange={e =>
            setValue(e.currentTarget.checked ? fruits.map(f => f.value) : [])
          }
        />
        <Checkbox.Group
          value={value}
          onChange={setValue}
          label="选择你喜欢的水果"
          description="至少选一个"
        >
          <Stack gap="xs" mt="xs">
            {fruits.map(f => (
              <Checkbox
                key={f.value}
                value={f.value}
                label={f.label}
                description={f.description}
              />
            ))}
          </Stack>
        </Checkbox.Group>
        <Text size="sm" c="dimmed">
          当前选中：{value.join(', ') || '（空）'}
        </Text>
      </Stack>
    </DemoWrap>
  );
};

export default App;
