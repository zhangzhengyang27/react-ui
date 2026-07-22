import { Slider, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Slider, Text } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <Text size="sm">无标签</Text>
      <Slider defaultValue={40} label={null} />

      <Text size="sm" mt="xl">格式化标签</Text>
      <Slider defaultValue={40} label={(value) => \`\${value} °C\`} />

      <Text size="sm" mt="xl">标签始终可见</Text>
      <Slider defaultValue={40} labelAlwaysOn />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Text size="sm">无标签</Text>
      <Slider defaultValue={40} label={null} />

      <Text size="sm" mt="xl">
        格式化标签
      </Text>
      <Slider defaultValue={40} label={(value) => `${value} °C`} />

      <Text size="sm" mt="xl">
        标签始终可见
      </Text>
      <Slider defaultValue={40} labelAlwaysOn />
    </>
  );
}

export const label: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
};
