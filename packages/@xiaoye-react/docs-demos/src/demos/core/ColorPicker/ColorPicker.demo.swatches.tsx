import { ColorPicker, DEFAULT_THEME, Stack } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { ColorPicker } from '@xiaoye-react/ui';

function Demo() {
  return (
    <ColorPicker
      format="hex"
      swatches={[${Object.keys(DEFAULT_THEME.colors)
        .map((color) => `'${DEFAULT_THEME.colors[color][6]}'`)
        .join(', ')}]}
    />
  );
}
`;

function Demo() {
  return (
    <Stack align="center">
      <ColorPicker
        format="hex"
        defaultValue="rgba(50, 151, 194, 1)"
        swatches={Object.keys(DEFAULT_THEME.colors).map((color) => DEFAULT_THEME.colors[color][6])}
      />
    </Stack>
  );
}

export const swatches: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
