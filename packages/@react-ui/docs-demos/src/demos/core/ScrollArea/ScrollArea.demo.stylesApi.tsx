import { Box, ScrollArea } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { Content } from './_content';
import classes from './ScrollArea.demo.stylesApi.module.css';

const code = `
import { ScrollArea, Box } from '@react-ui/ui';
import classes from './Demo.module.css';

function Demo() {
  return (
    <ScrollArea w={300} h={200} type="always" offsetScrollbars classNames={classes}>
      <Box w={600}>
        {/* ... content */}
      </Box>
    </ScrollArea>
  );
}
`;

const cssCode = `
.scrollbar {
  &,
  &:hover {
    background-color: light-dark(var(--ui-color-gray-0), var(--ui-color-dark-6));
  }

  &[data-orientation='vertical'] .thumb {
    background-color: var(--ui-color-red-6);
  }

  &[data-orientation='horizontal'] .thumb {
    background-color: var(--ui-color-blue-6);
  }
}

.corner {
  background-color: light-dark(var(--ui-color-gray-0), var(--ui-color-dark-6));
  opacity: 1;
}
`;

function Demo() {
  return (
    <ScrollArea w={300} h={200} type="always" offsetScrollbars classNames={classes}>
      <Box w={600}>
        <Content />
      </Box>
    </ScrollArea>
  );
}

export const stylesApi: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
};
