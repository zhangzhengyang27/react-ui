import { useMemo } from 'react';
import { Button, Group } from '@xiaoye-react/ui';
import { createSpotlight, Spotlight, SpotlightProps } from '@xiaoye-react/ui';

export function SpotlightDemoBase(props: Partial<SpotlightProps>) {
  const [store, actions] = useMemo(createSpotlight, []);
  return (
    <>
      <Group justify="center">
        <Button onClick={actions.open}>打开聚光灯</Button>
      </Group>
      <Spotlight actions={[]} store={store} {...props} />
    </>
  );
}
