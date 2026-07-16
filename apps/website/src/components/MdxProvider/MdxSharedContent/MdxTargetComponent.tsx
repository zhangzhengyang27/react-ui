import { MdxCodeHighlight } from '../MdxPre/MdxPre';
import { MdxTitle } from '../MdxTitle/MdxTitle';
import { MdxCode, MdxParagraph } from '../MdxTypography/MdxTypography';

const getTargetCode = (component: string) => `import { ${component}, Button } from '@react-ui/ui';

function Demo() {
  return (
    <>
      <${component}.Target>
        <button>原生按钮 – 正常</button>
      </${component}.Target>

      {/* 正常 */}
      <${component}.Target>
        <Button>ReactUI 组件 – 正常</Button>
      </${component}.Target>

      {/* 字符串，不正常 – 会抛出错误 */}
      <${component}.Target>原始字符串</${component}.Target>

      {/* 数字，不正常 – 会抛出错误 */}
      <${component}.Target>{2}</${component}.Target>

      {/* 片段，不正常 – 会抛出错误 */}
      <${component}.Target>
        <>片段，不正常，会抛出错误</>
      </${component}.Target>

      {/* 多个节点，不正常 – 会抛出错误 */}
      <${component}.Target>
        <div>多于一个节点</div>
        <div>不正常，会抛出错误</div>
      </${component}.Target>
    </>
  );
}`;

const getNoRefCode = (component: string) => `
// 以下代码无法正常工作
import { ${component} } from '@react-ui/ui';

// ❌ ref 未转发到根元素
function MyComponent() {
  return <div>我的组件</div>;
}

// 这段代码无法正常工作 – MyComponent 不支持 ref
function Demo() {
  return (
    <${component}>
      <${component}.Target>
        <MyComponent />
      </${component}.Target>
    </${component}>
  );
}`;

const getWithRefCode = (component: string) => `
// 以下代码可以正常工作
import { ${component} } from '@react-ui/ui';

// ✅ ref 已转发到根元素
function MyComponent({ ref, ...others }: React.ComponentProps<'div'>) {
  return <div ref={ref} {...others}>我的组件</div>;
}

// 正常工作 – ref 已转发
function Demo() {
  return (
    <${component}>
      <${component}.Target>
        <MyComponent />
      </${component}.Target>
    </${component}>
  );
}
`;

interface MdxTargetComponentProps {
  component: string;
}

export function MdxTargetComponent({ component }: MdxTargetComponentProps) {
  return (
    <>
      <MdxTitle id="target-children">{`${component}.Target 子元素`}</MdxTitle>
      <MdxParagraph>
        <MdxCode>{component}.Target</MdxCode> 要求只有一个元素或组件作为子元素 —
        字符串、片段、数字以及多个元素/组件均不受支持，<b>会抛出错误</b>。
        自定义组件必须提供获取根元素引用的属性；所有 ReactUI 组件均默认支持 ref。
      </MdxParagraph>

      <MdxCodeHighlight code={getTargetCode(component)} language="tsx" />

      <MdxTitle id="required-ref-prop">必需的 ref 属性</MdxTitle>
      <MdxParagraph>
        渲染在 {component}.Target 内的自定义组件必须支持{' '}
        <MdxCode>ref</MdxCode> 属性：
      </MdxParagraph>

      <MdxCodeHighlight code={getNoRefCode(component)} language="tsx" />

      <MdxParagraph>
        将 <MdxCode>ref</MdxCode> 传递给根元素：
      </MdxParagraph>

      <MdxCodeHighlight code={getWithRefCode(component)} language="tsx" />
    </>
  );
}
