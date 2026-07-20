import { NativeSelect } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NativeSelect } from '@react-ui/ui';

function Demo() {
  return (
    <NativeSelect label="带分隔线">
      <option>选择库</option>

      <hr />

      <optgroup label="前端库">
        <option value="react">React</option>
        <option value="angular">Angular</option>
        <option value="vue">Vue</option>
      </optgroup>

      <hr />

      <optgroup label="后端库">
        <option value="express">Express</option>
        <option value="koa">Koa</option>
        <option value="django">Django</option>
      </optgroup>
    </NativeSelect>
  );
}
`;

function Demo() {
  return (
    <NativeSelect label="带分隔线">
      <option>选择库</option>

      <hr />

      <optgroup label="前端库">
        <option value="react">React</option>
        <option value="angular">Angular</option>
        <option value="vue">Vue</option>
      </optgroup>

      <hr />

      <optgroup label="后端库">
        <option value="express">Express</option>
        <option value="koa">Koa</option>
        <option value="django">Django</option>
      </optgroup>
    </NativeSelect>
  );
}

export const dividers: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
