import { Burger, BurgerProps } from '@xiaoye-react/ui';
import { useDisclosure } from '@xiaoye-react/hooks';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useDisclosure } from '@xiaoye-react/hooks';
import { Burger } from '@xiaoye-react/ui';

function Demo() {
  const [opened, { toggle }] = useDisclosure();
  return <Burger{{props}} opened={opened} onClick={toggle} aria-label="切换导航" />;
}
`;

function Wrapper(props: BurgerProps) {
  const [opened, { toggle }] = useDisclosure();
  return <Burger {...props} opened={opened} onClick={toggle} aria-label="切换导航" />;
}

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [{ type: 'size', prop: 'size', initialValue: 'md', libraryValue: 'md' }],
};
