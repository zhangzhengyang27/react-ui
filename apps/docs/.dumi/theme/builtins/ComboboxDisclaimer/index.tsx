import { MdxCode, MdxParagraph } from '../MdxShared/base';

export default function ComboboxDisclaimer({ component }: { component: string }) {
  return (
    <MdxParagraph>
      <strong>注意：</strong> <MdxCode>{component}</MdxCode> 是一个无样式（headless）组件 —
      它不渲染任何输入框。你需要将其与 <MdxCode>TextInput</MdxCode>、<MdxCode>Input</MdxCode>{' '}
      或其他输入组件一起使用。请查看以下示例了解如何组合使用。
    </MdxParagraph>
  );
}
