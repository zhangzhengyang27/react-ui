import { SemiCircleProgress } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { SemiCircleProgress } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <SemiCircleProgress value={30} label="底部" mb="xl" />
      <SemiCircleProgress value={30} label="居中" labelPosition="center" />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <SemiCircleProgress value={30} label="底部" mb="xl" />
      <SemiCircleProgress value={30} label="居中" labelPosition="center" />
    </>
  );
}

export const labelPosition: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
