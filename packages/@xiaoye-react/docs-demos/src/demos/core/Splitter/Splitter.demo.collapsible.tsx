import { useRef } from 'react';
import { Button, Group, Splitter } from '@xiaoye-react/ui';
import { UseSplitterReturnValue } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

function Demo() {
  const splitterRef = useRef<UseSplitterReturnValue>(null);

  return (
    <>
      <Splitter splitterRef={splitterRef} h={200}>
        <Splitter.Pane
          defaultSize={30}
          min={20}
          collapsible
          bg="blue"
          c="white"
          fw={500}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          Collapsible sidebar
        </Splitter.Pane>
        <Splitter.Pane
          defaultSize={70}
          min={30}
          bg="teal"
          c="white"
          fw={500}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          Main content
        </Splitter.Pane>
      </Splitter>
      <Group mt="md">
        <Button size="xs" onClick={() => splitterRef.current?.toggleCollapse(0)}>
          Toggle sidebar
        </Button>
      </Group>
    </>
  );
}

const code = `
import { useRef } from 'react';
import { Button, Group, Splitter } from '@xiaoye-react/ui';
import { UseSplitterReturnValue } from '@xiaoye-react/hooks';

function Demo() {
  const splitterRef = useRef<UseSplitterReturnValue>(null);

  return (
    <>
      <Splitter splitterRef={splitterRef} h={200}>
        <Splitter.Pane defaultSize={30} min={20} collapsible bg="blue">
          Collapsible sidebar
        </Splitter.Pane>
        <Splitter.Pane defaultSize={70} min={30} bg="teal">
          Main content
        </Splitter.Pane>
      </Splitter>
      <Group mt="md">
        <Button size="xs" onClick={() => splitterRef.current?.toggleCollapse(0)}>
          Toggle sidebar
        </Button>
      </Group>
    </>
  );
}`;

export const collapsible: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: '100%',
};
