import { TreeSelect } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './data';

const code = `
import { TreeSelect } from '@xiaoye-react/ui';
import { data } from './data';

function Demo() {
  return (
    <TreeSelect
      label="选择项目"
      placeholder="选择值"
      data={data}
      mode="checkbox"
      checkStrictly
      defaultExpandAll
    />
  );
}
`;

function Demo() {
  return (
    <TreeSelect
      label="选择项目"
      placeholder="选择值"
      data={data}
      mode="checkbox"
      checkStrictly
      defaultExpandAll
    />
  );
}

export const checkStrictly: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: 'data.ts', language: 'tsx', code: dataCode },
  ],
  maxWidth: 340,
  centered: true,
};
