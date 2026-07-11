import { TreeSelect } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { data, dataCode } from './data';

const code = `
import { TreeSelect } from '@react-ui/ui';
import { data } from './data';

function Demo() {
  return (
    <TreeSelect
      label="Select items"
      placeholder="Pick values"
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
      label="Select items"
      placeholder="Pick values"
      data={data}
      mode="checkbox"
      checkStrictly
      defaultExpandAll
    />
  );
}

export const checkStrictly: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', language: 'tsx', code },
    { fileName: 'data.ts', language: 'tsx', code: dataCode },
  ],
  maxWidth: 340,
  centered: true,
};
