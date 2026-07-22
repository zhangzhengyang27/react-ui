import { InputBase } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { InputBase } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <InputBase label="你的电话" component="input" placeholder="你的电话" />

      <InputBase label="自定义原生选择" component="select" mt="md">
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
      <InputBase label="你的电话" component="input" placeholder="你的电话" />

      <InputBase label="自定义原生选择" component="select" mt="md">
        <option value="react">React</option>
        <option value="react">Angular</option>
        <option value="svelte">Svelte</option>
      </InputBase>
    </>
  );
}

export const inputBase: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
