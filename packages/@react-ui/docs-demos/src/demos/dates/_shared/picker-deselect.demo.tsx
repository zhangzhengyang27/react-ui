import { useState } from 'react';
import { MantineDemo } from '@react-ui/demo';

const getCode = (name: string) => `
import { useState } from 'react';
import { ${name} } from '@react-ui/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <${name} allowDeselect value={value} onChange={setValue} />;
}
`;

function getDemo(Component: React.FC<any>) {
  return () => {
    const [value, setValue] = useState<string | null>(null);
    return <Component allowDeselect value={value} onChange={setValue} />;
  };
}

export function getPickerDeselectDemo(Component: React.FC<any>): MantineDemo {
  return {
    type: 'code',
    centered: true,
    code: getCode(Component.displayName!.replace('@react-ui/dates/', '')),
    component: getDemo(Component),
  };
}
