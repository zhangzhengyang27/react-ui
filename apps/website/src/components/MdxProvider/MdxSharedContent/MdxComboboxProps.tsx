import { MdxLink } from '../MdxLink/MdxLink';
import { MdxCodeHighlight } from '../MdxPre/MdxPre';
import { MdxTitle } from '../MdxTitle/MdxTitle';
import { MdxCode, MdxParagraph } from '../MdxTypography/MdxTypography';

const getPortalCode = (component: string) => `
import { ${component} } from '@react-ui/ui';

function Demo() {
  return <${component} comboboxProps={{ withinPortal: false }} data={[]} />;
}
`;

const getZIndexCode = (component: string) => `
import { ${component} } from '@react-ui/ui';

function Demo() {
  return <${component} comboboxProps={{ zIndex: 1000 }} data={[]} />;
}
`;

interface MdxComboboxPropsProps {
  component: string;
}

export function MdxComboboxProps({ component }: MdxComboboxPropsProps) {
  return (
    <>
      <MdxTitle id="combobox-props">Combobox 属性</MdxTitle>
      <MdxParagraph>
        你可以使用 <MdxCode>comboboxProps</MdxCode> 覆盖{' '}
        <MdxLink href="/core/combobox">Combobox</MdxLink> 的属性。
        这在需要更改 <MdxCode>{component}</MdxCode> 未暴露的某些属性时非常有用，例如{' '}
        <MdxCode>withinPortal</MdxCode>：
      </MdxParagraph>

      <MdxCodeHighlight language="tsx" code={getPortalCode(component)} />

      <MdxTitle id="change-z-index">修改下拉层 z-index</MdxTitle>

      <MdxCodeHighlight language="tsx" code={getZIndexCode(component)} />
    </>
  );
}
