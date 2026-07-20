import { MdxCode, MdxLi, MdxParagraph, MdxTitle, MdxUl } from '../MdxShared/base';

export default function InputSections({ component }: { component: string }) {
  return (
    <>
      <MdxTitle id="left-and-right-sections">左侧与右侧区域</MdxTitle>
      <MdxParagraph>
        <MdxCode>{component}</MdxCode> 支持 <MdxCode>leftSection</MdxCode> 和{' '}
        <MdxCode>rightSection</MdxCode> 属性。这些区域在输入框包装器内使用绝对定位渲染。
        你可以用它们来显示图标、输入控件或其他任何元素。
      </MdxParagraph>
      <MdxParagraph>可以使用以下属性控制区域的样式和内容：</MdxParagraph>
      <MdxUl>
        <MdxLi>
          <MdxCode>rightSection</MdxCode> / <MdxCode>leftSection</MdxCode> — 在输入框对应一侧渲染的 React 节点
        </MdxLi>
        <MdxLi>
          <MdxCode>rightSectionWidth</MdxCode>/<MdxCode>leftSectionWidth</MdxCode> — 控制右侧区域的宽度以及输入框对应一侧的内边距。默认由组件的 <MdxCode>size</MdxCode> 属性控制。
        </MdxLi>
        <MdxLi>
          <MdxCode>rightSectionPointerEvents</MdxCode>/<MdxCode>leftSectionPointerEvents</MdxCode> —
          控制区域的 <MdxCode>pointer-events</MdxCode> 属性。如果要渲染非交互元素，请将其设置为 <MdxCode>none</MdxCode>，使点击事件透传到输入框。
        </MdxLi>
      </MdxUl>
    </>
  );
}
