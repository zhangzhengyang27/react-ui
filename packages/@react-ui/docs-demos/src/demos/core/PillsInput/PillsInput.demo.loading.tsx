import { Pill, PillsInput } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { PillsInput, Pill } from '@react-ui/ui';

function Demo() {
  return (
    <PillsInput label="Enter items" loading>
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <PillsInput.Field placeholder="Enter value" />
      </Pill.Group>
    </PillsInput>
  );
}
`;

function Demo() {
  return (
    <PillsInput label="Enter items" loading>
      <Pill.Group>
        <Pill>React</Pill>
        <Pill>Vue</Pill>
        <PillsInput.Field placeholder="Enter value" />
      </Pill.Group>
    </PillsInput>
  );
}

export const loading: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
