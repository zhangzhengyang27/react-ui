import { Code, Title } from '@react-ui/ui';
import { MdxLink, MdxParagraph } from '@/components/MdxProvider';
import { StylesApiTable } from './StylesApiTable';
import classes from './StylesApiTable.module.css';

interface StylesApiTablesListProps {
  components: string[];
  componentPrefix?: string;
}

export function StylesApiTablesList({ components, componentPrefix }: StylesApiTablesListProps) {
  const tables = components.map((component) => (
    <div className={classes.group} key={component}>
      <StylesApiTable component={component} componentPrefix={componentPrefix} />
    </div>
  ));

  return (
    <>
      <div className={classes.groupsHeader}>
        <Title order={2} className={classes.mainTitle}>
          样式 API
        </Title>

        <MdxParagraph style={{ marginTop: 0 }}>
          <Code>{components[0]}</Code> 组件支持{' '}
          <MdxLink href="/styles/styles-api">样式 API</MdxLink>。通过样式 API，你可以自定义任意内部元素的样式。阅读{' '}
          <MdxLink href="/styles/styles-api">文档</MdxLink>了解如何使用 CSS Modules、CSS 变量和内联样式来完全控制组件样式。
        </MdxParagraph>
      </div>
      {tables}
    </>
  );
}
