import { AtIcon } from '@phosphor-icons/react';
import { Button } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { ButtonStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Button } from '@react-ui/ui';
import { AtIcon } from '@phosphor-icons/react';

function Demo() {
  return <Button{{props}} leftSection={<AtIcon size={16} />}>你的邮箱</Button>;
}
`;

function Demo(props: any) {
  return (
    <Button leftSection={<AtIcon size={16} />} {...props}>
      你的邮箱
    </Button>
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: ButtonStylesApi,
  component: Demo,
  code,
  centered: true,
};
