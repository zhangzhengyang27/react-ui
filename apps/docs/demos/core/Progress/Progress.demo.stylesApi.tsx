import { Progress } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { ProgressStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { Progress } from '@react-ui/ui';

function Demo() {
  return (
    <Progress.Root size="xl"{{props}}>
      <Progress.Section value={35}>
        <Progress.Label>文档</Progress.Label>
      </Progress.Section>
    </Progress.Root>
  );
}
`;

function Demo(props: any) {
  return (
    <Progress.Root size="xl" {...props}>
      <Progress.Section value={35}>
        <Progress.Label>文档</Progress.Label>
      </Progress.Section>
    </Progress.Root>
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: ProgressStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
};
