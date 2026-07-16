import { Divider } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Divider } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <Divider my="sm" />
      <Divider my="sm" variant="dashed" />
      <Divider my="sm" variant="dotted" />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Divider my="sm" />
      <Divider my="sm" variant="dashed" />
      <Divider my="sm" variant="dotted" />
    </>
  );
}

export const variants: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
