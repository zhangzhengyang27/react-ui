import { AngleSlider } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { AngleSlider } from '@xiaoye-react/ui';

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
