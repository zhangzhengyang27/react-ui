import { Input } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Input } from '@react-ui/ui';

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
