import { Checkbox, Stack } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Checkbox, Stack } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Stack>
      <Checkbox checked label="常规复选框" size="lg" color="lime.4" />
      <Checkbox autoContrast checked label="自动对比度复选框" size="lg" color="lime.4" />
    </Stack>
  );
}
`;

function Demo() {
  return (
    <Stack>
      <Checkbox checked label="常规复选框" size="lg" color="lime.4" onChange={() => {}} />
      <Checkbox
        autoContrast
        checked
        label="自动对比度复选框"
        size="lg"
        color="lime.4"
        onChange={() => {}}
      />
    </Stack>
  );
}

export const autoContrast: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
