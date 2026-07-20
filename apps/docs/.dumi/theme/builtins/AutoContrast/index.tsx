import { MdxCode, MdxLink, MdxParagraph, MdxTitle } from '../MdxShared/base';

export default function AutoContrast({
  component,
  withVariant = true,
}: {
  component: string;
  withVariant?: boolean;
}) {
  return (
    <>
      <MdxTitle id="auto-contrast">autoContrast</MdxTitle>
      <MdxParagraph>
        <MdxCode>{component}</MdxCode> 支持 <MdxCode>autoContrast</MdxCode> 属性和{' '}
        <MdxLink href="/docs/theming/theme-object#autocontrast">theme.autoContrast</MdxLink>。
        如果在 <MdxCode>{component}</MdxCode> 或主题上设置了{' '}
        <MdxCode>autoContrast</MdxCode>，内容颜色将自动调整，以确保与 <MdxCode>color</MdxCode>{' '}
        属性指定的值具有足够的对比度。
      </MdxParagraph>
      <MdxParagraph>
        注意 <MdxCode>autoContrast</MdxCode> 功能仅在你使用{' '}
        <MdxCode>color</MdxCode> 属性更改背景颜色时生效。
        {withVariant && (
          <>
            {' '}
            <MdxCode>autoContrast</MdxCode> 仅与 <MdxCode>filled</MdxCode> 变体一起工作。
          </>
        )}
      </MdxParagraph>
    </>
  );
}
