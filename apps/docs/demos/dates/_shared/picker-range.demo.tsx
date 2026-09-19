import { useState } from 'react';
import { componentName } from './component-name';

import { UIDemo } from '@xiaoye-react/demo';

const getCode = (name: string) => `
import { useState } from 'react';
import { ${name} } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<[string | null, string | null]>([null, null]);
  return <${name} type="range" value={value} onChange={setValue} />;
}
`;

function getDemo(Component: React.FC<any>) {
  return () => {
    const [value, setValue] = useState<[string | null, string | null]>([null, null]);
    return <Component type="range" value={value} onChange={setValue} />;
  };
}

export function getPickerRangeDemo(Component: React.FC<any>): UIDemo {
  return {
    type: 'code',
    centered: true,
    code: getCode(componentName(Component)),
    component: getDemo(Component),
  };
}
