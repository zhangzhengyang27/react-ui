import { RingProgress, RingProgressProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Wrapper(props: RingProgressProps) {
  return (
    <RingProgress
      {...props}
      sections={[
        { value: 40, color: 'cyan' },
        { value: 15, color: 'orange' },
        { value: 15, color: 'grape' },
      ]}
    />
  );
}

const code = `
import { RingProgress } from '@xiaoye-react/ui';

function Demo() {
  return (
    <RingProgress
      {{props}}
      sections={[
        { value: 40, color: 'cyan' },
        { value: 15, color: 'orange' },
        { value: 15, color: 'grape' },
      ]}
    />
  )
}
`;

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  centered: true,
  code,
  controls: [
    {
      prop: 'size',
      type: 'number',
      initialValue: 120,
      step: 10,
      min: 60,
      max: 400,
      libraryValue: '__',
    },
    {
      prop: 'thickness',
      type: 'number',
      initialValue: 12,
      step: 1,
      min: 1,
      max: 40,
      libraryValue: '__',
    },
    { prop: 'roundCaps', type: 'boolean', initialValue: true, libraryValue: false },
  ],
};
