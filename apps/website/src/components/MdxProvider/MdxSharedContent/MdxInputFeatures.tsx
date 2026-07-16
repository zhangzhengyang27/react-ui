import { MdxLink } from '../MdxLink/MdxLink';
import { MdxCode, MdxParagraph } from '../MdxTypography/MdxTypography';

interface MdxInputFeaturesProps {
  component: string;
  element: string;
}

export function MdxInputFeatures({ component, element }: MdxInputFeaturesProps) {
  return (
    <MdxParagraph>
      <MdxCode>{component}</MdxCode> 组件支持 <MdxLink href="/core/input">输入</MdxLink>{' '}
      和 <MdxLink href="/core/input">输入包装器</MdxLink> 组件的所有特性，以及所有{' '}
      <MdxCode>{element}</MdxCode> 元素属性。<MdxCode>{component}</MdxCode> 文档并未列出该组件支持的所有特性 — 请查看{' '}
      <MdxLink href="/core/input">输入</MdxLink> 文档以了解所有可用特性。
    </MdxParagraph>
  );
}
