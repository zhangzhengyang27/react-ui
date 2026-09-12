import { UIDemo } from '@xiaoye-react/demo'
import { LineChart } from '@xiaoye-react/charts'

const code = `
import { LineChart } from '@xiaoye-react/charts';

const data = [
  { time: '00:00', temp: 22, humidity: 61 },
  { time: '06:00', temp: 19, humidity: 68 },
  { time: '12:00', temp: 31, humidity: 44 },
  { time: '18:00', temp: 28, humidity: 52 },
  { time: '24:00', temp: 23, humidity: 60 },
];

function Demo() {
  return (
    <LineChart
      h={260}
      data={data}
      dataKey="time"
      series={[
        { name: 'temp', color: 'orange.6' },
        { name: 'humidity', color: 'cyan.6' },
      ]}
      withDots
      withLegend
    />
  );
}
`

const data = [
    { time: '00:00', temp: 22, humidity: 61 },
    { time: '06:00', temp: 19, humidity: 68 },
    { time: '12:00', temp: 31, humidity: 44 },
    { time: '18:00', temp: 28, humidity: 52 },
    { time: '24:00', temp: 23, humidity: 60 }
]

function Demo() {
    return (
        <LineChart
            h={260}
            data={data}
            dataKey="time"
            series={[
                { name: 'temp', color: 'orange.6' },
                { name: 'humidity', color: 'cyan.6' }
            ]}
            withDots
            withLegend
        />
    )
}

export const line: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
