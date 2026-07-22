import { useState } from 'react';
import { HueSlider, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { HueSlider, Text } from '@xiaoye-react/ui';

function Demo() {
  const [value, onChange] = useState(250);

  return (
    <>
      <Text>Hue value: {value}</Text>
      <HueSlider value={value} onChange={onChange} />
    </>
  );
}
`;

function Demo() {
  const [value, onChange] = useState(250);

  return (
    <>
      <Text>Hue value: {value}</Text>
      <HueSlider value={value} onChange={onChange} />
    </>
  );
}

export const hueSlider: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 300,
};
