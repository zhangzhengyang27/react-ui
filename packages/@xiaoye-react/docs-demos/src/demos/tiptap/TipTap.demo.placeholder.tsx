import Placeholder from '@tiptap/extension-placeholder';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@xiaoye-react/tiptap';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { RichTextEditor } from '@xiaoye-react/tiptap';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

function Demo() {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit, Placeholder.configure({ placeholder: '这是占位符' })],
    content: '',
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
`;

function Demo() {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    immediatelyRender: false,
    extensions: [StarterKit, Placeholder.configure({ placeholder: '这是占位符' })],
    content: '',
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Content />
    </RichTextEditor>
  );
}

export const placeholder: UIDemo = {
  type: 'code',
  component: Demo,
  code,
};
