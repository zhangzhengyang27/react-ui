import { Burger, BurgerProps } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useDisclosure } from '@xiaoye-react/hooks';
import { Burger } from '@xiaoye-react/ui';

function Demo() {
  const [opened, { toggle }] = useDisclosure();
  return <Burger{{props}} size="xl" opened={opened} onClick={toggle} aria-label="切换导航" />;
}
`;

function Wrapper(props: BurgerProps) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <Burger {...props} size="xl" opened={opened} onClick={toggle} aria-label="切换导航" />
  );
}

export const lineWidth: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      type: 'number',
      prop: 'lineSize',
      initialValue: 2,
      libraryValue: null,
      min: 1,
      max: 10,
      step: 1,
    },
  ],
};
