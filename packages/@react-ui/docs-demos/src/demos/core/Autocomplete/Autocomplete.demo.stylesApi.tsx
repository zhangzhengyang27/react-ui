import { AtIcon } from '@phosphor-icons/react';
import { Autocomplete } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';
import { AutocompleteStylesApi } from '@react-ui/docs-styles-api';

const code = `
import { AtIcon } from '@phosphor-icons/react';
import { Autocomplete } from '@react-ui/ui';

function Demo() {
  return (
    <Autocomplete
     {{props}}
      leftSection={<AtIcon size={18} />}
      label="Autocomplete"
      description="Description"
      error="Error"
      placeholder="Autocomplete"
      data={['React', 'Angular']}
    />
  );
}
`;

function Demo(props: any) {
  return (
    <Autocomplete
      {...props}
      dropdownOpened
      leftSection={<AtIcon size={18} />}
      withAsterisk
      label="Autocomplete"
      description="Description"
      placeholder="Autocomplete"
      comboboxProps={{ hideDetached: false }}
      data={[
        { group: 'Frontend', items: ['React', 'Angular'] },
        { group: 'Backend', items: ['Node', 'Django'] },
      ]}
    />
  );
}

const data = { ...AutocompleteStylesApi };
delete (data as any).selectors.empty;

export const stylesApi: MantineDemo = {
  type: 'styles-api',
  data,
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
