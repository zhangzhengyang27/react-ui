import { BarChart } from '@xiaoye-react/charts';
import { UIDemo } from '@xiaoye-react/demo';
import { mixedStackData, mixedStackDataCode } from './_data';

const code = `
import { BarChart } from '@xiaoye-react/charts';
import { data } from './data';

function Demo() {
  return (
    <BarChart
      h={300}
      data={mixedStackData}
      dataKey="month"
      series={[
        { name: 'Smartphones', color: 'url(#crosshatch)', stackId: 'a' },
        { name: 'Laptops', color: 'blue.6', stackId: 'b' },
        { name: 'Tablets', color: 'url(#diagonalStripes)', stackId: 'b' },
      ]}
    >
      <defs>
        <pattern
          id="diagonalStripes"
          patternUnits="userSpaceOnUse"
          width={6}
          height={8}
          patternTransform="rotate(45)"
        >
          <rect
            width="2"
            height="8"
            transform="translate(0,0)"
            fill="color-mix(in lch, var(--ui-color-teal-6) 70%, rgba(0,0,0,0))"
          />
        </pattern>

        <pattern id="crosshatch" patternUnits="userSpaceOnUse" width={8} height={8}>
          <path
            d="M 0 0 L 8 0 L 8 8 L 0 8 Z"
            fill="none"
            stroke="color-mix(in lch, var(--ui-color-indigo-6) 70%, rgba(0,0,0,0))"
            strokeWidth="1"
          />
          <path
            d="M 0 0 L 8 8"
            stroke="color-mix(in lch, var(--ui-color-indigo-6) 70%, rgba(0,0,0,0))"
            strokeWidth="1"
          />
          <path
            d="M 8 0 L 0 8"
            stroke="color-mix(in lch, var(--ui-color-indigo-6) 70%, rgba(0,0,0,0))"
            strokeWidth="1"
          />
        </pattern>
      </defs>
    </BarChart>
  );
}
`;

function Demo() {
  return (
    <BarChart
      h={300}
      data={mixedStackData}
      dataKey="month"
      series={[
        { name: 'Smartphones', color: 'url(#crosshatch)', stackId: 'a' },
        { name: 'Laptops', color: 'blue.6', stackId: 'b' },
        { name: 'Tablets', color: 'url(#diagonalStripes)', stackId: 'b' },
      ]}
    >
      <defs>
        <pattern
          id="diagonalStripes"
          patternUnits="userSpaceOnUse"
          width={6}
          height={8}
          patternTransform="rotate(45)"
        >
          <rect
            width="2"
            height="8"
            transform="translate(0,0)"
            fill="color-mix(in lch, var(--ui-color-teal-6) 70%, rgba(0,0,0,0))"
          />
        </pattern>

        <pattern id="crosshatch" patternUnits="userSpaceOnUse" width={8} height={8}>
          <path
            d="M 0 0 L 8 0 L 8 8 L 0 8 Z"
            fill="none"
            stroke="color-mix(in lch, var(--ui-color-indigo-6) 70%, rgba(0,0,0,0))"
            strokeWidth="1"
          />
          <path
            d="M 0 0 L 8 8"
            stroke="color-mix(in lch, var(--ui-color-indigo-6) 70%, rgba(0,0,0,0))"
            strokeWidth="1"
          />
          <path
            d="M 8 0 L 0 8"
            stroke="color-mix(in lch, var(--ui-color-indigo-6) 70%, rgba(0,0,0,0))"
            strokeWidth="1"
          />
        </pattern>
      </defs>
    </BarChart>
  );
}

export const stripes: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { code, language: 'tsx', fileName: '演示代码.tsx' },
    { code: mixedStackDataCode, language: 'tsx', fileName: 'data.ts' },
  ],
};
