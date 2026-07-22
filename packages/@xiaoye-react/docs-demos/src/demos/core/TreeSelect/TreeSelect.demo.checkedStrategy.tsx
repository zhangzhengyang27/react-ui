import { useState } from 'react';
import { Stack, TreeSelect } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './data';

const code = `
import { useState } from 'react';
import { Stack, TreeSelect } from '@xiaoye-react/ui';
import { data } from './data';

function Demo() {
  const [childValue, setChildValue] = useState<string[]>([]);
  const [allValue, setAllValue] = useState<string[]>([]);
  const [parentValue, setParentValue] = useState<string[]>([]);

  return (
    <Stack>
      <TreeSelect
        label="checkedStrategy：child（默认）"
        placeholder="选择值"
        data={data}
        mode="checkbox"
        checkedStrategy="child"
        defaultExpandAll
        value={childValue}
        onChange={setChildValue}
      />
      <TreeSelect
        label="checkedStrategy：all"
        placeholder="选择值"
        data={data}
        mode="checkbox"
        checkedStrategy="all"
        defaultExpandAll
        value={allValue}
        onChange={setAllValue}
      />
      <TreeSelect
        label="checkedStrategy：parent"
        placeholder="选择值"
        data={data}
        mode="checkbox"
        checkedStrategy="parent"
        defaultExpandAll
        value={parentValue}
        onChange={setParentValue}
      />
    </Stack>
  );
}
`;

function Demo() {
  const [childValue, setChildValue] = useState<string[]>([]);
  const [allValue, setAllValue] = useState<string[]>([]);
  const [parentValue, setParentValue] = useState<string[]>([]);

  return (
    <Stack>
      <TreeSelect
        label="checkedStrategy：child（默认）"
        placeholder="选择值"
        data={data}
        mode="checkbox"
        checkedStrategy="child"
        defaultExpandAll
        value={childValue}
        onChange={setChildValue}
      />
      <TreeSelect
        label="checkedStrategy：all"
        placeholder="选择值"
        data={data}
        mode="checkbox"
        checkedStrategy="all"
        defaultExpandAll
        value={allValue}
        onChange={setAllValue}
      />
      <TreeSelect
        label="checkedStrategy：parent"
        placeholder="选择值"
        data={data}
        mode="checkbox"
        checkedStrategy="parent"
        defaultExpandAll
        value={parentValue}
        onChange={setParentValue}
      />
    </Stack>
  );
}

export const checkedStrategy: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: 'data.ts', language: 'tsx', code: dataCode },
  ],
  maxWidth: 340,
  centered: true,
  defaultExpanded: false,
};
