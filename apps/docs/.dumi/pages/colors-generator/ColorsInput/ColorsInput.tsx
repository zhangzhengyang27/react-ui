import { useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';
import chroma from 'chroma-js';
import {
  Button,
  ColorPicker,
  ColorSwatch,
  Group,
  Input,
  rem,
  Switch,
  TextInput,
} from '@react-ui/ui';
import { useClipboard } from '@react-ui/hooks';
import { COLORS_PRESET } from './colors-preset';
import classes from './ColorsInput.module.css';

interface ColorsInputProps {
  value: string;
  onChange: (value: string) => void;
  updateQuery: (color: string) => void;
  displayColorsInfo: boolean | undefined;
  setDisplayColorsInfo: (value: boolean) => void;
}

export function ColorsInput({
  value,
  onChange,
  updateQuery,
  displayColorsInfo,
  setDisplayColorsInfo,
}: ColorsInputProps) {
  const [inputState, setInputState] = useState(value);
  const [error, setError] = useState(false);
  const clipboard = useClipboard();

  const handleChange = (val: string) => {
    setInputState(val);
    onChange(val);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.currentTarget.value;
    const hasError = !chroma.valid(val);
    setInputState(val);
    setError(hasError);
    if (!hasError) {
      onChange(val);
      updateQuery(val);
    }
  };

  const presetControls = COLORS_PRESET.map((color) => (
    <Button
      variant="default"
      leftSection={<ColorSwatch size={20} color={color.color} />}
      radius="md"
      key={color.color}
      onClick={() => {
        handleChange(color.color);
        updateQuery(color.color);
      }}
    >
      {color.name}
    </Button>
  ));

  return (
    <div className={classes.root}>
      <div className={classes.inputs}>
        <TextInput
          value={inputState}
          onChange={handleInputChange}
          error={error}
          label="输入基础颜色"
          className={classes.input}
          size="md"
          radius="md"
        />
        <ColorPicker
          value={value}
          onChange={handleChange}
          onChangeEnd={updateQuery}
          size="lg"
          classNames={{ saturation: classes.saturation, wrapper: classes.colorPicker }}
        />

        <Switch
          className={classes.switch}
          label="显示颜色信息"
          size="md"
          checked={displayColorsInfo}
          onChange={(event) => setDisplayColorsInfo(event.currentTarget.checked)}
          mt="xl"
        />

        <Button
          fullWidth
          leftSection={
            clipboard.copied ? (
              <FiCheck style={{ width: rem(18) }} />
            ) : (
              <FiCopy style={{ width: rem(18) }} />
            )
          }
          rightSection={<span />}
          justify="space-between"
          size="md"
          mt="xl"
          radius="md"
          onClick={() => clipboard.copy(window.location.href)}
        >
          {clipboard.copied ? '已复制' : '复制链接'}
        </Button>
      </div>
      <div className={classes.presets}>
        <Input.Label size="md">预设</Input.Label>
        <Group gap="xs">{presetControls}</Group>
      </div>
    </div>
  );
}
