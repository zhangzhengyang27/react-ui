import { CloseButton, CloseButtonProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { CloseButton } from '@xiaoye-react/ui';

function Demo() {
  return <CloseButton{{props}} />;
}
`;

function Wrapper(props: CloseButtonProps) {
  return <CloseButton {...props} />;
}

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    { prop: 'size', type: 'size', initialValue: 'md', libraryValue: 'md' },
    {
      prop: 'variant',
      type: 'segmented',
      data: ['transparent', 'subtle'],
      libraryValue: 'subtle',
      initialValue: 'subtle',
    },
  ],
};
