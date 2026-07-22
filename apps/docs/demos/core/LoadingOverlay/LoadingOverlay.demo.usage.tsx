import { Box, Button, Group, LoadingOverlay } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';
import { AuthenticationForm } from '../../shared/AuthenticationForm/AuthenticationForm';

const code = `
import { useDisclosure } from '@xiaoye-react/hooks';
import { LoadingOverlay, Button, Group, Box } from '@xiaoye-react/ui';

function Demo() {
  const [visible, { toggle }] = useDisclosure(false);

  // Note that position: relative is required
  return (
    <>
      <Box pos="relative">
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        {/* ...other content */}
      </Box>

      <Group justify="center">
        <Button onClick={toggle}>切换遮罩层</Button>
      </Group>
    </>
  );
}`;

export function Demo() {
  const [visible, { toggle }] = useDisclosure(false);
  return (
    <>
      <Box pos="relative">
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: 'sm', blur: 2 }} />
        <AuthenticationForm noSubmit />
      </Box>

      <Group justify="center" mt="xl">
        <Button onClick={toggle}>切换遮罩层</Button>
      </Group>
    </>
  );
}

export const usage: UIDemo = {
  centered: true,
  maxWidth: 400,
  dimmed: true,
  type: 'code',
  code,
  component: Demo,
};
