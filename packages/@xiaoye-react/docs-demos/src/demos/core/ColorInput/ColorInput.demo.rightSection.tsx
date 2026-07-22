import { useState } from 'react';
import { ArrowClockwiseIcon } from '@phosphor-icons/react';
import { ActionIcon, ColorInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { ArrowClockwiseIcon } from '@phosphor-icons/react';
import { ActionIcon, ColorInput } from '@xiaoye-react/ui';

const randomColor = () => \`#\${Math.floor(Math.random() * 16777215).toString(16)}\`;

function Demo() {
  const [value, onChange] = useState(randomColor());
  return (
    <ColorInput
      placeholder="选择颜色"
      label="你最喜欢的颜色"
      value={value}
      onChange={onChange}
      rightSection={
        <ActionIcon onClick={() => onChange(randomColor())}>
          <ArrowClockwiseIcon size={16} />
        </ActionIcon>
      }
    />
  );
}
`;

const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

function Demo() {
  const [value, onChange] = useState(randomColor());
  return (
    <ColorInput
      maw={320}
      mx="auto"
      placeholder="选择颜色"
      label="你最喜欢的颜色"
      value={value}
      onChange={onChange}
      rightSection={
        <ActionIcon onClick={() => onChange(randomColor())}>
          <ArrowClockwiseIcon size={16} />
        </ActionIcon>
      }
    />
  );
}

export const rightSection: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
