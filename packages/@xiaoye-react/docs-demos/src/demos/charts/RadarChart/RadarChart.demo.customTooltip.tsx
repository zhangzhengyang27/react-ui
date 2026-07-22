import { RadarChart } from '@xiaoye-react/charts';
import { Paper, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { multiData, multiDataCode } from './_data';

const code = `
import { RadarChart } from '@xiaoye-react/charts';
import { data } from './data';

interface ChartTooltipProps {
  label: React.ReactNode;
  payload: readonly Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md">
      <Text fw={500} mb={5}>
        {label}
      </Text>
      {payload.map((item: any) => (
        <Text key={item.name} c={item.color} fz="sm">
          {item.name}: {item.value}
        </Text>
      ))}
    </Paper>
  );
}

function Demo() {
  return (
    <RadarChart
      h={300}
      data={data}
      dataKey="product"
      withPolarRadiusAxis
      withTooltip
      withDots
      tooltipProps={{
        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
      }}
      series={[
        { name: 'Sales January', color: 'lime.4', opacity: 0.1 },
        { name: 'Sales February', color: 'cyan.4', opacity: 0.1 },
      ]}
    />
  );
}
`;

interface ChartTooltipProps {
  label: React.ReactNode;
  payload: readonly Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) {
    return null;
  }

  return (
    <Paper px="md" py="sm" withBorder shadow="md">
      <Text fw={500} mb={5}>
        {label}
      </Text>
      {payload.map((item: any) => (
        <Text key={item.name} c={item.color} fz="sm">
          {item.name}: {item.value}
        </Text>
      ))}
    </Paper>
  );
}

function Demo() {
  return (
    <RadarChart
      h={300}
      data={multiData}
      dataKey="product"
      withPolarRadiusAxis
      withDots
      withTooltip
      tooltipProps={{
        content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
      }}
      series={[
        { name: 'Sales January', color: 'lime.4', opacity: 0.1 },
        { name: 'Sales February', color: 'cyan.4', opacity: 0.1 },
      ]}
    />
  );
}

export const customTooltip: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: multiDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
