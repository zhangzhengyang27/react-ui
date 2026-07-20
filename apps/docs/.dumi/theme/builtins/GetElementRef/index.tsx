import { MdxCodeHighlight, MdxTitle } from '../MdxShared/base';

interface GetElementRefProps {
  component: string;
  refType: string;
  package?: string;
}

const commonRefs: Record<string, string> = {
  div: 'HTMLDivElement',
  button: 'HTMLButtonElement',
  input: 'HTMLInputElement',
  textarea: 'HTMLTextAreaElement',
  select: 'HTMLSelectElement',
  a: 'HTMLAnchorElement',
};

function getRefCode(input: GetElementRefProps) {
  const refType = input.refType in commonRefs ? commonRefs[input.refType] : input.refType;
  return `import { useRef } from 'react';
import { ${input.component} } from '${input.package || '@react-ui/ui'}';

function Demo() {
  const ref = useRef<${refType}>(null);
  return <${input.component} ref={ref} />;
}
  `;
}

export default function GetElementRef(props: GetElementRefProps) {
  return (
    <>
      <MdxTitle id="get-element-ref">获取元素引用</MdxTitle>
      <MdxCodeHighlight language="tsx" code={getRefCode(props)} />
    </>
  );
}
