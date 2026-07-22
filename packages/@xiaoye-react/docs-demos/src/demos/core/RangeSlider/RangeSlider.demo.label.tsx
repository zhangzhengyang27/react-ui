import { RangeSlider, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `import { RangeSlider, Text } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <Text size="sm">无标签</Text>
      <RangeSlider defaultValue={[20, 60]} label={null} />

      <Text size="sm" mt="xl">格式化标签</Text>
      <RangeSlider defaultValue={[20, 60]} label={(value) => \`\${value} °C\`} />

      <Text size="sm" mt="xl">标签始终可见</Text>
      <RangeSlider defaultValue={[20, 60]} labelAlwaysOn />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Text size="sm">无标签</Text>
      <RangeSlider defaultValue={[20, 60]} label={null} />

      <Text size="sm" mt="xl">
        格式化标签
      </Text>
      <RangeSlider defaultValue={[20, 60]} label={(value) => `${value} °C`} />

      <Text size="sm" mt="xl">
        标签始终可见
      </Text>
      <RangeSlider defaultValue={[20, 60]} labelAlwaysOn />
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
