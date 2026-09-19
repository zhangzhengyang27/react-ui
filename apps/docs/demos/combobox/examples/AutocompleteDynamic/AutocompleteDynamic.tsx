import { useState } from 'react';
import { Combobox, TextInput, useCombobox } from '@xiaoye-react/ui';

export function AutocompleteDynamic() {
  const combobox = useCombobox();
  const [value, setValue] = useState('');

  const options = ['gmail.com', 'outlook.com', 'react-ui.dev'].map((item) => (
    <Combobox.Option value={`${value}@${item}`} key={item}>
      {`${value}@${item}`}
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label="你的邮箱"
          placeholder="你的邮箱"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
            combobox.updateSelectedOptionIndex();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={value.trim().length === 0 || value.includes('@')}>
        <Combobox.Options>
          {options.length === 0 ? <Combobox.Empty>未找到</Combobox.Empty> : options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
