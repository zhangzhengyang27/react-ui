import { Splitter, SplitterProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Wrapper(props: SplitterProps) {
  return (
    <Splitter {...props} h={200}>
      <Splitter.Pane
        bg="blue"
        c="white"
        fw={500}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        First pane
      </Splitter.Pane>
      <Splitter.Pane
        bg="teal"
        c="white"
        fw={500}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        Second pane
      </Splitter.Pane>
    </Splitter>
  );
}

const code = `
import { Splitter } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Splitter{{props}} h={200}>
      <Splitter.Pane bg="blue">
        First pane
      </Splitter.Pane>
      <Splitter.Pane bg="teal">
        Second pane
      </Splitter.Pane>
    </Splitter>
  );
}`;

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: '100%',
  controls: [
    {
      prop: 'orientation',
      type: 'segmented',
      initialValue: 'horizontal',
      libraryValue: 'horizontal',
      data: [
        { value: 'horizontal', label: '水平' },
        { value: 'vertical', label: '垂直' },
      ],
    },
  ],
};
