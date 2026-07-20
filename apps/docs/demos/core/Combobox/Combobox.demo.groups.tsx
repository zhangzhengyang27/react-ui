import { useState } from 'react';
import { Combobox, Input, InputBase, useCombobox } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';

const code = `
import { useState } from 'react';
import { Input, InputBase, Combobox, useCombobox } from '@react-ui/ui';

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {value || <Input.Placeholder>选择值</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <Combobox.Group label="水果">
            <Combobox.Option value="🍎 Apples">🍎 苹果</Combobox.Option>
            <Combobox.Option value="🍌 Bananas">🍌 香蕉</Combobox.Option>
            <Combobox.Option value="🍇 Grape">🍇 Grape</Combobox.Option>
          </Combobox.Group>

          <Combobox.Group label="蔬菜">
            <Combobox.Option value="🥦 Broccoli">🥦 西兰花</Combobox.Option>
            <Combobox.Option value="🥕 Carrots">🥕 胡萝卜</Combobox.Option>
            <Combobox.Option value="🥬 Lettuce">🥬 生菜</Combobox.Option>
          </Combobox.Group>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
`;

function Demo() {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {value || <Input.Placeholder>选择值</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <Combobox.Group label="水果">
            <Combobox.Option value="🍎 Apples">🍎 苹果</Combobox.Option>
            <Combobox.Option value="🍌 Bananas">🍌 香蕉</Combobox.Option>
            <Combobox.Option value="🍇 Grape">🍇 Grape</Combobox.Option>
          </Combobox.Group>

          <Combobox.Group label="蔬菜">
            <Combobox.Option value="🥦 Broccoli">🥦 西兰花</Combobox.Option>
            <Combobox.Option value="🥕 Carrots">🥕 胡萝卜</Combobox.Option>
            <Combobox.Option value="🥬 Lettuce">🥬 生菜</Combobox.Option>
          </Combobox.Group>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export const groups: UIDemo = {
  type: 'code',
  component: Demo,
  maxWidth: 340,
  centered: true,
  defaultExpanded: false,
  code,
};
