import { NativeSelect } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NativeSelect } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <NativeSelect error label="布尔错误" data={['React', 'Angular']} />
      <NativeSelect
        error="错误信息"
        label="React 节点错误"
        data={['React', 'Angular']}
        mt="md"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <NativeSelect error label="布尔错误" data={['React', 'Angular']} />
      <NativeSelect
        error="错误信息"
        label="React 节点错误"
        data={['React', 'Angular']}
        mt="md"
      />
    </>
  );
}

export const error: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
