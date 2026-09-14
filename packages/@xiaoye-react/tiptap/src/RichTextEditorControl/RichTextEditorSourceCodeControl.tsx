import { useState } from 'react';
import { BoxProps, ElementProps, rem, useProps } from '@xiaoye-react/ui';
import { IconBraces } from '../icons/Icons';
import { useRichTextEditorContext } from '../RichTextEditor.context';
import { RichTextEditorControl } from './RichTextEditorControl';

export interface RichTextEditorSourceCodeControlProps extends BoxProps, ElementProps<'button'> {}

const defaultProps: Partial<RichTextEditorSourceCodeControlProps> = {};

export function RichTextEditorSourceCodeControl(props: RichTextEditorSourceCodeControlProps) {
  const { ...others } = useProps('RichTextEditorSourceCodeControl', defaultProps, props);
  const { editor, labels, variant, onSourceCodeTextSwitch } = useRichTextEditorContext();
  const [isSourceCodeModeActive, setIsSourceCodeModeActive] = useState(false);

  const handleStateChange = () => {
    if (isSourceCodeModeActive) {
      editor?.commands.setContent(editor.getText(), { emitUpdate: true });
    } else {
      // 与进入源码模式的 setContent 保持一致地 emitUpdate：
      // 不对称会让外层受控 value 与编辑器文档失同步（外层重渲染回灌旧内容覆盖源码模式）
      editor?.commands.setContent(`<textarea>${editor.getHTML()}</textarea>`, {
        emitUpdate: true,
      });
    }

    const isSourceCodeModeActiveNew = !isSourceCodeModeActive;

    setIsSourceCodeModeActive(isSourceCodeModeActiveNew);
    onSourceCodeTextSwitch?.(isSourceCodeModeActiveNew);
  };

  return (
    <RichTextEditorControl
      {...others}
      variant={variant}
      active={isSourceCodeModeActive}
      aria-label={labels.sourceCodeControlLabel}
      title={labels.sourceCodeControlLabel}
      onClick={() => handleStateChange()}
    >
      <IconBraces style={{ width: rem(16), height: rem(16) }} />
    </RichTextEditorControl>
  );
}

RichTextEditorSourceCodeControl.displayName = '@xiaoye-react/tiptap/RichTextEditorSourceCodeControl';
