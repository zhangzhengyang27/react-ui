import { TreeSelect } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { data, dataCode } from './data';

const code = `
import { TreeSelect } from '@react-ui/ui';
import { data } from './data';

function Demo() {
  return (
    <TreeSelect
      label="无连接线"
      placeholder="选择值"
      data={data}
      defaultExpandAll
      withLines={false}
    />
  );
}
`;

function Demo() {
  return (
    <TreeSelect
      label="无连接线"
      placeholder="选择值"
      data={data}
      defaultExpandAll
      withLines={false}
    />
  );
}

export const withLines: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: 'data.ts', language: 'tsx', code: dataCode },
  ],
  maxWidth: 340,
  centered: true,
};
