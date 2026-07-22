import { Button, Code, Group, UIThemeProvider, Text } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

function Demo() {
  return (
    <>
      <Text>
        聚焦环：<Code>auto</Code>
      </Text>

      <Group mt="xs">
        <Button size="xs">按钮 1</Button>
        <Button size="xs">按钮 2</Button>
      </Group>

      <UIThemeProvider inherit theme={{ focusRing: 'always' }}>
        <Text mt="lg">
          聚焦环：<Code>always</Code>
        </Text>

        <Group mt="xs">
          <Button size="xs">按钮 1</Button>
          <Button size="xs">按钮 2</Button>
        </Group>
      </UIThemeProvider>

      <UIThemeProvider inherit theme={{ focusRing: 'never' }}>
        <Text mt="lg">
          聚焦环：<Code>never</Code>
        </Text>

        <Group mt="xs">
          <Button size="xs">按钮 1</Button>
          <Button size="xs">按钮 2</Button>
        </Group>
      </UIThemeProvider>
    </>
  );
}

export const focusRing: UIDemo = {
  type: 'code',
  component: Demo,
};
