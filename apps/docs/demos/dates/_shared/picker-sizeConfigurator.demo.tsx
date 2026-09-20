import dayjs from 'dayjs';
import { componentName } from './component-name';

import { UIDemo } from '@xiaoye-react/demo';
import type { UISize } from '@xiaoye-react/ui';

const getCodeTemplate = (component: string) =>
  `import dayjs from 'dayjs';
import { ${component} } from '@xiaoye-react/ui';

function Demo() {
  return <${component} defaultValue={dayjs('2024-01-15').format('YYYY-MM-DD')}{{props}} />;
}
`;

/** 控制项目前只有 size；Component 是参数传入的（DateInput/TimePicker/…），
 *  以 React.FC<any> 收，props 袋本身按真实类型给 */
function getDemo(Component: React.FC<any>) {
  return (props: { size?: UISize }) => <Component defaultValue={dayjs('2024-01-15').format('YYYY-MM-DD')} {...props} />;
}

export function getPickerSizeConfiguratorDemo(Component: React.FC<any>): UIDemo {
  return {
    type: 'configurator',
    centered: true,
    code: getCodeTemplate(componentName(Component)),
    controls: [{ prop: 'size', type: 'size', initialValue: 'sm', libraryValue: 'sm' }],
    component: getDemo(Component),
  };
}
