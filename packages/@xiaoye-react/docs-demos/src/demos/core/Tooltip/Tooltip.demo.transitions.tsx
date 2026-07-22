import { Badge, Group, keys, UI_TRANSITIONS, Tooltip } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

export function Demo() {
  const transitions = keys(UI_TRANSITIONS).map((transition) => (
    <Tooltip key={transition} label={transition} transitionProps={{ transition, duration: 300 }}>
      <Badge variant="light">{transition}</Badge>
    </Tooltip>
  ));

  return (
    <Group justify="center" style={{ cursor: 'default' }}>
      {transitions}
    </Group>
  );
}

export const transitions: UIDemo = {
  type: 'code',
  component: Demo,
};
