import { ConfiguratorControlOptions } from '@xiaoye-react/demo';

/**
 * gradientControls 产出的三个合成键：它们不是任何组件的 prop，Wrapper 负责把
 * 它们组装成 gradient={{ from, to, deg }}，所以类型只能在这里给。
 */
export type GradientDemoProps = {
  gradientFrom: string;
  gradientTo: string;
  gradientDegree: number;
};

export const gradientControls: ConfiguratorControlOptions[] = [
  { type: 'color', prop: 'gradientFrom', initialValue: 'blue', libraryValue: '__none__' },
  { type: 'color', prop: 'gradientTo', initialValue: 'cyan', libraryValue: '__none__' },
  {
    type: 'number',
    prop: 'gradientDegree',
    initialValue: 90,
    min: 0,
    max: 360,
    libraryValue: '__none__',
  },
];
