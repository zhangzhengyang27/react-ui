import { renderDemo } from '../../render-demo';
import * as demos from './index';

export default { title: 'Grid' };

export const Demo_usage = {
  name: '⭐ Demo: usage',
  render: renderDemo(demos.usage),
};

export const Demo_growConfigurator = {
  name: '⭐ Demo: growConfigurator',
  render: renderDemo(demos.growConfigurator),
};

export const Demo_offset = {
  name: '⭐ Demo: offset',
  render: renderDemo(demos.offset),
};

export const Demo_order = {
  name: '⭐ Demo: order',
  render: renderDemo(demos.order),
};

export const Demo_rows = {
  name: '⭐ Demo: rows',
  render: renderDemo(demos.rows),
};

export const Demo_columns = {
  name: '⭐ Demo: columns',
  render: renderDemo(demos.columns),
};

export const Demo_gap = {
  name: '⭐ Demo: gap',
  render: renderDemo(demos.gap),
};

export const Demo_rowColumnGap = {
  name: '⭐ Demo: rowColumnGap',
  render: renderDemo(demos.rowColumnGap),
};
