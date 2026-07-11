import { FunnelChart } from '@react-ui/charts';
import { MantineDemo } from '@react-ui/demo';

const code = (props: any) => `
import { FunnelChart } from '@react-ui/charts';

function Demo() {
  return (
    <FunnelChart
      data={[
        { name: 'USA', value: 400, color: '${props.color}' },
        { name: 'Other', value: 200, color: 'gray.6' },
      ]}
    />
  );
}
`;

function Wrapper(props: any) {
  return (
    <FunnelChart
      {...props}
      data={[
        { name: 'USA', value: 400, color: props.color },
        { name: 'Other', value: 200, color: 'gray.6' },
      ]}
    />
  );
}

export const color: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [{ type: 'color', prop: 'color', initialValue: 'blue', libraryValue: '__' }],
};
