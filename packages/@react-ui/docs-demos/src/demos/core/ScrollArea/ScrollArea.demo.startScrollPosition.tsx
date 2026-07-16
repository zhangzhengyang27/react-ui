import { ScrollArea } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { Content } from './_content';

const code = `
import { ScrollArea } from '@react-ui/ui';

function Demo() {
  return (
    <ScrollArea h={200} startScrollPosition={{ y: 250 }}>
      {/* ... content */}
    </ScrollArea>
  );
}
`;

function Demo() {
  return (
    <ScrollArea h={200} startScrollPosition={{ y: 250 }}>
      <Content />
    </ScrollArea>
  );
}

export const startScrollPosition: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 300,
};
