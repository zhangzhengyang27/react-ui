import { useState } from 'react';
import { UIDemo } from '@xiaoye-react/demo';

const getCode = (name: string) => `
import { useState } from 'react';
import { ${name} } from '@xiaoye-react/dates';

function Demo() {
  const [value, setValue] = useState<[string | null, string | null]>([null, null]);
  return (
    <${name} type="range" allowSingleDateInRange value={value} onChange={setValue} />
  );
}
`;

function getDemo(Component: React.FC<any>) {
  return () => {
    const [value, setValue] = useState<[string | null, string | null]>([null, null]);
    return <Component type="range" allowSingleDateInRange value={value} onChange={setValue} />;
  };
}

export function getPickerSingleRangeDemo(Component: React.FC<any>): UIDemo {
  return {
    type: 'code',
    centered: true,
    code: getCode(Component.displayName!.replace('@xiaoye-react/dates/', '')),
    component: getDemo(Component),
  };
}
