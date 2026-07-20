import { ArrowLeftIcon } from '@phosphor-icons/react';
import { Anchor, Box, Center } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Center, Anchor, Box } from '@react-ui/ui';
import { ArrowLeftIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <Anchor href="#" target="_blank">
      <Center inline>
        <ArrowLeftIcon size={12} />
        <Box ml={5}>返回 ReactUI 网站</Box>
      </Center>
    </Anchor>
  );
}
`;

function Demo() {
  return (
    <Anchor href="#" target="_blank">
      <Center inline>
        <ArrowLeftIcon size={12} className="ui-rotate-rtl" />
        <Box ml={5}>返回 ReactUI 网站</Box>
      </Center>
    </Anchor>
  );
}

export const inline: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
