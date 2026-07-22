import { Pill, PillsInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { PillsInput, Pill } from '@xiaoye-react/ui';

function Demo() {
  return (
    <PillsInput label="输入项目" loading>
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <PillsInput.Field placeholder="输入值" />
      </Pill.Group>
    </PillsInput>
  );
}
`;

function Demo() {
  return (
    <PillsInput label="输入项目" loading>
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <PillsInput.Field placeholder="输入值" />
      </Pill.Group>
    </PillsInput>
  );
}

export const loading: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
