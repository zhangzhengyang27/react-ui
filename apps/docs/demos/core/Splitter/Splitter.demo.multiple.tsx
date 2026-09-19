import { Splitter } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const colors = ['blue', 'teal', 'grape'] as const;
const labels = ['First', 'Second', 'Third'];

function Demo() {
  return (
    <Splitter h={200}>
      {labels.map((label, i) => (
        <Splitter.Pane
          key={label}
          bg={colors[i]}
          c="white"
          fw={500}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          {label}
        </Splitter.Pane>
      ))}
    </Splitter>
  );
}

const code = `
import { Splitter } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Splitter h={200}>
      <Splitter.Pane bg="blue">
        First
      </Splitter.Pane>
      <Splitter.Pane bg="teal">
        Second
      </Splitter.Pane>
      <Splitter.Pane bg="grape">
        Third
      </Splitter.Pane>
    </Splitter>
  );
}`;

export const multiple: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: '100%',
};
