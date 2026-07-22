import { BarChart } from '@xiaoye-react/charts';
import { Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './_data';

const code = `
import { Text } from '@xiaoye-react/ui';
import { BarChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <>
      <Text mb="md" pl="md">
        Smartphones sales:
      </Text>

      <BarChart
        h={180}
        data={data}
        dataKey="month"
        series={[{ name: 'Smartphones', color: 'violet.6' }]}
        barChartProps={{ syncId: 'tech' }}
      />

      <Text mb="md" pl="md" mt="xl">
        Laptops sales:
      </Text>

      <BarChart
        h={180}
        data={data}
        dataKey="month"
        barChartProps={{ syncId: 'tech' }}
        series={[{ name: 'Laptops', color: 'teal.6' }]}
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Text mb="md" pl="md">
        Smartphones sales:
      </Text>

      <BarChart
        h={180}
        data={data}
        dataKey="month"
        series={[{ name: 'Smartphones', color: 'violet.6' }]}
        barChartProps={{ syncId: 'tech' }}
      />

      <Text mb="md" pl="md" mt="xl">
        Laptops sales:
      </Text>

      <BarChart
        h={180}
        data={data}
        dataKey="month"
        barChartProps={{ syncId: 'tech' }}
        series={[{ name: 'Laptops', color: 'teal.6' }]}
      />
    </>
  );
}

export const sync: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: dataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
