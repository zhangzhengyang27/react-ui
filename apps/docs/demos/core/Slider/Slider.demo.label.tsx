import { Slider, Text } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Slider, Text } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <Text size="sm">无标签</Text>
      <Slider defaultValue={40} label={null} />

      <Text size="sm" mt="xl">格式化标签</Text>
      <Slider defaultValue={40} label={(value) => \`\${value} °C\`} />

      <Text size="sm" mt="xl">标签始终可见</Text>
      <Slider defaultValue={40} labelAlwaysOn />

      <Text size="sm" mt="xl">自定义标签过渡</Text>
      <Slider
        defaultValue={40}
        labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',
        }}
      />
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

      <Text size="sm" mt="xl">
        自定义标签过渡
      </Text>
      <Slider
        defaultValue={40}
        labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',
        }}
      />
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
