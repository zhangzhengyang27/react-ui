import { AspectRatio, Overlay, OverlayProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Overlay, AspectRatio } from '@xiaoye-react/ui';

function Demo() {
  return (
    <AspectRatio ratio={16 / 9} maw={400} mx="auto" pos="relative">
      <img
        src="/demo/images/bg-3.png"
        alt="Demo"
      />
      <Overlay color="#000" backgroundOpacity={0.35}{{props}} />
    </AspectRatio>
  );
}
`;

function Wrapper(props: OverlayProps) {
  return (
    <AspectRatio ratio={16 / 9} maw={400} mx="auto" pos="relative">
      <img
        src="/demo/images/bg-3.png"
        alt="Demo"
      />
      <Overlay color="#000" backgroundOpacity={0.35} {...props} />
    </AspectRatio>
  );
}

export const blur: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    { type: 'number', prop: 'blur', initialValue: 15, libraryValue: null, min: 0, max: 30 },
  ],
};
