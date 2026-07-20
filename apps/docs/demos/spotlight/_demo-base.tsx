import { useMemo } from 'react';
import { Button, Group } from '@react-ui/ui';
import { createSpotlight, Spotlight, SpotlightProps } from '@react-ui/spotlight';

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
