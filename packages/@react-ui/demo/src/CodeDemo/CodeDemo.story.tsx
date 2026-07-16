import { CodeHighlightTabsCode } from '@react-ui/code-highlight';
import { CodeDemo } from './CodeDemo';

export default { title: 'DS/CodeDemo' };

const reactCode = `
import { UILogoRounded } from './UILogoRounded';
import { UILogoText } from './UILogoText';
import { LogoProps } from './use-react-ui-logo-colors';

export interface UILogoProps extends LogoProps {
  type?: 'mark' | 'full';
}

export function UILogo({ type, ...others }: UILogoProps) {
  if (type === 'mark') {
    return <UILogoRounded {...others} />;
  }

  return <UILogoText {...others} />;
}
`;

const cssCode = `.code {
  display: inline-block;
  padding: rem(2px) rem(4px);
  font-size: rem(13px);
  border-radius: var(--ui-radius-xs);
  line-height: var(--ui-line-height);
  font-family: var(--ui-font-family-monospace);
}

.pre {
  display: block;
  padding: var(--ui-spacing-md);
  line-height: 1.7;
  margin: 0;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.copy {
  background-color: transparent;
  opacity: 0.8;
  margin: 0;
  margin-top: rem(7px);
  margin-right: rem(7px);

  &:hover {
    opacity: 1;
  }

  @media (max-width: 40em) {
    display: none;
  }
}`;

const code: CodeHighlightTabsCode[] = [
  { language: 'tsx', code: reactCode, fileName: '演示代码.tsx' },
  { language: 'scss', code: cssCode, fileName: '演示样式.module.css' },
];

function DemoComponent() {
  return <div style={{ background: 'pink' }}>Hello</div>;
}

export function Usage() {
  return (
    <div style={{ padding: 40 }}>
      <CodeDemo code={code} centered maxWidth={400} defaultExpanded={false}>
        <DemoComponent />
      </CodeDemo>
    </div>
  );
}
