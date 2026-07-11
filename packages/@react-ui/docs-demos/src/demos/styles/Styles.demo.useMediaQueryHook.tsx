import { Button, em, Tooltip } from '@react-ui/ui';
import { useMediaQuery } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Tooltip, Button, em } from '@react-ui/ui';
import { useMediaQuery } from '@react-ui/hooks';

function Demo() {
  const isMobile = useMediaQuery(\`(max-width: \${em(750)})\`);

  return (
    <Tooltip label={isMobile ? 'Mobile' : 'Desktop'}>
      <Button>Hover me</Button>
    </Tooltip>
  );
}
`;

function Demo() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <Tooltip label={isMobile ? 'Mobile' : 'Desktop'}>
      <Button>Hover me</Button>
    </Tooltip>
  );
}

export const useMediaQueryHook: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
