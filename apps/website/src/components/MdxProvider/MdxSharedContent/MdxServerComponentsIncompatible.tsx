import { MdxTitle } from '../MdxTitle/MdxTitle';
import { MdxCode, MdxParagraph } from '../MdxTypography/MdxTypography';

interface MdxServerComponentsIncompatibleProps {
  component: string;
}

export function MdxServerComponentsIncompatible({
  component,
}: MdxServerComponentsIncompatibleProps) {
  return (
    <>
      <MdxTitle id="server-components-incompatible">不兼容服务端组件</MdxTitle>
      <MdxParagraph>
        <MdxCode>{component}</MdxCode> 与 React 服务端组件不兼容，因为它需要使用函数作为子元素。
        要使用 <MdxCode>{component}</MdxCode>，请在文件顶部添加{' '}
        <MdxCode>&quot;use client;&quot;</MdxCode>。
      </MdxParagraph>
    </>
  );
}
