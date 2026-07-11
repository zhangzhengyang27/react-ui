import { ArrowLeftIcon } from '@phosphor-icons/react';
import { Anchor, Box, Center } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Center, Anchor, Box } from '@react-ui/ui';
import { ArrowLeftIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Anchor href="https://mantine.dev" target="_blank">
      <Center inline>
        <ArrowLeftIcon size={12} />
        <Box ml={5}>Back to ReactUI website</Box>
      </Center>
    </Anchor>
  );
}
`;

function Demo() {
  return (
    <Anchor href="https://mantine.dev" target="_blank">
      <Center inline>
        <ArrowLeftIcon size={12} className="mantine-rotate-rtl" />
        <Box ml={5}>Back to ReactUI website</Box>
      </Center>
    </Anchor>
  );
}

export const inline: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
