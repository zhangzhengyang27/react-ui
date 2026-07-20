import { JsonInput } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { JsonInput } from '@react-ui/ui';

function Demo() {
  return (
    <JsonInput disabled defaultValue='{ "a": 1, "B": 2 }' label="已禁用" placeholder="已禁用" />
  );
}
`;

function Demo() {
  return (
    <JsonInput disabled defaultValue='{ "a": 1, "B": 2 }' label="已禁用" placeholder="已禁用" />
  );
}

export const disabled: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
  maxWidth: 340,
};
