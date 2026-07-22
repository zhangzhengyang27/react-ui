import { useRef } from 'react';
import { Button, Group, ScrollArea, Stack } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { Content } from './_content';

const code = `
import { useRef } from 'react';
import { ScrollArea, Button, Stack, Group } from '@xiaoye-react/ui';

function Demo() {
  const viewport = useRef<HTMLDivElement>(null);

  const scrollToBottom = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'smooth' });

  const scrollToCenter = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight / 2, behavior: 'smooth' });

  const scrollToTop = () => viewport.current!.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Stack align="center">
      <ScrollArea w={300} h={200} viewportRef={viewport}>
        {/* ... content */}
      </ScrollArea>

      <Group justify="center">
        <Button onClick={scrollToBottom}>滚动到底部</Button>
        <Button onClick={scrollToCenter}>滚动到中间</Button>
        <Button onClick={scrollToTop}>滚动到顶部</Button>
      </Group>
    </Stack>
  );
}
`;

function Demo() {
  const viewport = useRef<HTMLDivElement>(null);
  const scrollToBottom = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight, behavior: 'smooth' });
  const scrollToCenter = () =>
    viewport.current!.scrollTo({ top: viewport.current!.scrollHeight / 2, behavior: 'smooth' });
  const scrollToTop = () => viewport.current!.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <Stack align="center">
      <ScrollArea w={300} h={200} viewportRef={viewport}>
        <Content />
      </ScrollArea>
      <Group justify="center">
        <Button onClick={scrollToBottom}>滚动到底部</Button>
        <Button onClick={scrollToCenter}>滚动到中间</Button>
        <Button onClick={scrollToTop}>滚动到顶部</Button>
      </Group>
    </Stack>
  );
}

export const scrollTo: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
