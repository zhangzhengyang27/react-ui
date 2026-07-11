import { Splitter } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

function Demo() {
  return (
    <Splitter h={200}>
      <Splitter.Pane
        defaultSize="240px"
        min="160px"
        max="50%"
        bg="blue"
        c="white"
        fw={500}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        Fixed 240px sidebar
      </Splitter.Pane>
      <Splitter.Pane
        defaultSize={100}
        bg="teal"
        c="white"
        fw={500}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        Flexible content
      </Splitter.Pane>
    </Splitter>
  );
}

const code = `
import { Splitter } from '@react-ui/ui';

function Demo() {
  return (
    <Splitter h={200}>
      <Splitter.Pane defaultSize="240px" min="160px" max="50%" bg="blue">
        Fixed 240px sidebar
      </Splitter.Pane>
      <Splitter.Pane defaultSize={100} bg="teal">
        Flexible content
      </Splitter.Pane>
    </Splitter>
  );
}`;

export const cssUnits: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: '100%',
};
