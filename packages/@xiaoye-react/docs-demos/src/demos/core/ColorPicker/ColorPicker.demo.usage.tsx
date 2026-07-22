import { useState } from 'react';
import { ColorPicker, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { ColorPicker, Text } from '@xiaoye-react/ui';

function Demo() {
  const [value, onChange] = useState('rgba(47, 119, 150, 0.7)');

  return (
    <>
      <ColorPicker format="rgba" value={value} onChange={onChange} />
      <Text>{value}</Text>
    </>
  );
}
`;

function Demo() {
  const [value, onChange] = useState('rgba(47, 119, 150, 0.7)');

  return (
    <>
      <ColorPicker format="rgba" value={value} onChange={onChange} />
      <Text mt="md">{value}</Text>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
