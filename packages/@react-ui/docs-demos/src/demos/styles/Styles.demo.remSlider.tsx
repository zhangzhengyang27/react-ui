import { useEffect } from 'react';
import { Slider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Slider } from '@react-ui/ui';

function Demo() {
  return (
    <Slider
      defaultValue={100}
      min={70}
      max={130}
      onChange={(value) => {
        document.documentElement.style.fontSize = \`\${value}%\`;
      }}
    />
  );
}
`;

function Demo() {
  useEffect(
    () => () => {
      document.documentElement.style.fontSize = '100%';
    },
    []
  );

  return (
    <Slider
      defaultValue={100}
      min={70}
      max={130}
      onChange={(value) => {
        document.documentElement.style.fontSize = `${value}%`;
      }}
    />
  );
}

export const remSlider: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
