import { DonutChart } from '@react-ui/charts';
import { UIDemo } from '@react-ui/demo';

const code = (props: any) => `
import { DonutChart } from '@react-ui/charts';

function Demo() {
  return (
    <DonutChart
      data={[
        { name: '美国', value: 400, color: '${props.color}' },
        { name: '其他', value: 200, color: 'gray.6' },
      ]}
    />
  );
}
`;

function Wrapper(props: any) {
  return (
    <DonutChart
      {...props}
      data={[
        { name: '美国', value: 400, color: props.color },
        { name: '其他', value: 200, color: 'gray.6' },
      ]}
    />
  );
}

export const color: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [{ type: 'color', prop: 'color', initialValue: 'blue', libraryValue: '__' }],
};
