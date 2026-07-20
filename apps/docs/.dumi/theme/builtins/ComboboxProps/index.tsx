import { MdxCode, MdxParagraph, MdxTitle } from '../MdxShared/base';

export default function ComboboxProps({ component }: { component: string }) {
  return (
    <>
      <MdxTitle id="combobox-props">Combobox 属性</MdxTitle>
      <MdxParagraph>
        <MdxCode>{component}</MdxCode> 组件支持所有 Combobox 属性，包括{' '}
        <MdxCode>value</MdxCode>、<MdxCode>onChange</MdxCode>、<MdxCode>data</MdxCode>、
        <MdxCode>searchable</MdxCode>、<MdxCode>clearable</MdxCode> 等。
      </MdxParagraph>
    </>
  );
}
