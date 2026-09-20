import { useEffect, useState } from 'react';
import { Button, Group, UIColorShade, UIProvider, useUIColorScheme } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = (props: Record<string, any>) => `
import { UIProvider, Button, Group } from '@xiaoye-react/ui';

function Demo() {
  return (
    <UIProvider theme={{ primaryShade: ${props.primaryShade} }}>
      <Group>
        <Button>填充</Button>
        <Button variant="light">浅色</Button>
        <Button variant="outline">轮廓</Button>
      </Group>
    </UIProvider>
  );
}
`;

function Wrapper(props: { primaryShade: UIColorShade }) {
  const [attr, setAttr] = useState<string | undefined>(undefined);
  const { colorScheme } = useUIColorScheme();

  useEffect(() => {
    setAttr(colorScheme);
  }, [colorScheme]);

  return (
    <div id="primary-color-demo-root" data-ui-color-scheme={attr}>
      <UIProvider
        cssVariablesSelector="#primary-color-demo-root"
        theme={{ primaryShade: props.primaryShade }}
      >
        <Group>
          <Button>填充</Button>
          <Button variant="light">浅色</Button>
          <Button variant="outline">轮廓</Button>
        </Group>
      </UIProvider>
    </div>
  );
}

export const primaryShadeConfigurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      type: 'number',
      prop: 'primaryShade',
      initialValue: 6,
      libraryValue: '__none__',
      min: 0,
      max: 9,
    },
  ],
};
