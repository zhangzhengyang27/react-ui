import { useState } from 'react';
import { UIDemo } from '@xiaoye-react/demo';

const getCode = (name: string) => `
import { useState } from 'react';
import { ${name} } from '@xiaoye-react/dates';

function Demo() {
  const [value, setValue] = useState<string[]>([]);
  return (
    <${name}
      type="multiple"
      label="选择日期"
      placeholder="选择日期"
      value={value}
      onChange={setValue}
    />
  );
}
`;

function getDemo(Component: React.FC<any>) {
  return () => {
    const [value, setValue] = useState<string[]>([]);
    return (
      <Component
        type="multiple"
        label="选择日期"
        placeholder="选择日期"
        value={value}
        onChange={setValue}
      />
    );
  };
}

export function getPickerInputMultipleDemo(Component: React.FC<any>): UIDemo {
  return {
    type: 'code',
    centered: true,
    maxWidth: 400,
    code: getCode(Component.displayName!.replace('@xiaoye-react/dates/', '')),
    component: getDemo(Component),
  };
}
