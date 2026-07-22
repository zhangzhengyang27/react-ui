import React, { useMemo, useState } from 'react';
import { AiOutlineLink, AiOutlineQuestionCircle, AiOutlineRight } from 'react-icons/ai';
import { Flex, Popover, Table } from '@xiaoye-react/ui';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';

import useLocale from '../../../hooks/useLocale';
import { buildTokenRows, useTokenTableHead, type TokenData } from '../TokenTable';
import { tokenData, tokenMeta } from '../versionToken';

import classes from './index.module.css';

const compare = (token1: string, token2: string) => {
  const hasColor1 = token1.toLowerCase().includes('color');
  const hasColor2 = token2.toLowerCase().includes('color');
  if (hasColor1 && !hasColor2) {
    return -1;
  }
  if (!hasColor1 && hasColor2) {
    return 1;
  }
  return token1 < token2 ? -1 : 1;
};

const locales = {
  cn: {
    token: 'Token 名称',
    description: '描述',
    type: '类型',
    value: '默认值',
    componentToken: '组件 Token',
    globalToken: '全局 Token',
    componentComment: '这里是你的组件 token',
    globalComment: '这里是你的全局 token',
    help: '如何定制？',
    customizeTokenLink: '/theming/theme-object',
    customizeComponentTokenLink: '/theming/theme-object',
  },
  en: {
    token: 'Token Name',
    description: 'Description',
    type: 'Type',
    value: 'Default Value',
    componentToken: 'Component Token',
    globalToken: 'Global Token',
    componentComment: 'here is your component tokens',
    globalComment: 'here is your global tokens',
    help: 'How to use?',
    customizeTokenLink: '/theming/theme-object',
    customizeComponentTokenLink: '/theming/theme-object',
  },
};

interface SubTokenTableProps {
  defaultOpen?: boolean;
  title: string;
  helpText: React.ReactNode;
  helpLink: string;
  tokens: string[];
  component?: string;
  comment?: {
    componentComment?: string;
    globalComment?: string;
  };
}

const SubTokenTable: React.FC<SubTokenTableProps> = (props) => {
  const { defaultOpen = true, tokens, title, helpText, helpLink, component, comment } = props;
  const head = useTokenTableHead();

  const [open, setOpen] = useState<boolean>(defaultOpen);

  const highlightedCode = useMemo(() => {
    const code = component
      ? `<ConfigProvider
  theme={{
    components: {
      ${component}: {
        /* ${comment?.componentComment} */
      },
    },
  }}
>
  ...
</ConfigProvider>`
      : `<ConfigProvider
  theme={{
    token: {
      /* ${comment?.globalComment} */
    },
  }}
>
  ...
</ConfigProvider>`;
    return Prism.highlight(code, Prism.languages.jsx || Prism.languages.javascript, 'jsx');
  }, [component, comment]);

  if (!tokens.length) {
    return null;
  }

  const data = tokens
    .sort(component ? undefined : compare)
    .map<TokenData | null>((name) => {
      const meta = component
        ? tokenMeta.components[component].find((item) => item.token === name)
        : tokenMeta.global[name];

      if (!meta) {
        return null;
      }

      return {
        name,
        desc: meta.desc,
        type: meta.type,
        value: component ? tokenData[component]?.component[name] : undefined,
      };
    })
    .filter((item): item is TokenData => item !== null && item !== undefined);

  const body = buildTokenRows(data);

  return (
    <>
      <div className={classes.tableTitle} onClick={() => setOpen((prev) => !prev)}>
        <AiOutlineRight
          className={classes.arrowIcon}
          style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }}
        />
        <Flex className={classes.tokenTitle} gap="sm" justify="flex-start" align="center">
          {title}
          <Popover position="bottom" width={400}>
            <Popover.Target>
              <span className={classes.help}>
                <AiOutlineQuestionCircle style={{ marginInlineEnd: 4 }} />
                {helpText}
              </span>
            </Popover.Target>
            <Popover.Dropdown>
              <pre dir="ltr" style={{ fontSize: 12 }}>
                <code
                  dir="ltr"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              </pre>
              <a href={helpLink} target="_blank" rel="noopener noreferrer">
                <AiOutlineLink style={{ marginInlineEnd: 4 }} />
                {helpText}
              </a>
            </Popover.Dropdown>
          </Popover>
        </Flex>
      </div>
      {open && body.length > 0 && (
        <Table
          data={{ head, body }}
          withTableBorder
          withColumnBorders
          className={classes.table}
        />
      )}
    </>
  );
};

export interface ComponentTokenTableProps {
  component: string;
}

const ComponentTokenTable: React.FC<ComponentTokenTableProps> = ({ component }) => {
  const [locale] = useLocale(locales);

  const memoizedComment = useMemo<SubTokenTableProps['comment']>(() => {
    const { componentComment, globalComment } = locale;
    return { componentComment, globalComment };
  }, [locale]);

  const mergedGlobalTokens = useMemo(() => {
    const globalTokenSet = new Set<string>();
    component.split(',').forEach((comp) => {
      const { global: globalTokens = [] } = tokenData[comp] || {};
      globalTokens.forEach((token) => {
        globalTokenSet.add(token);
      });
    });
    return Array.from<string>(globalTokenSet);
  }, [component]);

  return (
    <>
      {tokenMeta.components[component]?.length > 0 && (
        <SubTokenTable
          defaultOpen
          title={locale.componentToken}
          helpText={locale.help}
          helpLink={locale.customizeTokenLink}
          tokens={tokenMeta.components[component].map((item) => item.token)}
          component={component}
          comment={memoizedComment}
        />
      )}
      {mergedGlobalTokens.length > 0 && (
        <SubTokenTable
          defaultOpen
          title={locale.globalToken}
          helpText={locale.help}
          helpLink={locale.customizeComponentTokenLink}
          tokens={mergedGlobalTokens}
          comment={memoizedComment}
        />
      )}
    </>
  );
};

export default React.memo(ComponentTokenTable);
