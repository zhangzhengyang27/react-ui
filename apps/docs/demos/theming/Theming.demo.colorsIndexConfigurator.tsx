import { Button, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = (props: Record<string, any>) => `
import { Button, Text } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <Text c="blue.${props.index}">Text with blue.${props.index} color</Text>
      <Button color="cyan.${props.index}">按钮</Button>
    </>
  );
}
`;

function Wrapper(props: { index: number }) {
  return (
    <>
      <Text c={`blue.${props.index}`}>Text with blue.{props.index} color</Text>
      <Button color={`cyan.${props.index}`} mt="sm">
        Button
      </Button>
    </>
  );
}

export const colorsIndexConfigurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    { type: 'number', prop: 'index', initialValue: 6, libraryValue: '__none__', min: 0, max: 9 },
  ],
};
