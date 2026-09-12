import { UIDemo } from '@xiaoye-react/demo'
import { Sparkline } from '@xiaoye-react/charts'

const code = `
import { Sparkline } from '@xiaoye-react/charts';

function Demo() {
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end' }}>
      <div style={{ width: 160, height: 48 }}>
        <Sparkline data={[12, 18, 14, 26, 22, 34, 30, 42]} color="indigo.6" />
      </div>
      <div style={{ width: 160, height: 48 }}>
        <Sparkline
          data={[42, 30, 34, 22, 26, 14, 18, 12]}
          color="teal.6"
          withAreaFill
        />
      </div>
      <div style={{ width: 160, height: 48 }}>
        <Sparkline data={[8, 8, 8, 8]} color="orange.6" curveType="linear" />
      </div>
    </div>
  );
}
`

function Demo() {
    return (
        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ width: 160, height: 48 }}>
                <Sparkline data={[12, 18, 14, 26, 22, 34, 30, 42]} color="indigo.6" />
            </div>
            <div style={{ width: 160, height: 48 }}>
                <Sparkline data={[42, 30, 34, 22, 26, 14, 18, 12]} color="teal.6" withAreaFill />
            </div>
            <div style={{ width: 160, height: 48 }}>
                <Sparkline data={[8, 8, 8, 8]} color="orange.6" curveType="linear" />
            </div>
        </div>
    )
}

export const sparkline: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
