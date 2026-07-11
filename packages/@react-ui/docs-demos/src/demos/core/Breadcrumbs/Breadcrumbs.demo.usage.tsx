import { Anchor, Breadcrumbs } from '@react-ui/ui';
import { MantineDemo } from '@react-ui/demo';

const code = `
import { Breadcrumbs, Anchor } from '@react-ui/ui';

const items = [
  { title: 'ReactUI', href: '#' },
  { title: 'ReactUI hooks', href: '#' },
  { title: 'use-id', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

function Demo() {
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Breadcrumbs separator="→" separatorMargin="md" mt="xs">
        {items}
      </Breadcrumbs>
    </>
  );
}
`;

const items = [
  { title: 'ReactUI', href: 'https://mantine.dev' },
  { title: 'ReactUI hooks', href: '#' },
  { title: 'use-id', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
));

function Demo() {
  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <Breadcrumbs
        separator="→"
        mt="xs"
        separatorMargin="md"
        classNames={{ separator: 'mantine-rotate-rtl' }}
      >
        {items}
      </Breadcrumbs>
    </>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
