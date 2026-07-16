import { TableOfContents } from '@react-ui/ui';
import { UIDemo } from '@react-ui/demo';
import classes from './TableOfContents.demo.styles.module.css';

const cssCode = `.control {
  transition: transform 100ms ease;

  &[data-active] {
    background-color: var(--ui-color-lime-4);
    color: var(--ui-color-black);
    transform: scale(1.1);
  }
}`;

const code = `
import { TableOfContents } from '@react-ui/ui';
import classes from './Demo.module.css';

function Demo() {
  return (
    <TableOfContents
      size="sm"
      variant="none"
      classNames={classes}
      minDepthToOffset={0}
      depthOffset={40}
      scrollSpyOptions={{
        selector: 'h1, h2, h3, h4, h5, h6',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}
`;

function Demo() {
  return (
    <TableOfContents
      size="sm"
      variant="none"
      classNames={classes}
      minDepthToOffset={0}
      depthOffset={40}
      scrollSpyOptions={{
        selector: 'h1, h2, h3, h4, h5, h6',
      }}
      getControlProps={({ data }) => ({
        onClick: () => data.getNode().scrollIntoView(),
        children: data.value,
      })}
    />
  );
}

export const styles: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示代码.tsx', code, language: 'tsx' },
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
  ],
  maxWidth: 340,
  centered: true,
};
