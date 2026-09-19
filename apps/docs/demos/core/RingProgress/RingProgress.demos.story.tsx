import { renderDemo } from '../../render-demo';
import * as demos from './index';

export default { title: 'RingProgress' };

export const Demo_usage = {
  name: '⭐ Demo: usage',
  render: renderDemo(demos.usage),
};

export const Demo_configurator = {
  name: '⭐ Demo: configurator',
  render: renderDemo(demos.configurator),
};

export const Demo_label = {
  name: '⭐ Demo: label',
  render: renderDemo(demos.label),
};

