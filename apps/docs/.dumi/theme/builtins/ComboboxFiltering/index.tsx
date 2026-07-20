import { MdxCode, MdxParagraph, MdxTitle } from '../MdxShared/base';

export default function ComboboxFiltering({ component }: { component: string }) {
  return (
    <>
      <MdxTitle id="filtering">过滤</MdxTitle>
      <MdxParagraph>
        <MdxCode>{component}</MdxCode> 默认在用户输入时过滤数据。你可以通过{' '}
        <MdxCode>filter</MdxCode> 属性自定义过滤函数，或将其设置为{' '}
        <MdxCode>null</MdxCode> 来禁用过滤。
      </MdxParagraph>
    </>
  );
}
