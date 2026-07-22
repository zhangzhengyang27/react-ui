import {
  CheckIcon,
  TextAlignCenterIcon,
  TextAlignJustifyIcon,
  TextAlignLeftIcon,
  TextAlignRightIcon,
} from '@phosphor-icons/react';
import { Group, Select, SelectProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TextAlignCenterIcon, TextAlignJustifyIcon, TextAlignLeftIcon, TextAlignRightIcon, CheckIcon } from '@phosphor-icons/react';
import { Group, Select, SelectProps } from '@xiaoye-react/ui';

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

const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => (
  <Group flex="1" gap="xs">
    {icons[option.value]}
    {option.label}
    {checked && <CheckIcon style={{ marginInlineStart: 'auto' }} {...iconProps} />}
  </Group>
);

function Demo() {
  return (
    <Select
      label="带 renderOption 的选择器"
      placeholder="选择文本对齐方式"
      data={[
        { value: 'left', label: '左' },
        { value: 'center', label: '居中' },
        { value: 'right', label: '右' },
        { value: 'justify', label: 'Justify' },
      ]}
      renderOption={renderSelectOption}
    />
  );
}
`;

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

const renderSelectOption: SelectProps['renderOption'] = ({ option, checked }) => (
  <Group flex="1" gap="xs">
    {icons[option.value]}
    {option.label}
    {checked && <CheckIcon style={{ marginInlineStart: 'auto' }} {...iconProps} />}
  </Group>
);

function Demo() {
  return (
    <Select
      label="带 renderOption 的选择器"
      placeholder="选择文本对齐方式"
      data={[
        { value: 'left', label: '左' },
        { value: 'center', label: '居中' },
        { value: 'right', label: '右' },
        { value: 'justify', label: 'Justify' },
      ]}
      renderOption={renderSelectOption}
    />
  );
}

export const renderOption: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
  defaultExpanded: false,
};
