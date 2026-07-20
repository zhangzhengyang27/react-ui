import type { ComponentProps } from 'react';
import React, { useEffect, useMemo } from 'react';
import { AiOutlineCopy, AiOutlineCheck } from 'react-icons/ai';
import { CopyButton, Tabs } from '@react-ui/ui';
import { clsx } from 'clsx';
import toReactElement from 'jsonml-to-react-element';
import JsonML from 'jsonml.js/lib/utils';
import Prism from 'prismjs';
import 'prismjs/components/prism-jsx';

import DemoContext from '../slots/DemoContext';
import LiveCode from './LiveCode';
import styles from './CodePreview.module.css';

const LANGS = {
  tsx: 'TypeScript',
  jsx: 'JavaScript',
  style: 'CSS',
};

interface CodePreviewProps extends Omit<
  ComponentProps<typeof LiveCode>,
  'initialValue' | 'lang' | 'onChange'
> {
  sourceCode?: string;
  jsxCode?: string;
  styleCode?: string;
  entryName: string;
  onSourceChange?: (source: Record<string, string>) => void;
}

const toReactComponent = (jsonML: any[]) => {
  return toReactElement(jsonML, [
    [
      (node: any) => JsonML.isElement(node) && JsonML.getTagName(node) === 'pre',
      (node: any, index: number) => {
        const attr = JsonML.getAttributes(node);
        return (
          <pre key={index} className={`language-${attr.lang}`}>
            <code dangerouslySetInnerHTML={{ __html: attr.highlighted }} />
          </pre>
        );
      },
    ],
  ]);
};

type CodeType = 'tsx' | 'jsx' | 'style';

type Codes = Partial<Record<CodeType, string>>;

const CodePreview: React.FC<CodePreviewProps> = (props) => {
  const { sourceCode = '', jsxCode = '', styleCode = '', entryName, error, onSourceChange } = props;

  const { codeType, setCodeType } = React.use(DemoContext);

  const sourceCodes = useMemo<Codes>(() => {
    const codes: Codes = {};
    if (sourceCode) {
      codes.tsx = sourceCode.trim();
    }
    if (jsxCode) {
      codes.jsx = jsxCode.trim();
    }
    if (styleCode) {
      codes.style = styleCode.trim();
    }
    return codes;
  }, [sourceCode, jsxCode, styleCode]);

  const codeTypes = useMemo<CodeType[]>(() => {
    const types: CodeType[] = [];
    if (sourceCodes.tsx) {
      types.push('tsx');
    }
    if (sourceCodes.jsx) {
      types.push('jsx');
    }
    if (sourceCodes.style) {
      types.push('style');
    }
    return types;
  }, [sourceCodes]);

  const [highlightedCodes, setHighlightedCodes] = React.useState<Codes>({});

  useEffect(() => {
    const codes: Codes = {};
    if (sourceCodes.tsx) {
      codes.tsx = Prism.highlight(sourceCodes.tsx, Prism.languages.jsx || Prism.languages.javascript, 'jsx');
    }
    if (sourceCodes.jsx) {
      codes.jsx = Prism.highlight(sourceCodes.jsx, Prism.languages.jsx || Prism.languages.javascript, 'jsx');
    }
    if (sourceCodes.style) {
      codes.style = Prism.highlight(sourceCodes.style, Prism.languages.css, 'css');
    }
    setHighlightedCodes(codes);
  }, [sourceCodes]);

  if (!codeTypes.length) {
    return null;
  }

  if (codeTypes.length === 1) {
    return (
      <LiveCode
        key={sourceCode}
        error={error}
        lang={codeTypes[0]}
        initialValue={sourceCodes[codeTypes[0]] ?? ''}
        onChange={(code: string) => {
          onSourceChange?.({ [entryName]: code });
        }}
      />
    );
  }

  return (
    <Tabs
      className="highlight"
      value={codeType}
      onChange={setCodeType}
      keepMounted={false}
    >
      <Tabs.List position="center">
        {codeTypes.map((lang) => (
          <Tabs.Tab key={lang} value={lang}>
            {LANGS[lang]}
          </Tabs.Tab>
        ))}
      </Tabs.List>
      {codeTypes.map((lang) => (
        <Tabs.Panel key={lang} value={lang}>
          <div className={styles.code}>
            {lang === 'tsx' ? (
              <LiveCode
                key={sourceCodes[lang]}
                error={error}
                lang={lang}
                initialValue={sourceCodes[lang] ?? ''}
                onChange={(code: string) => {
                  onSourceChange?.({ [entryName]: code });
                }}
              />
            ) : (
              toReactComponent([
                'pre',
                { lang, highlighted: highlightedCodes[lang] ?? sourceCodes[lang] },
              ])
            )}
            {/* button 嵌套 button 会导致水合失败，这里需要用 div 标签，不能用 button */}
            <CopyButton value={sourceCodes[lang] ?? ''}>
              {({ copied, copy }) => (
                <div
                  className={clsx(styles.copyButton, copied && styles.copyButtonSuccess)}
                  onClick={copy}
                  role="button"
                  aria-label="Copy code"
                >
                  {copied ? <AiOutlineCheck /> : <AiOutlineCopy />}
                </div>
              )}
            </CopyButton>
          </div>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};

export default CodePreview;
