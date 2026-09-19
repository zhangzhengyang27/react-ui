import { useState } from 'react';
import { Combobox, Input, InputBase, useCombobox } from '@xiaoye-react/ui';
import classes from './SelectGroupsStyles.module.css';

export function SelectGroupsStyles() {
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
          onClick={() => combobox.toggleDropdown()}
          rightSectionPointerEvents="none"
        >
          {value || <Input.Placeholder>选择值</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>
          <Combobox.Group
            label="水果"
            className={classes.group}
            groupLabelProps={{ className: classes.groupLabel }}
          >
            <Combobox.Option value="🍎 Apples">🍎 苹果</Combobox.Option>
            <Combobox.Option value="🍌 Bananas">🍌 香蕉</Combobox.Option>
          </Combobox.Group>

          <Combobox.Group
            label="蔬菜"
            className={classes.group}
            groupLabelProps={{ className: classes.groupLabel }}
          >
            <Combobox.Option value="🥦 Broccoli">🥦 西兰花</Combobox.Option>
            <Combobox.Option value="🥕 Carrots">🥕 胡萝卜</Combobox.Option>
          </Combobox.Group>

          <Combobox.Option value="🥩 Steak">🥩 Steak</Combobox.Option>
          <Combobox.Option value="🍗 Chicken">🍗 Chicken</Combobox.Option>
        </Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}
