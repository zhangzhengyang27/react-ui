import { ActionIcon } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { ActionIcon } from '@xiaoye-react/ui';

function Demo() {
  return <ActionIcon size="xl" loading loaderProps={{ type: 'dots' }} aria-label="加载中..." />;
}
`;

function Demo() {
  return <ActionIcon size="xl" loading aria-label="加载中..." loaderProps={{ type: 'dots' }} />;
}

export const loaderProps: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
