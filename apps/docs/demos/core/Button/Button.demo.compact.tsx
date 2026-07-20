import { Button, Group } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = (props: any) => `
import { Button, Group } from '@react-ui/ui';

function Demo() {
  return (
    <Group justify="center">
      <Button size="${props.size}">常规 ${props.size}</Button>
      <Button size="compact-${props.size}">紧凑 ${props.size}</Button>
    </Group>
  );
}
`;

function Wrapper(props: any) {
  return (
    <Group justify="center">
      <Button size={props.size}>常规 {props.size}</Button>
      <Button size={`compact-${props.size}`}>紧凑 {props.size}</Button>
    </Group>
  );
}

export const compact: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  title: '紧凑尺寸',
  description: 'compact-* 尺寸让按钮在垂直方向上更紧凑。',
  centered: true,
  controls: [{ type: 'size', prop: 'size', initialValue: 'md', libraryValue: '__none__' }],
};
