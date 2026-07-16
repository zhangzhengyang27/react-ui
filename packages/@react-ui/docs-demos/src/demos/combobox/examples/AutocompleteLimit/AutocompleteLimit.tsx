import { useState } from 'react';
import { Combobox, TextInput, useCombobox } from '@react-ui/ui';

const MOCKDATA = Array(100000)
  .fill(0)
  .map((_, index) => `Item ${index}`);

function getFilteredOptions(data: string[], searchQuery: string, limit: number) {
  const result: string[] = [];

  for (let i = 0; i < data.length; i += 1) {
    if (result.length === limit) {
      break;
    }

    if (data[i].toLowerCase().includes(searchQuery.trim().toLowerCase())) {
      result.push(data[i]);
    }
  }

  return result;
}

export function AutocompleteLimit() {
  const combobox = useCombobox();
  const [value, setValue] = useState('');
  const filteredOptions = getFilteredOptions(MOCKDATA, value, 7);

  const options = filteredOptions.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      onOptionSubmit={(optionValue) => {
        setValue(optionValue);
        combobox.closeDropdown();
      }}
      withinPortal={false}
      store={combobox}
    >
      <Combobox.Target>
        <TextInput
          label="选择值或输入任意内容"
          placeholder="选择值或输入任意内容"
          value={value}
          onChange={(event) => {
            setValue(event.currentTarget.value);
            combobox.openDropdown();
          }}
          onClick={() => combobox.openDropdown()}
          onFocus={() => combobox.openDropdown()}
          onBlur={() => combobox.closeDropdown()}
        />
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          {options.length === 0 ? <Combobox.Empty>未找到</Combobox.Empty> : options}
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
