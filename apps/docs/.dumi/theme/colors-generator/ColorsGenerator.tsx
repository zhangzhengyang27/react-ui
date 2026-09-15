import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { generateColorsMap } from '@xiaoye-react/ui';
import { useLocalStorage } from '@xiaoye-react/hooks';
import { ColorsInput } from './ColorsInput/ColorsInput';
import { ColorsList } from './ColorsList/ColorsList';
import { ColorsOutput } from './ColorsOutput/ColorsOutput';
import { ComponentsPreview } from './ComponentsPreview/ComponentsPreview';

export function ColorsGenerator() {
  const [searchParams, setSearchParams] = useSearchParams();
  const urlColor = `#${searchParams.get('color') || ''}`;
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
  }, [searchParams]);

  const updateQuery = (newColor: string) => {
    setSearchParams({ color: newColor.replace('#', '') }, { replace: true });
  };

  return (
    <div style={{ maxWidth: 'calc(100vw - var(--ui-spacing-lg) * 2)', padding: '0 var(--ui-spacing-lg)' }}>
      <ColorsInput
        value={color}
        onChange={setColor}
        updateQuery={updateQuery}
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
