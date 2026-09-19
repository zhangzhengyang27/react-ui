import { renderDemo } from '../../render-demo';
import * as demos from './index';

export default { title: 'Rating' };

export const Demo_configurator = {
  name: '⭐ Demo: configurator',
  render: renderDemo(demos.configurator),
};

export const Demo_readOnly = {
  name: '⭐ Demo: readOnly',
  render: renderDemo(demos.readOnly),
};

export const Demo_fractions = {
  name: '⭐ Demo: fractions',
  render: renderDemo(demos.fractions),
};

export const Demo_clearable = {
  name: '⭐ Demo: clearable',
  render: renderDemo(demos.clearable),
};
