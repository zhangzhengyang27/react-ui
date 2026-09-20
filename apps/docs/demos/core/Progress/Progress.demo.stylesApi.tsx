import { Progress, ProgressProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { ProgressStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { Progress } from '@xiaoye-react/ui';

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

function Demo(props: ProgressProps) {
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
