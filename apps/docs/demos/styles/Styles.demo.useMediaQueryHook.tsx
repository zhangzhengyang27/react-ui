import { Button, em, Tooltip } from '@react-ui/ui';
import { useMediaQuery } from '@react-ui/hooks';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Tooltip, Button, em } from '@react-ui/ui';
import { useMediaQuery } from '@react-ui/hooks';

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
