import { GearSixIcon, HeartIcon, ImageIcon } from '@phosphor-icons/react';
import { ActionIcon } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { ActionIcon } from '@xiaoye-react/ui';
import { ImageIcon, GearSixIcon, HeartIcon } from '@phosphor-icons/react';

function Demo() {
  return (
    <ActionIcon.Group{{props}}>
      <ActionIcon variant="default" size="lg" aria-label="相册">
        <ImageIcon size={20} />
      </ActionIcon>

      <ActionIcon variant="default" size="lg" aria-label="设置">
        <GearSixIcon size={20} />
      </ActionIcon>

      <ActionIcon variant="default" size="lg" aria-label="点赞">
        <HeartIcon size={20} />
      </ActionIcon>
    </ActionIcon.Group>
  );
}
`;

function Wrapper(props: any) {
  return (
    <ActionIcon.Group {...props}>
      <ActionIcon variant="default" size="lg" aria-label="相册">
        <ImageIcon size={20} />
      </ActionIcon>

      <ActionIcon variant="default" size="lg" aria-label="设置">
        <GearSixIcon size={20} />
      </ActionIcon>

      <ActionIcon variant="default" size="lg" aria-label="点赞">
        <HeartIcon size={20} />
      </ActionIcon>
    </ActionIcon.Group>
  );
}

export const group: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      type: 'segmented',
      prop: 'orientation',
      data: ['horizontal', 'vertical'],
      initialValue: 'horizontal',
      libraryValue: 'horizontal',
    },
  ],
};
