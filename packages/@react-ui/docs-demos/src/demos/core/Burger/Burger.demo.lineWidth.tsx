import { Burger } from '@react-ui/ui';
import { useDisclosure } from '@react-ui/hooks';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { useDisclosure } from '@react-ui/hooks';
import { Burger } from '@react-ui/ui';

function Demo() {
  const [opened, { toggle }] = useDisclosure();
  return <Burger{{props}} size="xl" opened={opened} onClick={toggle} aria-label="Toggle navigation" />;
}
`;

function Wrapper(props: any) {
  const [opened, { toggle }] = useDisclosure();
  return (
    <Burger {...props} size="xl" opened={opened} onClick={toggle} aria-label="Toggle navigation" />
  );
}

export const lineWidth: MantineDemo = {
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
