import { Splitter } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Demo() {
  return (
    <Splitter h={350}>
      <Splitter.Pane
        bg="blue"
        c="white"
        fw={500}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        Sidebar
      </Splitter.Pane>
      <Splitter.Pane>
        <Splitter orientation="vertical" h="100%">
          <Splitter.Pane
            bg="teal"
            c="white"
            fw={500}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Editor
          </Splitter.Pane>
          <Splitter.Pane
            bg="grape"
            c="white"
            fw={500}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            Terminal
          </Splitter.Pane>
        </Splitter>
      </Splitter.Pane>
    </Splitter>
  );
}

const code = `
import { Splitter } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Splitter h={350}>
      <Splitter.Pane bg="blue">
        Sidebar
      </Splitter.Pane>
      <Splitter.Pane>
        <Splitter orientation="vertical" h="100%">
          <Splitter.Pane bg="teal">
            Editor
          </Splitter.Pane>
          <Splitter.Pane bg="grape">
            Terminal
          </Splitter.Pane>
        </Splitter>
      </Splitter.Pane>
    </Splitter>
  );
}`;

export const nested: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: '100%',
};
