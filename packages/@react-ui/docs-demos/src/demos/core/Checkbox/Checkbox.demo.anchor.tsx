import { Anchor, Checkbox } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { Checkbox, Anchor } from '@react-ui/ui';

function Demo() {
  return (
    <Checkbox
      label={
        <>
          我接受{' '}
          <Anchor href="#" target="_blank" inherit>
            条款和条件
          </Anchor>
        </>
      }
    />
  );
}
`;

function Demo() {
  return (
    <Checkbox
      label={
        <>
          我接受{' '}
          <Anchor href="#" target="_blank" inherit>
            条款和条件
          </Anchor>
        </>
      }
    />
  );
}

export const anchor: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
