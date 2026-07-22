import { Pill, PillsInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { PillsInput, Pill } from '@xiaoye-react/ui';

function Demo() {
  return (
    <PillsInput label="标签输入">
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

function Demo() {
  return (
    <PillsInput label="标签输入">
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <Pill>Svelte</Pill>
        <PillsInput.Field placeholder="输入标签" />
      </Pill.Group>
    </PillsInput>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 440,
  centered: true,
};
