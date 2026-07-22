import { SlidersHorizontalIcon } from '@phosphor-icons/react';
import { ActionIcon } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';
import { interactiveVariantsControl } from '../../shared';

const code = `
import { ActionIcon } from '@xiaoye-react/ui';
import { SlidersHorizontalIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <ActionIcon{{props}} aria-label="设置">
      <SlidersHorizontalIcon style={{ width: '70%', height: '70%' }} />
    </ActionIcon>
  );
}
`;

function Wrapper(props: any) {
  return (
    <ActionIcon {...props} aria-label="设置">
      <SlidersHorizontalIcon style={{ width: '70%', height: '70%' }} />
    </ActionIcon>
  );
}

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    interactiveVariantsControl,
    { prop: 'color', type: 'color', initialValue: 'blue', libraryValue: 'blue' },
    { prop: 'size', type: 'size', initialValue: 'md', libraryValue: 'md' },
    { prop: 'radius', type: 'size', initialValue: 'md', libraryValue: 'md' },
  ],
};
