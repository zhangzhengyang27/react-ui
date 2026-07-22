import { Autocomplete } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Autocomplete } from '@xiaoye-react/ui';

const data = Array(100)
  .fill(0)
  .map((_, index) => \`Option \${index}\`);

function Demo() {
  return (
    <>
      <Autocomplete
        label="使用滚动区域（默认）"
        placeholder="选择值或输入任意内容"
        data={data}
        maxDropdownHeight={200}
      />

      <Autocomplete
        label="使用原生滚动"
        placeholder="选择值或输入任意内容"
        data={data}
        withScrollArea={false}
        styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
        mt="md"
      />
    </>
  );
}
`;

const data = Array(100)
  .fill(0)
  .map((_, index) => `Option ${index}`);

function Demo() {
  return (
    <>
      <Autocomplete
        label="使用滚动区域（默认）"
        placeholder="选择值或输入任意内容"
        data={data}
        maxDropdownHeight={200}
      />

      <Autocomplete
        label="使用原生滚动"
        placeholder="选择值或输入任意内容"
        data={data}
        withScrollArea={false}
        styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
        mt="md"
      />
    </>
  );
}

export const scrollArea: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
