import { Input } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Input } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Input component="button" pointer>
      <Input.Placeholder>占位内容</Input.Placeholder>
    </Input>
  );
}
`;

function Demo() {
  return (
    <Input component="button" pointer>
      <Input.Placeholder>占位内容</Input.Placeholder>
    </Input>
  );
}

export const placeholder: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  code,
};
