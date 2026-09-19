import { Textarea } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Textarea } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <Textarea
        placeholder="自动高度，无行数限制"
        label="自动高度，无行数限制"
        minRows={4}
      />

      <Textarea
        label="自动高度，最多 4 行"
        placeholder="自动高度，最多 4 行"
        minRows={2}
        maxRows={4}
      />
    </>
  );
}

`;

function Demo() {
  return (
    <>
      <Textarea
        placeholder="自动高度，无行数限制"
        label="自动高度，无行数限制"
        minRows={4}
      />

      <Textarea
        label="自动高度，最多 4 行"
        placeholder="自动高度，最多 4 行"
        minRows={2}
        maxRows={4}
        mt="md"
      />
    </>
  );
}

export const autosize: UIDemo = {
  type: 'code',
  code,
  component: Demo,
  maxWidth: 340,
  centered: true,
};
