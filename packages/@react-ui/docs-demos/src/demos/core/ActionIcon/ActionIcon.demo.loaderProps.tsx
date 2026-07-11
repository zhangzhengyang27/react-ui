import { ActionIcon } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { ActionIcon } from '@react-ui/ui';

function Demo() {
  return <ActionIcon size="xl" loading loaderProps={{ type: 'dots' }} aria-label="Loading..." />;
}
`;

function Demo() {
  return <ActionIcon size="xl" loading aria-label="Loading..." loaderProps={{ type: 'dots' }} />;
}

export const loaderProps: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
