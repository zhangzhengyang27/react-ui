import { UIDemo } from '@xiaoye-react/demo'
import { BarChart } from '@xiaoye-react/charts'

const code = `
import { BarChart } from '@xiaoye-react/charts';

const data = [
  { month: '1月', downloads: 1200, uploads: 800 },
  { month: '2月', downloads: 1800, uploads: 950 },
  { month: '3月', downloads: 1450, uploads: 1100 },
  { month: '4月', downloads: 2100, uploads: 1300 },
  { month: '5月', downloads: 1900, uploads: 1500 },
];

function Demo() {
  return (
    <BarChart
      h={260}
      data={data}
      dataKey="month"
      series={[
        { name: 'downloads', color: 'indigo.6' },
        { name: 'uploads', color: 'violet.6' },
      ]}
      withLegend
      unit="次"
    />
  );
}
`

const data = [
    { month: '1月', downloads: 1200, uploads: 800 },
    { month: '2月', downloads: 1800, uploads: 950 },
    { month: '3月', downloads: 1450, uploads: 1100 },
    { month: '4月', downloads: 2100, uploads: 1300 },
    { month: '5月', downloads: 1900, uploads: 1500 }
]

function Demo() {
    return (
        <BarChart
            h={260}
            data={data}
            dataKey="month"
            series={[
                { name: 'downloads', color: 'indigo.6' },
                { name: 'uploads', color: 'violet.6' }
            ]}
            withLegend
            unit="次"
        />
    )
}

export const bar: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
