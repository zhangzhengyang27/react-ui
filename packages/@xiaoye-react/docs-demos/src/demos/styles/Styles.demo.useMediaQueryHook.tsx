import { Button, em, Tooltip } from '@xiaoye-react/ui';
import { useMediaQuery } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Tooltip, Button, em } from '@xiaoye-react/ui';
import { useMediaQuery } from '@xiaoye-react/hooks';

function Demo() {
  const isMobile = useMediaQuery(\`(max-width: \${em(750)})\`);

  return (
    <Tooltip label={isMobile ? '移动端' : '桌面端'}>
      <Button>悬停我</Button>
    </Tooltip>
  );
}
`;

function Demo() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <Tooltip label={isMobile ? '移动端' : '桌面端'}>
      <Button>悬停我</Button>
    </Tooltip>
  );
}

export const useMediaQueryHook: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
