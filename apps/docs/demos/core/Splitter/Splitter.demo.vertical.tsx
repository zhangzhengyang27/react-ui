import { Splitter } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Demo() {
  return (
    <Splitter orientation="vertical" h={300}>
      <Splitter.Pane
        bg="blue"
        c="white"
        fw={500}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        Top pane
      </Splitter.Pane>
      <Splitter.Pane
        bg="teal"
        c="white"
        fw={500}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        Bottom pane
      </Splitter.Pane>
    </Splitter>
  );
}

const code = `
import { Splitter } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Splitter orientation="vertical" h={300}>
      <Splitter.Pane bg="blue">
        Top pane
      </Splitter.Pane>
      <Splitter.Pane bg="teal">
        Bottom pane
      </Splitter.Pane>
    </Splitter>
  );
}`;

export const vertical: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: '100%',
};
