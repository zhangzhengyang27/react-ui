import { useState } from 'react';
import { MantineDemo } from '@react-ui/demo';

const getCode = (name: string) => `
import { useState } from 'react';
import { ${name} } from '@react-ui/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <${name}
      label="Pick date"
      placeholder="Pick date"
      value={value}
      onChange={setValue}
    />
  );
}
`;

function getDemo(Component: React.FC<any>) {
  return () => {
    const [value, setValue] = useState<string | null>(null);
    return (
      <Component label="Pick date" placeholder="Pick date" value={value} onChange={setValue} />
    );
  };
}

export function getPickerInputUsageDemo(Component: React.FC<any>): MantineDemo {
  return {
    type: 'code',
    centered: true,
    maxWidth: 400,
    code: getCode(Component.displayName!.replace('@react-ui/dates/', '')),
    component: getDemo(Component),
  };
}
