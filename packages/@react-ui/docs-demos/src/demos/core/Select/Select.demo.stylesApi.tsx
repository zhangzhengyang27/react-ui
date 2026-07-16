import { AtIcon } from '@phosphor-icons/react';
import { Select } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import { SelectStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { AtIcon } from '@phosphor-icons/react';
import { Select } from '@react-ui/ui';

function Demo() {
  return (
    <Select
     {{props}}
      leftSection={<AtIcon size={18} />}
      label="选择"
      description="描述"
      error="错误"
      placeholder="选择"
      data={['React', 'Angular']}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <Select
      {...props}
      dropdownOpened
      leftSection={<AtIcon size={18} />}
      withAsterisk
      label="选择"
      description="描述"
      placeholder="选择"
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
  data: SelectStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
