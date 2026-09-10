import { TextBIcon } from '@phosphor-icons/react/dist/csr/TextB'
import { TextItalicIcon } from '@phosphor-icons/react/dist/csr/TextItalic'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { RichTextEditor } from '@xiaoye-react/tiptap'
import { UIDemo } from '@xiaoye-react/demo'

const code = `
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { RichTextEditor } from '@xiaoye-react/tiptap';
import { TextBIcon } from '@phosphor-icons/react/dist/csr/TextB';
import { TextItalicIcon } from '@phosphor-icons/react/dist/csr/TextItalic';
const BoldIcon = () => <TextBIcon size={16} />;
const ItalicIcon = () => <TextItalicIcon size={16} />;

function Demo() {
  const editor = useEditor({
    shouldRerenderOnTransaction: true,
    extensions: [StarterKit],
    content: '<p>使用 icon 属性自定义图标</p>',
  });

  return (
    <RichTextEditor editor={editor}>
      <RichTextEditor.Toolbar>
        <RichTextEditor.ControlsGroup>
          <RichTextEditor.Bold icon={BoldIcon} />
          <RichTextEditor.Italic icon={ItalicIcon} />
        </RichTextEditor.ControlsGroup>
      </RichTextEditor.Toolbar>

      <RichTextEditor.Content />
    </RichTextEditor>
  );
}
`

const BoldIcon = () => <TextBIcon size={16} />
const ItalicIcon = () => <TextItalicIcon size={16} />

function Demo() {
    const editor = useEditor({
        shouldRerenderOnTransaction: true,
        immediatelyRender: false,
        extensions: [StarterKit],
        content: '<p>使用 icon 属性自定义图标</p>'
    })

    return (
        <RichTextEditor editor={editor}>
            <RichTextEditor.Toolbar>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold icon={BoldIcon} />
                    <RichTextEditor.Italic icon={ItalicIcon} />
                </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <RichTextEditor.Content />
        </RichTextEditor>
    )
}

export const icons: UIDemo = {
    type: 'code',
    component: Demo,
    code
}
