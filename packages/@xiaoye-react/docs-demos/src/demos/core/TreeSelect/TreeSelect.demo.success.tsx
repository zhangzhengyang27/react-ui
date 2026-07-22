import { TreeSelect } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './data';

const code = `
import { TreeSelect } from '@xiaoye-react/ui';
import { data } from './data';

function Demo() {
  return <TreeSelect label="树形选择" placeholder="树形选择" data={data} success="看起来不错！" />;
}
`;

function Demo() {
  return (
    <TreeSelect label="树形选择" placeholder="树形选择" data={data} success="看起来不错！" />
  );
}

export const success: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: 'data.ts', language: 'tsx', code: dataCode },
  ],
  maxWidth: 340,
  centered: true,
};
