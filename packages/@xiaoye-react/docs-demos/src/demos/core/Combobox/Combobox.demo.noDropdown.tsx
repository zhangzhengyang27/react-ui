import { useState } from 'react';
import { Combobox, TextInput } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { Combobox, TextInput } from '@xiaoye-react/ui';

function Demo() {
  const [value, setValue] = useState('');

  return (
    <Combobox onOptionSubmit={setValue}>
      <Combobox.EventsTarget>
        <TextInput
          placeholder="选择值"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </Combobox.EventsTarget>

      <Combobox.Options mt="sm">
        <Combobox.Option value="First">第一</Combobox.Option>
        <Combobox.Option value="Second">第二</Combobox.Option>
        <Combobox.Option value="Third">第三</Combobox.Option>
      </Combobox.Options>
    </Combobox>
  );
}
`;

function Demo() {
  const [value, setValue] = useState('');

  return (
    <Combobox onOptionSubmit={setValue}>
      <Combobox.EventsTarget>
        <TextInput
          placeholder="选择值"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </Combobox.EventsTarget>

      <Combobox.Options mt="sm">
        <Combobox.Option value="First">第一</Combobox.Option>
        <Combobox.Option value="Second">第二</Combobox.Option>
        <Combobox.Option value="Third">第三</Combobox.Option>
      </Combobox.Options>
    </Combobox>
  );
}

export const noDropdown: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
  defaultExpanded: false,
};
