import { useState } from 'react';
import { CrosshairIcon } from '@phosphor-icons/react';
import { ActionIcon, ColorSwatch, Group, Text } from '@xiaoye-react/ui';
import { useEyeDropper } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useState } from 'react';
import { ActionIcon, Group, ColorSwatch, Text } from '@xiaoye-react/ui';
import { CrosshairIcon } from '@phosphor-icons/react';
import { useEyeDropper } from '@xiaoye-react/hooks';

function Demo() {
  const [color, setColor] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const { supported, open } = useEyeDropper();

  const pickColor = async () => {
    try {
      const { sRGBHex } = (await open())!;
      setColor(sRGBHex);
    } catch (e) {
      setError(e as Error);
    }
  };

  if (!supported) {
    return <Text ta="center">你的浏览器不支持 EyeDropper API</Text>;
  }

  return (
    <Group>
      <ActionIcon variant="default" onClick={pickColor} size="xl">
        <CrosshairIcon size={28} />
      </ActionIcon>
      {color ? (
        <Group gap="xs">
          <ColorSwatch color={color} />
          <Text>Picked color: {color}</Text>
        </Group>
      ) : (
        <Text>点击按钮选择颜色</Text>
      )}
      {error && <Text c="red">错误：{error?.message}</Text>}
    </Group>
  );
}
`;

function Demo() {
  const [color, setColor] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const { supported, open } = useEyeDropper();

  const pickColor = async () => {
    try {
      const { sRGBHex } = (await open())!;
      setColor(sRGBHex);
    } catch (e) {
      setError(e as Error);
    }
  };

  if (!supported) {
    return <Text ta="center">你的浏览器不支持 EyeDropper API</Text>;
  }

  return (
    <Group>
      <ActionIcon variant="default" onClick={pickColor} size="xl">
        <CrosshairIcon size={28} />
      </ActionIcon>
      {color ? (
        <Group gap="xs">
          <ColorSwatch color={color} />
          <Text>Picked color: {color}</Text>
        </Group>
      ) : (
        <Text>点击按钮选择颜色</Text>
      )}
      {error && <Text c="red">错误：{error?.message}</Text>}
    </Group>
  );
}

export const usage: UIDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
