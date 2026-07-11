import { InputBase } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { InputBase } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <InputBase label="Your phone" component="input" placeholder="Your phone" />

      <InputBase label="Custom native select" component="select" mt="md">
        <option value="react">React</option>
        <option value="react">Angular</option>
        <option value="svelte">Svelte</option>
      </InputBase>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <InputBase label="Your phone" component="input" placeholder="Your phone" />

      <InputBase label="Custom native select" component="select" mt="md">
        <option value="react">React</option>
        <option value="react">Angular</option>
        <option value="svelte">Svelte</option>
      </InputBase>
    </>
  );
}

export const inputBase: MantineDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
