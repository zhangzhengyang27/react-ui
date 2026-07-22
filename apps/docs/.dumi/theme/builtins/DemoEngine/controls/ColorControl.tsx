import { useState } from 'react';
import {
  BoxProps,
  CheckIcon,
  ColorPicker,
  ColorSwatch,
  DEFAULT_THEME,
  ElementProps,
  Group,
  Input,
  Popover,
  TextInput,
  UnstyledButton,
} from '@xiaoye-react/ui';
import { ColorWheelIcon } from './ColorWheelIcon';
import { getControlLabel } from './get-control-label';
import { ConfiguratorControl } from './types';

export type ConfiguratorColorControlOptions = ConfiguratorControl<
  'color',
  { initialValue: string }
>;

export interface ConfiguratorColorControlProps
  extends BoxProps, ElementProps<'div', 'onChange' | 'value' | 'size'> {
  value: string;
  onChange: (value: string) => void;
  prop: string;
}

export function ConfiguratorColorControl({
  value,
  onChange,
  prop,
  ...others
}: ConfiguratorColorControlProps) {
  const [colorPickerColor, setColorPickerColor] = useState('#fff');

  const handleColorPickerChange = (color: string) => {
    setColorPickerColor(color);
    onChange(color);
  };

  const colors = Object.keys(DEFAULT_THEME.colors)
    .filter((color) => color !== 'dark')
    .map((color) => (
      <ColorSwatch
        color={`var(--ui-color-${color}-filled)`}
        component="button"
        key={color}
        onClick={() => onChange(color)}
        radius="sm"
        style={{
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--ui-color-white)',
          flex: '1 0 calc(15% - 4px)',
        }}
        aria-label={color}
      >
        {value === color && <CheckIcon style={{ width: 12, height: 12 }} />}
      </ColorSwatch>
    ));

  return (
    <Input.Wrapper labelElement="div" label={getControlLabel(prop)} {...others}>
      <Group gap={2} mt={2} wrap="wrap">
        {colors}
        <Popover radius="md" position="bottom-end" shadow="md">
          <Popover.Target>
            <UnstyledButton
              style={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flex: '1 0 calc(15% - 4px)',
                height: 28,
                borderRadius: 'var(--ui-radius-sm, 4px)',
                border: '1px solid light-dark(var(--ui-color-gray-5), var(--ui-color-dark-3))',
              }}
              aria-label="选择颜色"
            >
              <ColorWheelIcon />
            </UnstyledButton>
          </Popover.Target>

          <Popover.Dropdown p={8}>
            <ColorPicker
              value={colorPickerColor}
              onChange={handleColorPickerChange}
              format="rgba"
            />
            <TextInput
              value={colorPickerColor}
              onChange={(event) => handleColorPickerChange(event.currentTarget.value)}
              placeholder="输入颜色"
              radius="md"
              size="xs"
              mt="xs"
            />
          </Popover.Dropdown>
        </Popover>
      </Group>
    </Input.Wrapper>
  );
}
