import { AtIcon } from '@phosphor-icons/react';
import { Select } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { SelectStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { AtIcon } from '@phosphor-icons/react';
import { Select } from '@react-ui/ui';

function Demo() {
  return (
    <Select
     {{props}}
      leftSection={<AtIcon size={18} />}
      label="Select"
      description="Description"
      error="Error"
      placeholder="Select"
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
      label="Select"
      description="Description"
      placeholder="Select"
      comboboxProps={{ hideDetached: false }}
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Node', 'Django'] },
      ]}
    />
  );
}

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data: SelectStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
