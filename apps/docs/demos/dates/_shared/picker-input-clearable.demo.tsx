import dayjs from 'dayjs';
import { componentName } from './component-name';

import { UIDemo } from '@xiaoye-react/demo';

const getCode = (name: string) => `
import dayjs from 'dayjs';
import { ${name} } from '@xiaoye-react/ui';

function Demo() {
  return (
    <${name}
      clearable
      defaultValue={dayjs('2024-01-15').format('YYYY-MM-DD')}
      label="选择日期"
      placeholder="选择日期"
    />
  );
}
`;

function getDemo(Component: React.FC<any>) {
  return () => (
    <Component
      clearable
      defaultValue={dayjs('2024-01-15').format('YYYY-MM-DD')}
      label="选择日期"
      placeholder="选择日期"
    />
  );
}

export function getPickerInputClearableDemo(Component: React.FC<any>): UIDemo {
  return {
    type: 'code',
    centered: true,
    maxWidth: 400,
    code: getCode(componentName(Component)),
    component: getDemo(Component),
  };
}
