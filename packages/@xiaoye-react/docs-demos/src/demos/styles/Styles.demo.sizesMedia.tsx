import { TextInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TextInput } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <TextInput size="xs" hiddenFrom="sm" label="我的输入" placeholder="我的输入" />
      <TextInput size="xl" visibleFrom="sm" label="我的输入" placeholder="我的输入" />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <TextInput size="xs" hiddenFrom="sm" label="我的输入" placeholder="我的输入" />
      <TextInput size="xl" visibleFrom="sm" label="我的输入" placeholder="我的输入" />
    </>
  );
}

export const sizesMedia: UIDemo = {
  type: 'code',
  component: Demo,
  code: [{ fileName: '演示代码.tsx', code, language: 'tsx' }],
};
