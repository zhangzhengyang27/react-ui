import { Anchor, Breadcrumbs } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { Breadcrumbs, Anchor } from '@xiaoye-react/ui';

const items = [
  { title: 'ReactUI', href: '#' },
  { title: 'ReactUI 钩子', href: '#' },
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
  { title: 'ReactUI', href: '#' },
  { title: 'ReactUI 钩子', href: '#' },
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
        classNames={{ separator: 'ui-rotate-rtl' }}
      >
        {items}
      </Breadcrumbs>
    </>
  );
}

export const usage: UIDemo = {
  type: 'code',
  code,
  component: Demo,
};
