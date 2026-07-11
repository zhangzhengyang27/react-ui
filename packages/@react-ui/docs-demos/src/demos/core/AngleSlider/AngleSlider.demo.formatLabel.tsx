import { AngleSlider } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { AngleSlider } from '@react-ui/ui';

function Demo() {
  return <AngleSlider aria-label="Angle slider" formatLabel={(value) => \`\${value}°\`} />;
}
`;

function Demo() {
  return <AngleSlider aria-label="Angle slider" formatLabel={(value) => `${value}°`} />;
}

export const formatLabel: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
