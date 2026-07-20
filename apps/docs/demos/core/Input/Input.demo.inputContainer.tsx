import { useState } from 'react';
import { TextInput, Tooltip } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { TextInput, Tooltip } from '@react-ui/ui';

function Demo() {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      label="带提示的文本输入"
      description="提示将相对于输入框定位"
      placeholder="聚焦我查看提示"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      inputContainer={(children) => (
        <Tooltip label="附加信息" position="top-start" opened={focused}>
          {children}
        </Tooltip>
      )}
    />
  );
}
`;

function Demo() {
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      label="带提示的文本输入"
      description="提示将相对于输入框定位"
      placeholder="聚焦我查看提示"
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      inputContainer={(children) => (
        <Tooltip label="附加信息" position="top-start" opened={focused}>
          {children}
        </Tooltip>
      )}
    />
  );
}

export const inputContainer: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
