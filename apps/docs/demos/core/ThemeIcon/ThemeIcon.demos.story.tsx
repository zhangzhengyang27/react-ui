import { renderDemo } from '../../render-demo';
import * as demos from './index';

export default { title: 'ThemeIcon' };

export const Demo_usage = {
  name: '⭐ Demo: usage',
  render: renderDemo(demos.usage),
};

export const Demo_variantColorsResolver = {
  name: '⭐ Demo: variantColorsResolver',
  render: renderDemo(demos.variantColorsResolver),
};

