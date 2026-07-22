import { useState } from 'react';
import { AtIcon } from '@phosphor-icons/react';
import { Input } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Input } from '@xiaoye-react/ui';
import { AtIcon } from '@phosphor-icons/react';

function Demo() {
  const [value, setValue] = useState('Clear me');
  return (
    <>
      <Input placeholder="你的邮箱" leftSection={<AtIcon size={16} />} />
      <Input
        placeholder="可清除输入"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        mt="md"
        rightSection={
          value ? (
            <Input.ClearButton
              aria-label="清除输入"
              onClick={() => setValue('')}
            />
          ) : null
        }
      />
    </>
  );
}
`;

function Demo() {
  const [value, setValue] = useState('Clear me');
  return (
    <>
      <Input placeholder="你的邮箱" leftSection={<AtIcon size={16} />} />
      <Input
        placeholder="可清除输入"
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        rightSectionPointerEvents="all"
        mt="md"
        rightSection={
          value ? <Input.ClearButton aria-label="清除输入" onClick={() => setValue('')} /> : null
        }
      />
    </>
  );
}

export const sections: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
