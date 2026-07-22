import { TreeSelect } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { data, dataCode } from './data';

const code = `
import { TreeSelect } from '@xiaoye-react/ui';
import { data } from './data';

function Demo() {
  return (
    <TreeSelect
      label="你最喜欢的项目"
      placeholder="选择值"
      data={data}
      searchable
    />
  );
}
`;

function Demo() {
  return <TreeSelect label="你最喜欢的项目" placeholder="选择值" data={data} searchable />;
}

export const searchable: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: 'data.ts', language: 'tsx', code: dataCode },
  ],
  maxWidth: 340,
  centered: true,
};
