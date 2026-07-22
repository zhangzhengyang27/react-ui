import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Link, RichTextEditor } from '@xiaoye-react/tiptap';
import { UIDemo } from '@xiaoye-react/demo';
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
import { RichTextEditor, Link } from '@xiaoye-react/tiptap';
import classes from './Demo.module.css';

function Demo() {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit.configure({ link: false }), Link],
    content: \`
    <h2>标题 2</h2>
    <p>带 <a href="#">链接</a> 的段落</p>
    \`,
  });

  return (
    <RichTextEditor editor={editor} classNames={classes}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export const typographyStyles: UIDemo = {
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
    <h2>标题 2</h2>
    <p>带 <a href="#">链接</a> 的段落</p>
    `,
  });

  return (
    <RichTextEditor editor={editor} classNames={classes}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export const typographyStyles: UIDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: '演示样式.module.css', code: cssCode, language: 'scss' },
    { fileName: '演示代码.tsx', code, language: 'tsx' },
  ],
};
