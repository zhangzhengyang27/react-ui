import { AtIcon } from '@phosphor-icons/react';
import { MultiSelect } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { MultiSelectStylesApi } from '@xiaoye-react/docs-styles-api';

const code = `
import { AtIcon } from '@phosphor-icons/react';
import { MultiSelect } from '@xiaoye-react/ui';

function Demo() {
  return (
    <MultiSelect
     {{props}}
      leftSection={<AtIcon size={18} />}
      label="多选"
      description="描述"
      error="错误"
      placeholder="多选"
      defaultValue={['React', 'Angular']}
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Node', 'Django'] },
      ]}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <MultiSelect
      {...props}
      dropdownOpened
      leftSection={<AtIcon size={18} />}
      withAsterisk
      label="多选"
      description="描述"
      placeholder="多选"
      defaultValue={['React', 'Angular']}
      comboboxProps={{ hideDetached: false }}
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Node', 'Django'] },
      ]}
    />
  );
}

export const stylesApi: UIDemo = {
  type: 'styles-api',
  data: MultiSelectStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
