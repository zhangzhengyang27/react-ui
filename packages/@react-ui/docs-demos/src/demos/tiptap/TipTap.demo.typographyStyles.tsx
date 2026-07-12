import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Link, RichTextEditor } from '@react-ui/tiptap';
import { MantineDemo } from '@react-ui/demo';
import classes from './TipTap.demo.typographyStyles.module.css';

const cssCode = `.root {
  h2 {
    color: light-dark(var(--ui-color-gray-6), var(--ui-color-dark-2));
    font-size: var(--ui-font-size-xl);
  }

  p {
    font-size: var(--ui-font-size-lg);
  }

  a {
    color: var(--ui-color-red-6);
  }
}`;

const code = `
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor, Link } from '@react-ui/tiptap';
import classes from './Demo.module.css';

function Demo() {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit.configure({ link: false }), Link],
    content: \`
    <h2>Heading 2</h2>
    <p>Paragraph with <a href="https://mantine.dev">link</a></p>
    \`,
  });

  return (
    <RichTextEditor editor={editor} classNames={classes}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export const typographyStyles: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
`;

function Demo() {
  const editor = useEditor({
    immediatelyRender: false,
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit.configure({ link: false }), Link],
    content: `
    <h2>Heading 2</h2>
    <p>Paragraph with <a href="https://mantine.dev">link</a></p>
    `,
  });

  return (
    <RichTextEditor editor={editor} classNames={classes}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export const typographyStyles: MantineDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
    { fileName: 'Demo.tsx', code, language: 'tsx' },
  ],
};
