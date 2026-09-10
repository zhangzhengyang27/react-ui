import { useState } from 'react'
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check'
import { TextAlignCenterIcon } from '@phosphor-icons/react/dist/csr/TextAlignCenter'
import { TextAlignJustifyIcon } from '@phosphor-icons/react/dist/csr/TextAlignJustify'
import { TextAlignLeftIcon } from '@phosphor-icons/react/dist/csr/TextAlignLeft'
import { TextAlignRightIcon } from '@phosphor-icons/react/dist/csr/TextAlignRight'
import { Button, ComboboxPopover, ComboboxPopoverProps, Group } from '@xiaoye-react/ui'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { useState } from 'react';
import { CheckIcon } from '@phosphor-icons/react/dist/csr/Check';
import { TextAlignCenterIcon } from '@phosphor-icons/react/dist/csr/TextAlignCenter';
import { TextAlignJustifyIcon } from '@phosphor-icons/react/dist/csr/TextAlignJustify';
import { TextAlignLeftIcon } from '@phosphor-icons/react/dist/csr/TextAlignLeft';
import { TextAlignRightIcon } from '@phosphor-icons/react/dist/csr/TextAlignRight';
import { Button, ComboboxPopover, ComboboxPopoverProps, Group } from '@xiaoye-react/ui';

const iconProps = {
  color: 'currentColor',
  opacity: 0.6,
  size: 18,
};

const icons: Record<string, React.ReactNode> = {
  left: <TextAlignLeftIcon {...iconProps} />,
  center: <TextAlignCenterIcon {...iconProps} />,
  right: <TextAlignRightIcon {...iconProps} />,
  justify: <TextAlignJustifyIcon {...iconProps} />,
};

const renderSelectOption: ComboboxPopoverProps['renderOption'] = ({ option, checked }) => (
  <Group flex="1" gap="xs">
    {icons[option.value]}
    {option.label}
    {checked && <CheckIcon style={{ marginInlineStart: 'auto' }} {...iconProps} />}
  </Group>
);

function Demo() {
  const [value, setValue] = useState<string | null>(null);

  return (
    <ComboboxPopover
      data={[
        { value: 'left', label: '左' },
        { value: 'center', label: '居中' },
        { value: 'right', label: '右' },
        { value: 'justify', label: 'Justify' },
      ]}
      value={value}
      onChange={setValue}
      renderOption={renderSelectOption}
    >
      <ComboboxPopover.Target>
        <Button variant="default" miw={200}>{value || '选择对齐方式'}</Button>
      </ComboboxPopover.Target>
    </ComboboxPopover>
  );
}
`

const iconProps = {
    color: 'currentColor',
    opacity: 0.6,
    size: 18
}

const icons: Record<string, React.ReactNode> = {
    left: <TextAlignLeftIcon {...iconProps} />,
    center: <TextAlignCenterIcon {...iconProps} />,
    right: <TextAlignRightIcon {...iconProps} />,
    justify: <TextAlignJustifyIcon {...iconProps} />
}

const renderSelectOption: ComboboxPopoverProps['renderOption'] = ({ option, checked }) => (
    <Group flex="1" gap="xs">
        {icons[option.value]}
        {option.label}
        {checked && <CheckIcon style={{ marginInlineStart: 'auto' }} {...iconProps} />}
    </Group>
)

function Demo() {
    const [value, setValue] = useState<string | null>(null)

    return (
        <ComboboxPopover
            data={[
                { value: 'left', label: '左' },
                { value: 'center', label: '居中' },
                { value: 'right', label: '右' },
                { value: 'justify', label: 'Justify' }
            ]}
            value={value}
            onChange={setValue}
            renderOption={renderSelectOption}
        >
            <ComboboxPopover.Target>
                <Button variant="default" miw={200}>
                    {value || '选择对齐方式'}
                </Button>
            </ComboboxPopover.Target>
        </ComboboxPopover>
    )
}

export const renderOption: UIDemo = {
    type: 'code',
    component: Demo,
    code,
    centered: true,
    defaultExpanded: false
}
