import dayjs from 'dayjs';
import { UIDemo } from '@xiaoye-react/demo';

const getCodeTemplate = (component: string) =>
  `import dayjs from 'dayjs';
import { ${component} } from '@xiaoye-react/dates';

function Demo() {
  return <${component} defaultValue={dayjs('2024-01-15').format('YYYY-MM-DD')}{{props}} />;
}
`;

function getDemo(Component: React.FC<any>) {
  return (props: any) => <Component defaultValue={dayjs('2024-01-15').format('YYYY-MM-DD')} {...props} />;
}

export function getPickerSizeConfiguratorDemo(Component: React.FC<any>): UIDemo {
  return {
    type: 'configurator',
    centered: true,
    code: getCodeTemplate(Component.displayName!.replace('@xiaoye-react/dates/', '')),
    controls: [{ prop: 'size', type: 'size', initialValue: 'sm', libraryValue: 'sm' }],
    component: getDemo(Component),
  };
}
