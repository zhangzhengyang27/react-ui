import { UIDemo } from '@xiaoye-react/demo'
import { AreaChart } from '@xiaoye-react/charts'

const code = `
import { AreaChart } from '@xiaoye-react/charts';

const data = [
  { date: '3月1日', pageviews: 320, sessions: 180 },
  { date: '3月2日', pageviews: 480, sessions: 260 },
  { date: '3月3日', pageviews: 410, sessions: 230 },
  { date: '3月4日', pageviews: 620, sessions: 340 },
  { date: '3月5日', pageviews: 560, sessions: 310 },
  { date: '3月6日', pageviews: 720, sessions: 400 },
];

function Demo() {
  return (
    <AreaChart
      h={280}
      data={data}
      dataKey="date"
      series={[
        { name: 'pageviews', color: 'indigo.6' },
        { name: 'sessions', color: 'teal.6' },
      ]}
      withLegend
      unit="次"
    />
  );
}
`

function Demo() {
    return (
        <AreaChart
            h={280}
            data={[
                { date: '3月1日', pageviews: 320, sessions: 180 },
                { date: '3月2日', pageviews: 480, sessions: 260 },
                { date: '3月3日', pageviews: 410, sessions: 230 },
                { date: '3月4日', pageviews: 620, sessions: 340 },
                { date: '3月5日', pageviews: 560, sessions: 310 },
                { date: '3月6日', pageviews: 720, sessions: 400 }
            ]}
            dataKey="date"
            series={[
                { name: 'pageviews', color: 'indigo.6' },
                { name: 'sessions', color: 'teal.6' }
            ]}
            withLegend
            unit="次"
        />
    )
}

export const usage: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
