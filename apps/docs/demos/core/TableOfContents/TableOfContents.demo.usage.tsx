import { TableOfContents, TableOfContentsProps } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { TableOfContents } from '@xiaoye-react/ui';


function Demo() {
  return (
    <TableOfContents
      {{props}}
      scrollSpyOptions={{
        selector: '#mdx :is(h1, h2, h3, h4, h5, h6)',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}
`;

function Wrapper(props: TableOfContentsProps) {
  return (
    <TableOfContents
      {...props}
      scrollSpyOptions={{
        selector: '#mdx :is(h1, h2, h3, h4, h5, h6)',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}

export const usage: UIDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: [
    {
      type: 'segmented',
      prop: 'variant',
      initialValue: 'filled',
      data: ['filled', 'light', 'none'],
      libraryValue: null,
    },
    { type: 'color', prop: 'color', initialValue: 'blue', libraryValue: null },
    { type: 'size', prop: 'size', initialValue: 'md', libraryValue: '__' },
    { type: 'size', prop: 'radius', initialValue: 'md', libraryValue: '__' },
  ],
};
