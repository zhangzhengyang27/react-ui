import type { StepperFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const StepperStylesApi: StylesApiData<StepperFactory> = {
  selectors: {
    root: '根元素',
    step: '步骤控制按钮',
    stepBody: '包含 `stepIcon` 和 `stepText`',
    stepContent: '当前步骤的内容面板，渲染在 `root` 下',
    stepText: '包含 `stepLabel` 和 `stepDescription`',
    stepIcon: 'Step icon 包装器',
    stepLabel: '步骤标签',
    stepDescription: '步骤描述',
    stepSeparator: '步骤图标之间的分隔线',
  },

  vars: {
    root: {
      '--stepper-color': '控制 the active step and separator 的 color',
      '--stepper-radius': 'Controls `border-radius` of the step icon',
      '--stepper-icon-size': 'Controls `width` and `height` of the icons',
      '--stepper-separator-color': '控制 `stepSeparator` 的颜色',
    },
  },

  modifiers: [
    { modifier: 'data-active', selector: 'step', condition: 'Step 为当前步骤' },
    { modifier: 'data-completed', selector: 'step', condition: 'Step 已完成' },
    { modifier: 'data-selectable', selector: 'step', condition: 'Step 可点击切换' },
    { modifier: 'data-last', selector: 'step', condition: '最后一个 Step' },
    { modifier: 'data-orientation', selector: ['root', 'step'], value: '`orientation` 属性的值' },
  ],
};
