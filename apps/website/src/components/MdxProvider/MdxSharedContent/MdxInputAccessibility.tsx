import { MdxCodeHighlight } from '../MdxPre/MdxPre';
import { MdxTitle } from '../MdxTitle/MdxTitle';
import { MdxCode, MdxParagraph } from '../MdxTypography/MdxTypography';

interface MdxInputAccessibilityProps {
  component: string;
  package?: string;
}

const getInaccessibleCode = (component: string, packageName: string) => `
import { ${component} } from '${packageName}';

// 不可访问的输入 — 屏幕阅读器无法正确朗读
function Demo() {
  return <${component} />;
}
`;

const getAriaLabelCode = (component: string, packageName: string) => `
import { ${component} } from '${packageName}';

// 可访问的输入 — 具有 aria-label
function Demo() {
  return <${component} aria-label="我的输入" />;
}
`;

const getLabelCode = (component: string, packageName: string) => `
import { ${component} } from '${packageName}';

// 可访问的输入 — 具有关联的 label 元素
function Demo() {
  return <${component} label="我的输入" />;
}
`;

export function MdxInputAccessibility(props: MdxInputAccessibilityProps) {
  const packageName = props.package || '@react-ui/ui';
  return (
    <>
      <MdxTitle id="accessibility">可访问性</MdxTitle>
      <MdxParagraph>
        如果 <MdxCode>{props.component}</MdxCode> 在没有 <MdxCode>label</MdxCode> 属性的情况下使用，
        屏幕阅读器将无法正确朗读它：
      </MdxParagraph>
      <MdxCodeHighlight code={getInaccessibleCode(props.component, packageName)} language="tsx" />

      <MdxParagraph>
        设置 <MdxCode>aria-label</MdxCode> 可使输入框可访问。此时标签不会显示，
        但屏幕阅读器会朗读它：
      </MdxParagraph>
      <MdxCodeHighlight code={getAriaLabelCode(props.component, packageName)} language="tsx" />

      <MdxParagraph>
        如果设置了 <MdxCode>label</MdxCode> 属性，输入框即可访问，
        无需再设置 <MdxCode>aria-label</MdxCode>：
      </MdxParagraph>
      <MdxCodeHighlight code={getLabelCode(props.component, packageName)} language="tsx" />
    </>
  );
}
