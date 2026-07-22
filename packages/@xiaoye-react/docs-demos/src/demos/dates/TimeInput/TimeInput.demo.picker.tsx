import { useRef } from 'react';
import { ClockIcon } from '@phosphor-icons/react';
import { ActionIcon } from '@xiaoye-react/ui';
import { TimeInput } from '@xiaoye-react/dates';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useRef } from 'react';
import { ActionIcon } from '@xiaoye-react/ui';
import { TimeInput } from '@xiaoye-react/dates';
import { ClockIcon } from '@phosphor-icons/react';

function Demo() {
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <ClockIcon size={16} />
    </ActionIcon>
  );

  return (
    <TimeInput label="点击图标显示浏览器选择器" ref={ref} rightSection={pickerControl} />
  );
}
`;

function Demo() {
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <ClockIcon size={16} />
    </ActionIcon>
  );

  return (
    <TimeInput label="点击图标显示浏览器选择器" ref={ref} rightSection={pickerControl} />
  );
}

export const picker: UIDemo = {
  type: 'code',
  centered: true,
  maxWidth: 340,
  component: Demo,
  code,
};
