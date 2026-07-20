import { MdxCode, MdxLink, MdxParagraph } from '../MdxShared/base';

export default function InputAccessibility({ component }: { component: string }) {
  return (
    <MdxParagraph>
      <MdxCode>{component}</MdxCode> 的所有标签和描述特性均遵循 WAI-ARIA 规范。相关属性包括{' '}
      <MdxCode>label</MdxCode>、<MdxCode>description</MdxCode>、<MdxCode>error</MdxCode>、
      <MdxCode>withAsterisk</MdxCode> 等，这些属性会自动设置相应的 ARIA 属性。更多详情请参考{' '}
      <MdxLink href="/components/input">输入</MdxLink> 文档。
    </MdxParagraph>
  );
}
