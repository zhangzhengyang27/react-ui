import React, { useState } from 'react';
import { ComboboxPopover, InputBase } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const data = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

const App: React.FC = () => {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DemoWrap>
      <ComboboxPopover
        data={data}
        value={value}
        onChange={setValue}
        dropdownOpened
      >
        <ComboboxPopover.Target>
          <InputBase
            placeholder="选择框架"
            value={value ? data.find((item) => item.value === value)?.label : ''}
            readOnly
          />
        </ComboboxPopover.Target>
      </ComboboxPopover>
    </DemoWrap>
  );
};

export default App;
