import { NavLink } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { NavLink } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <NavLink color="lime.4" variant="filled" active label="默认" />
      <NavLink color="lime.4" variant="filled" active autoContrast label="自动对比度" />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <NavLink color="lime.4" variant="filled" active label="默认" />
      <NavLink color="lime.4" variant="filled" active autoContrast label="自动对比度" />
    </>
  );
}

export const autoContrast: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 300,
};
