import type { StepperFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const StepperStylesApi: StylesApiData<StepperFactory> = {
  selectors: {
    root: '根元素',
    steps: 'Steps controls 包装器',
    separator: '步骤控制之间的分隔线',
    verticalSeparator: '步骤控制之间的垂直分隔线',
    content: 'Current step content 包装器',
    stepWrapper: '步骤图标和分隔线的包装器',
    step: '步骤控制按钮',
    stepIcon: 'Step icon 包装器',
    stepCompletedIcon: '已完成步骤图标，渲染在 stepIcon 内',
    stepIconContent: '未完成步骤的图标内容包装器，渲染在 stepIcon 内',
    stepBody: '包含 stepLabel 和 stepDescription',
    stepLabel: '步骤标签',
    stepDescription: '步骤描述',
    stepLoader: '步骤加载器',
  },

  vars: {
    root: {
      '--stepper-color': '控制 the active step and separator 的 color',
      '--stepper-icon-color': 'Controls `color` of the step icon',
      '--stepper-icon-size': 'Controls `width` and `height` of the icons',
      '--stepper-content-padding': 'Controls `padding-top` of the content',
      '--stepper-radius': 'Controls `border-radius` of the step icon',
      '--stepper-fz': 'Controls `font-size` of various elements',
      '--stepper-spacing': 'Controls various spacings',
    },
  },

  modifiers: [
    { modifier: 'data-progress', selector: 'stepIcon', condition: 'Step 为当前' },
    { modifier: 'data-completed', selector: 'stepIcon', condition: 'Step 已完成' },
  ],
};
