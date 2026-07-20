import { MdxCode, MdxParagraph, MdxTitle } from '../MdxShared/base';

export default function ClearSectionMode({ component }: { component: string }) {
  return (
    <>
      <MdxTitle id="clear-section-mode">清除区域模式</MdxTitle>
      <MdxParagraph>
        <MdxCode>{component}</MdxCode> 支持 <MdxCode>clearSectionMode</MdxCode> 属性，
        用于控制当输入框内容被清除时，左右区域的行为。可选值为{' '}
        <MdxCode>"empty"</MdxCode>（清空区域内容）和 <MdxCode>"remove"</MdxCode>（移除区域）。
      </MdxParagraph>
    </>
  );
}
