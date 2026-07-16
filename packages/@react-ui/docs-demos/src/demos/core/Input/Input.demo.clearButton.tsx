import { useState } from 'react';
import { Input } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = (props: any) => `
import { Input } from '@react-ui/ui';

function Demo(){
  const [value, setValue] = useState('clearable');

  return (
    <Input
      placeholder="可清除输入"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      rightSection={value !== '' ? <Input.ClearButton onClick={() => setValue('')} /> : undefined}
      rightSectionPointerEvents="auto"
      size="${props.size}"
    />
  );
}
`;

function Wrapper(props: any) {
  const [value, setValue] = useState('clearable');

  return (
    <Input
      placeholder="可清除输入"
      value={value}
      onChange={(event) => setValue(event.currentTarget.value)}
      rightSection={value !== '' ? <Input.ClearButton onClick={() => setValue('')} /> : undefined}
      rightSectionPointerEvents="auto"
      {...props}
    />
  );
}

export const clearButton: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  maxWidth: 340,
  centered: true,
  controls: [{ type: 'size', prop: 'size', initialValue: 'sm', libraryValue: '__' }],
};
