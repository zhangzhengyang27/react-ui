import { MdxTitle } from '../MdxTitle/MdxTitle';
import { MdxCode, MdxLi, MdxParagraph, MdxUl } from '../MdxTypography/MdxTypography';

export function MdxClearSectionMode() {
  return (
    <>
      <MdxTitle id="clear-section-mode">清除区域模式</MdxTitle>
      <MdxParagraph>
        <MdxCode>clearSectionMode</MdxCode> 属性决定清除按钮和{' '}
        <MdxCode>rightSection</MdxCode> 的渲染方式：
      </MdxParagraph>
      <MdxUl>
        <MdxLi>
          <MdxCode>'both'</MdxCode>（默认）— 同时渲染清除按钮和{' '}
          <MdxCode>rightSection</MdxCode>
        </MdxLi>
        <MdxLi>
          <MdxCode>'rightSection'</MdxCode> — 仅渲染用户提供的{' '}
          <MdxCode>rightSection</MdxCode>，忽略清除按钮
        </MdxLi>
        <MdxLi>
          <MdxCode>'clear'</MdxCode> — 仅渲染清除按钮，忽略{' '}
          <MdxCode>rightSection</MdxCode>
        </MdxLi>
      </MdxUl>
    </>
  );
}
