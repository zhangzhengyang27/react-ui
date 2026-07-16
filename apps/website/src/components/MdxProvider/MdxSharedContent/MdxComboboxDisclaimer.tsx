import { MdxLink } from '../MdxLink/MdxLink';
import { MdxTitle } from '../MdxTitle/MdxTitle';
import { MdxCode, MdxParagraph } from '../MdxTypography/MdxTypography';

interface MdxComboboxDisclaimerProps {
  component: string;
}

export function MdxComboboxDisclaimer({ component }: MdxComboboxDisclaimerProps) {
  return (
    <>
      <MdxTitle id="combobox">基于 Combobox 构建</MdxTitle>
      <MdxParagraph>
        <MdxCode>{component}</MdxCode> 是一个基于{' '}
        <MdxLink href="/core/combobox">Combobox</MdxLink> 组件构建的<b>有主见</b>组件。
        它仅提供有限的功能以覆盖基本用例。如果你需要更高级的功能，可以使用{' '}
        <MdxLink href="/core/combobox">Combobox</MdxLink> 构建自己的组件。你可以在{' '}
        <MdxLink href="/combobox/?e=BasicSelect">示例页面</MdxLink>找到自定义{' '}
        {component.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase()} 组件的示例。
      </MdxParagraph>
    </>
  );
}
