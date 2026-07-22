import React from 'react';
import { DEFAULT_THEME, SimpleGrid } from '@xiaoye-react/ui';
import ColorsGroup from './ColorsGroup';

const ThemeColors: React.FC = () => {
  const groups = Object.keys(DEFAULT_THEME.colors).map((group) => (
    <ColorsGroup group={group} key={group} />
  ));

  return (
    <SimpleGrid cols={{ base: 1, '440px': 2, '760px': 3 }}>
      {groups}
    </SimpleGrid>
  );
};

export default ThemeColors;
