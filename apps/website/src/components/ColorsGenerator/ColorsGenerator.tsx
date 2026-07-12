import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { generateColorsMap } from '@react-ui/colors-generator';
import { Title } from '@react-ui/ui';
import { useLocalStorage } from '@react-ui/hooks';
import { ColorsInput } from './ColorsInput/ColorsInput';
import { ColorsList } from './ColorsList/ColorsList';
import { ColorsOutput } from './ColorsOutput/ColorsOutput';
import { ComponentsPreview } from './ComponentsPreview/ComponentsPreview';

export function ColorsGenerator() {
  const router = useRouter();
  const urlColor = `#${router.query.color}`;
  const [color, setColor] = useState('#5474B4');
  const { colors, baseColorIndex } = generateColorsMap(color);
  const [displayColorsInfo, setDisplayColorsInfo] = useLocalStorage({
    key: 'display-colors-info',
    defaultValue: true,
  });

  useEffect(() => {
    if (/^#[0-9A-F]{6}$/i.test(urlColor)) {
      setColor(urlColor);
    }
  }, [router.query.color]);

  return (
    <div style={{ maxWidth: 'calc(100vw - var(--ui-spacing-lg) * 2)' }}>
      <Title fw={500} mb="md" pt="lg" c="bright">
        ReactUI colors generator
      </Title>
      <ColorsInput
        value={color}
        onChange={setColor}
        displayColorsInfo={displayColorsInfo}
        setDisplayColorsInfo={setDisplayColorsInfo}
      />
      <ColorsList
        colors={colors}
        baseColorIndex={baseColorIndex}
        displayColorsInfo={displayColorsInfo}
      />

      <ComponentsPreview colors={colors.map((c) => c.hex()) as any} />

      <ColorsOutput colors={colors.map((c) => c.hex())} />
    </div>
  );
}
