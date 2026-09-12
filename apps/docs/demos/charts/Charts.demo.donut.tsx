import { UIDemo } from '@xiaoye-react/demo'
import { DonutChart } from '@xiaoye-react/charts'

const code = `
import { DonutChart } from '@xiaoye-react/charts';

const data = [
  { name: 'Chrome', value: 58, color: 'blue.6' },
  { name: 'Safari', value: 22, color: 'teal.6' },
  { name: 'Firefox', value: 12, color: 'orange.6' },
  { name: 'Edge', value: 8, color: 'violet.6' },
];

function Demo() {
  return (
    <DonutChart
      h={260}
      data={data}
      innerRadius={60}
      paddingAngle={2}
      withLegend
      unit="%"
    />
  );
}
`

const data = [
    { name: 'Chrome', value: 58, color: 'blue.6' },
    { name: 'Safari', value: 22, color: 'teal.6' },
    { name: 'Firefox', value: 12, color: 'orange.6' },
    { name: 'Edge', value: 8, color: 'violet.6' }
]

function Demo() {
    return <DonutChart h={260} data={data} innerRadius={60} paddingAngle={2} withLegend unit="%" />
}

export const donut: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
