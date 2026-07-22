import { Anchor, Checkbox } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Checkbox, Anchor } from '@xiaoye-react/ui';

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
