import { Button, CopyButton } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { CopyButton, Button } from '@react-ui/ui';

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
