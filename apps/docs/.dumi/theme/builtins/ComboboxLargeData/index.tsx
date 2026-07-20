import { MdxCode, MdxParagraph, MdxTitle } from '../MdxShared/base';

export default function ComboboxLargeData({ component }: { component: string }) {
  return (
    <>
      <MdxTitle id="large-data">大数据量</MdxTitle>
      <MdxParagraph>
        当 <MdxCode>{component}</MdxCode> 的数据量较大时（例如超过 1000 项），
        建议使用虚拟滚动来提升性能。你可以通过设置{' '}
        <MdxCode>scrollAreaProps</MdxCode> 属性来启用虚拟滚动。
      </MdxParagraph>
    </>
  );
}
