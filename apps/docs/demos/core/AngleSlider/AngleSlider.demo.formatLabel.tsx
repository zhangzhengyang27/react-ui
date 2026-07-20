import { AngleSlider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { AngleSlider } from '@react-ui/ui';

function Demo() {
  return <AngleSlider aria-label="角度滑块" formatLabel={(value) => \`\${value}°\`} />;
}
`;

function Demo() {
  return <AngleSlider aria-label="角度滑块" formatLabel={(value) => `${value}°`} />;
}

export const formatLabel: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
