import { Button, CopyButton } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { CopyButton, Button } from '@xiaoye-react/ui';

function Demo() {
  return (
    <CopyButton value="#">
      {({ copied, copy }) => (
        <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
          {copied ? '已复制 url' : '复制 url'}
        </Button>
      )}
    </CopyButton>
  );
}
`;

function Demo() {
  return (
    <CopyButton value="#">
      {({ copied, copy }) => (
        <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
          {copied ? '已复制 url' : '复制 url'}
        </Button>
      )}
    </CopyButton>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
