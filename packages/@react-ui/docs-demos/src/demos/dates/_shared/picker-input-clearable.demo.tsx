import dayjs from 'dayjs';
import { MantineDemo } from '@react-ui/demo';

const getCode = (name: string) => `
import dayjs from 'dayjs';
import { ${name} } from '@react-ui/dates';

function Demo() {
  return (
    <${name}
      clearable
      defaultValue={dayjs().format('YYYY-MM-DD')}
      label="Pick date"
      placeholder="Pick date"
    />
  );
}
`;

function getDemo(Component: React.FC<any>) {
  return () => (
    <Component
      clearable
      defaultValue={dayjs().format('YYYY-MM-DD')}
      label="Pick date"
      placeholder="Pick date"
    />
  );
}

export function getPickerInputClearableDemo(Component: React.FC<any>): MantineDemo {
  return {
    type: 'code',
    centered: true,
    maxWidth: 400,
    code: getCode(Component.displayName!.replace('@react-ui/dates/', '')),
    component: getDemo(Component),
  };
}
