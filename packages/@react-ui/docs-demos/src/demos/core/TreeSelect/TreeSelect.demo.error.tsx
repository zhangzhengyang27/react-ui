import { TreeSelect } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { data, dataCode } from './data';

const code = `
import { TreeSelect } from '@react-ui/ui';
import { data } from './data';

function Demo() {
  return (
    <>
      <TreeSelect
        label="布尔错误"
        placeholder="布尔错误"
        error
        data={data}
      />
      <TreeSelect
        mt="md"
        label="带错误信息"
        placeholder="带错误信息"
        error="无效值"
        data={data}
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <TreeSelect label="布尔错误" placeholder="布尔错误" error data={data} />
      <TreeSelect
        mt="md"
        label="带错误信息"
        placeholder="带错误信息"
        error="无效值"
        data={data}
      />
    </>
  );
}

export const error: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', language: 'tsx', code },
    { fileName: 'data.ts', language: 'tsx', code: dataCode },
  ],
  maxWidth: 340,
  centered: true,
};
