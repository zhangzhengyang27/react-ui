import { MdxCode, MdxLink, MdxParagraph, MdxTitle } from '../MdxShared/base';

export default function Gradient({ component }: { component: string }) {
  return (
    <>
      <MdxTitle id="gradient-variant">渐变变体</MdxTitle>
      <MdxParagraph>
        当 <MdxCode>variant</MdxCode> 属性设置为 <MdxCode>gradient</MdxCode> 时，你可以通过{' '}
        <MdxCode>gradient</MdxCode> 属性控制渐变，它接受一个包含 <MdxCode>from</MdxCode>、
        <MdxCode>to</MdxCode> 和 <MdxCode>deg</MdxCode> 属性的对象。如果未设置{' '}
        <MdxCode>gradient</MdxCode> 属性，<MdxCode>{component}</MdxCode> 将使用可在{' '}
        <MdxLink href="/docs/theming/theme-object">主题对象</MdxLink>中配置的{' '}
        <MdxCode>theme.defaultGradient</MdxCode>。当 <MdxCode>variant</MdxCode> 不是{' '}
        <MdxCode>gradient</MdxCode> 时，<MdxCode>gradient</MdxCode> 属性将被忽略。
      </MdxParagraph>
      <MdxParagraph>
        注意 <MdxCode>variant="gradient"</MdxCode> 仅支持两种颜色的线性渐变。
        如果需要更复杂的渐变，请使用{' '}
        <MdxLink href="/docs/styles/styles-api">样式 API</MdxLink>来修改{' '}
        <MdxCode>{component}</MdxCode> 的样式。
      </MdxParagraph>
    </>
  );
}
