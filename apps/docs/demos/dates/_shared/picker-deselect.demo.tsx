import { useState } from 'react';
import { UIDemo } from '@xiaoye-react/demo';

const getCode = (name: string) => `
import { useState } from 'react';
import { ${name} } from '@xiaoye-react/ui';

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

export function getPickerDeselectDemo(Component: React.FC<any>): UIDemo {
  return {
    type: 'code',
    centered: true,
    code: getCode(Component.displayName!.replace('@xiaoye-react/dates/', '')),
    component: getDemo(Component),
  };
}
