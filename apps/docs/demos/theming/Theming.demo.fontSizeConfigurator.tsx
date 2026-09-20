import { Text, TextProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = (props: Record<string, any>) => `
import { Text } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Text fz="${props.fontSize}" lh="${props.lineHeight}">
      Paras is an orange, insectoid Pokémon that resembles the nymph stage of a cicada. Its ovoid
      body is segmented, and it has three pairs of legs. The foremost pair of legs is the largest
      and has sharp claws at the tips. There are five specks on its forehead and three teeth on
      either side of its mouth. It has circular eyes with large pseudopupils.
    </Text>
  );
}
`;

function Wrapper(props: { fontSize: TextProps['fz']; lineHeight: TextProps['lh'] }) {
  return (
    <Text fz={props.fontSize} lh={props.lineHeight}>
      Paras is an orange, insectoid Pokémon that resembles the nymph stage of a cicada. Its ovoid
      body is segmented, and it has three pairs of legs. The foremost pair of legs is the largest
      and has sharp claws at the tips. There are five specks on its forehead and three teeth on
      either side of its mouth. It has circular eyes with large pseudopupils.
    </Text>
  );
}

export const fontSizeConfigurator: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    { type: 'size', prop: 'fontSize', initialValue: 'md', libraryValue: '__none__' },
    { type: 'size', prop: 'lineHeight', initialValue: 'md', libraryValue: '__none__' },
  ],
};
