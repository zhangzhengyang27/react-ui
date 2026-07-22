import { Select } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Select } from '@xiaoye-react/ui';

function Demo() {
  return (
    <>
      <Select
        label="选项不可取消选择"
        placeholder="选择值"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        allowDeselect={false}
      />

      <Select
        label="选项可以取消选择"
        description="这是默认行为，点击下拉框中的 React"
        placeholder="选择值"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        allowDeselect
        mt="md"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Select
        label="选项不可取消选择"
        placeholder="选择值"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        allowDeselect={false}
      />

      <Select
        label="选项可以取消选择"
        description="这是默认行为，点击下拉框中的 React"
        placeholder="选择值"
        data={['React', 'Angular', 'Vue', 'Svelte']}
        defaultValue="React"
        allowDeselect
        mt="md"
      />
    </>
  );
}

export const allowDeselect: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 340,
  centered: true,
};
