import { useState } from 'react';
import { Cascader } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { regionOptions } from './_data';

const code = `
import { useState } from 'react';
import { Cascader } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState<string[]>([]);

  return (
    <Cascader
      data={regionOptions}
      mode="multiple"
      value={value}
      onChange={(value) => setValue(Array.isArray(value) ? value : value ? [value] : [])}
      placeholder="可多选叶子节点"
    />
  );
}
`;

function Demo() {
    const [value, setValue] = useState<string[]>([]);

    return (
        <Cascader
            data={regionOptions}
            mode="multiple"
            value={value}
            onChange={(value) => setValue(Array.isArray(value) ? value : value ? [value] : [])}
            placeholder="可多选叶子节点"
        />
    );
}

export const multiple: UIDemo = {
    type: 'code',
    code,
    component: Demo
};
