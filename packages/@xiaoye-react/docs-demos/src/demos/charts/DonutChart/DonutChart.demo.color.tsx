import { DonutChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';

const code = (props: any) => `
import { DonutChart } from '@xiaoye-react/charts';

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
