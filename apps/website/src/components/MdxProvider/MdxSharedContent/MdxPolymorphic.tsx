import { TypeScriptCircleIcon } from '@react-ui/dev-icons';
import { MdxInfo } from '../MdxInfo/MdxInfo';
import { MdxLink } from '../MdxLink/MdxLink';
import { MdxCodeHighlight } from '../MdxPre/MdxPre';
import { MdxTitle } from '../MdxTitle/MdxTitle';
import { MdxCode, MdxParagraph } from '../MdxTypography/MdxTypography';

interface MdxPolymorphicProps {
  component: string;
  defaultElement: string;
  changeToElement: string;
  withNext?: string;
  package?: string;
}

function getElementCode(input: MdxPolymorphicProps) {
  return `import { ${input.component} } from '${input.package || '@react-ui/ui'}';

function Demo() {
  return <${input.component} component="${input.changeToElement}" />;
}
  `;
}

function getNextLinkCode(input: MdxPolymorphicProps) {
  return `import Link from 'next/link';
import { ${input.component} } from '${input.package || '@react-ui/ui'}';

function Demo() {
  return <${input.component} component={Link} href="/" />;
}`;
}

function getInterfaceCode(input: MdxPolymorphicProps) {
  return `import type { ${input.component}Props, ElementProps } from '${
    input.package || '@react-ui/ui'
  }';

interface My${input.component}Props extends ${input.component}Props,
  ElementProps<'${input.changeToElement}', keyof ${input.component}Props> {}`;
}

export function MdxPolymorphic(props: MdxPolymorphicProps) {
  return (
    <>
      <MdxTitle id="polymorphic-component">多态组件</MdxTitle>
      <MdxParagraph>
        <MdxCode>{props.component}</MdxCode> 是一个{' '}
        <MdxLink href="/guides/polymorphic/">多态组件</MdxLink> — 其默认根元素为{' '}
        <MdxCode>{props.defaultElement}</MdxCode>，但可以通过 <MdxCode>component</MdxCode>{' '}
        属性更改为任何其他元素或组件：
      </MdxParagraph>

      <MdxCodeHighlight language="tsx" code={getElementCode(props)} />
      {props.withNext && (
        <>
          <MdxParagraph>
            你也可以在 <MdxCode>component</MdxCode> 属性中使用组件，例如 Next.js 的{' '}
            <MdxCode>Link</MdxCode>：
          </MdxParagraph>
          <MdxCodeHighlight language="tsx" code={getNextLinkCode(props)} />
        </>
      )}

      <MdxInfo icon={<TypeScriptCircleIcon size={32} />} color="#3178C6">
        <MdxParagraph>
          <span style={{ fontSize: 18, fontWeight: 500, fontFamily: 'var(--docs-font-primary)' }}>
            TypeScript 多态组件
          </span>
        </MdxParagraph>

        <MdxParagraph>
          注意多态组件的属性类型与普通组件不同 — 它们不会扩展默认元素的 HTML 元素属性。
          例如，尽管 <MdxCode>{props.defaultElement}</MdxCode> 是默认元素，
          <MdxCode>{props.component}Props</MdxCode> 并不会扩展{' '}
          <MdxCode>
            React.ComponentProps{"'<'"}div{"'>'"}
          </MdxCode>。
        </MdxParagraph>

        <MdxParagraph>
          如果你想为一个多态组件创建一个不支持多态（不支持 <MdxCode>component</MdxCode>{' '}
          属性）的包装组件，那么你的组件属性接口应该扩展 HTML 元素属性，例如：{' '}
        </MdxParagraph>

        <MdxCodeHighlight language="tsx" code={getInterfaceCode(props)} />

        <MdxParagraph>
          如果你想让组件在包装后仍然保持多态，请使用{' '}
          <MdxLink href="/guides/polymorphic/">本指南</MdxLink>中介绍的{' '}
          <MdxCode>polymorphic</MdxCode> 函数。
        </MdxParagraph>
      </MdxInfo>
    </>
  );
}
