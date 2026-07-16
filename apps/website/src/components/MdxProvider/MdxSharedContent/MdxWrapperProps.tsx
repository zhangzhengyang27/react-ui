import { MdxCodeHighlight } from '../MdxPre/MdxPre';
import { MdxTitle } from '../MdxTitle/MdxTitle';
import { MdxCode, MdxLi, MdxParagraph, MdxUl } from '../MdxTypography/MdxTypography';

const getCode = (component: string) => `
import { ${component} } from '@react-ui/ui';

function Demo() {
  return <${component} wrapperProps={{ 'data-testid': 'wrapper' }} data-testid="input" />;
}
`;

interface MdxWrapperPropsProps {
  component: string;
}

export function MdxWrapperProps({ component }: MdxWrapperPropsProps) {
  return (
    <>
      <MdxTitle id="browser-support">向根元素添加属性</MdxTitle>
      <MdxParagraph>
        传递给组件的所有属性都会转发到输入元素。如果需要向根元素添加属性，请使用{' '}
        <MdxCode>wrapperProps</MdxCode>。在以下示例中：
      </MdxParagraph>

      <MdxUl>
        <MdxLi>
          <MdxCode>data-testid=&quot;wrapper&quot;</MdxCode> 被添加到根元素
        </MdxLi>
        <MdxLi>
          <MdxCode>data-testid=&quot;input&quot;</MdxCode> 被添加到输入元素
        </MdxLi>
      </MdxUl>

      <MdxCodeHighlight code={getCode(component)} language="tsx" />
    </>
  );
}
