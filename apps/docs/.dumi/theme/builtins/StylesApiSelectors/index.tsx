import { MdxCode, MdxLink, MdxParagraph, MdxTitle } from '../MdxShared/base';

export default function StylesApiSelectors({ component }: { component: string }) {
  return (
    <>
      <MdxTitle id="styles-api">样式 API</MdxTitle>
      <MdxParagraph>
        <MdxCode>{component}</MdxCode> 支持{' '}
        <MdxLink href="/docs/styles/styles-api">样式 API</MdxLink>；你可以使用{' '}
        <MdxCode>classNames</MdxCode> 属性为组件的任意内部元素添加样式。更多详情请参考{' '}
        <MdxLink href="/docs/styles/styles-api">样式 API</MdxLink> 文档。
      </MdxParagraph>
    </>
  );
}
