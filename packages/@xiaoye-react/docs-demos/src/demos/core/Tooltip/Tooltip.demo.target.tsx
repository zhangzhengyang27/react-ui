import { Button, Tooltip } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Button, Tooltip } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <Tooltip target="#hover-me" label="按钮上的提示" />
      <Button id="hover-me">悬停我查看提示</Button>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Tooltip target="#hover-me" label="按钮上的提示" />
      <Button id="hover-me">悬停我查看提示</Button>
    </>
  );
}

export const target: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
