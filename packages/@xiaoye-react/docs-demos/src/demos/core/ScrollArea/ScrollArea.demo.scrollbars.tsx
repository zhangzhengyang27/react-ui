import { Box, ScrollArea } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { Content } from './_content';

const code = `
import { ScrollArea, Box } from '@xiaoye-react/ui';

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
