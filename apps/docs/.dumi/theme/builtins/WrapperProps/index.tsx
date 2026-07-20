import { MdxCodeHighlight, MdxCode, MdxLi, MdxParagraph, MdxTitle, MdxUl } from '../MdxShared/base';

export default function WrapperProps({ component }: { component: string }) {
  const getCode = `import { ${component} } from '@react-ui/ui';

function Demo() {
  return <${component} wrapperProps={{ 'data-testid': 'wrapper' }} data-testid="input" />;
}
`;

  return (
    <>
      <MdxTitle id="browser-support">向根元素添加属性</MdxTitle>
      <MdxParagraph>
        传递给组件的所有属性都会转发到输入元素。如果需要向根元素添加属性，请使用{' '}
        <MdxCode>wrapperProps</MdxCode>。在以下示例中：
      </MdxParagraph>
      <MdxUl>
        <MdxLi>
          <MdxCode>data-testid="wrapper"</MdxCode> 被添加到根元素
        </MdxLi>
        <MdxLi>
          <MdxCode>data-testid="input"</MdxCode> 被添加到输入元素
        </MdxLi>
      </MdxUl>
      <MdxCodeHighlight code={getCode} language="tsx" />
    </>
  );
}
