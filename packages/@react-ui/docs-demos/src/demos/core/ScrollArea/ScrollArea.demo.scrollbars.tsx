import { Box, ScrollArea } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { Content } from './_content';

const code = `
import { ScrollArea, Box } from '@react-ui/ui';

function Demo() {
  return (
    <ScrollArea w={300} h={200} scrollbars="y">
      <Box w={600}>
        {/* ... content */}
      </Box>
    </ScrollArea>
  );
}
`;

function Demo() {
  return (
    <ScrollArea w={300} h={200} scrollbars="y">
      <Box w={600}>
        <Content />
      </Box>
    </ScrollArea>
  );
}

export const scrollbars: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
