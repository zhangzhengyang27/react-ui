import { Pill, PillsInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { inputControls } from '../../shared';

const code = `
import { PillsInput, Pill } from '@xiaoye-react/ui';


function Demo() {
  return (
    <PillsInput
      {{props}}
    >
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <Pill>Svelte</Pill>
        <PillsInput.Field placeholder="输入标签" />
      </Pill.Group>
    </PillsInput>
  );
}
`;

function Wrapper(props: any) {
  return (
    <PillsInput {...props}>
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <Pill>Svelte</Pill>
        <PillsInput.Field placeholder="输入标签" />
      </Pill.Group>
    </PillsInput>
  );
}

export const configurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 440,
  controls: inputControls,
};
