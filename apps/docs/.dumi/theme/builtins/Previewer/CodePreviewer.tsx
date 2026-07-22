import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlineUp } from 'react-icons/ai';
import { Badge } from '@xiaoye-react/ui';
import { clsx } from 'clsx';
import { FormattedMessage, useLiveDemo, useSiteData } from 'dumi';

import type { AntdPreviewerProps } from '.';
import BrowserFrame from '../../common/BrowserFrame';
import ClientOnly from '../../common/ClientOnly';
import CodePreview from '../../common/CodePreview';
import SiteContext from '../../slots/SiteContext';
import Actions from './Actions';
import { CodeExpandProvider, RealCode, useCodeExpand } from './CodeExpandContext';
import classes from './CodePreviewer.module.css';

interface CodePreviewerInnerProps extends AntdPreviewerProps {
  codeExpand: boolean;
  setCodeExpand: (value: boolean) => void;
}

function normalizeRealCodeToSourceCode(realCode: RealCode | null): string | undefined {
  if (!realCode) {
    return undefined;
  }
  if (typeof realCode === 'string') {
    return realCode;
  }
  if (Array.isArray(realCode)) {
    return realCode
      .map((item) => `// ${item.fileName || '示例.tsx'}\n${item.code}`)
      .join('\n\n');
  }
  return undefined;
}

/**
 * 内部渲染组件，需要被 CodeExpandProvider 包裹，
 * 以便通过 useCodeExpand 判断 demo 内部是否提供了真实代码。
 */
const CodePreviewerInner: React.FC<CodePreviewerInnerProps> = (props) => {
  const {
    asset,
    expand,
    iframe,
    demoUrl,
    children,
    originDebug,
    jsx = '',
    style,
    compact,
    background,
    version,
    simplify,
    clientOnly,
    codeExpand,
    setCodeExpand,
  } = props;
  const { pkg } = useSiteData();
  const codeExpandCtx = useCodeExpand();

  const entryName = asset.entry ?? 'index.tsx';
  const entryCode = asset.dependencies[entryName]?.value ?? '';

  const demoContainerRef = useRef<HTMLElement>(null);
  const {
    node: liveDemoNode,
    error: liveDemoError,
    setSource: setLiveDemoSource,
  } = useLiveDemo(asset.id, {
    iframe: Boolean(iframe),
    containerRef: demoContainerRef as React.RefObject<HTMLElement>,
  });
  const { isDark } = React.use(SiteContext);

  const mergedChildren = !iframe && clientOnly ? <ClientOnly>{children}</ClientOnly> : children;
  const demoUrlWithTheme = useMemo(() => {
    return `${demoUrl}${isDark ? '?theme=dark' : ''}`;
  }, [demoUrl, isDark]);

  const iframePreview = useMemo(() => {
    if (!iframe) {
      return null;
    }
    return (
      <BrowserFrame>
        <iframe
          src={demoUrlWithTheme}
          height={iframe === true ? undefined : iframe}
          title="demo"
          className="iframe-demo"
        />
      </BrowserFrame>
    );
  }, [demoUrlWithTheme, iframe]);

  const previewContent = iframePreview ?? mergedChildren;

  const codeBoxClass = clsx('code-box', {
    expand: codeExpand,
    'code-box-debug': originDebug,
    'code-box-simplify': simplify && !iframe,
  });

  const highlightClass = clsx('highlight-wrapper', {
    'highlight-wrapper-expand': codeExpand,
  });

  const backgroundGrey = isDark ? '#303030' : '#f0f2f5';

  const codeBoxDemoStyle: React.CSSProperties = {
    padding: iframe || compact ? 0 : undefined,
    overflow: iframe || compact ? 'hidden' : undefined,
    backgroundColor: background === 'grey' ? backgroundGrey : undefined,
  };

  // 如果 DemoEngine 注册了真实代码，CodePreviewer 用真实代码替换默认 entryCode。
  const hasRealCode = codeExpandCtx?.hasRealCode ?? false;
  const realCodeSource = normalizeRealCodeToSourceCode(codeExpandCtx?.realCode ?? null);
  const previewSourceCode = hasRealCode && realCodeSource ? realCodeSource : entryCode;

  const codeBox: React.ReactNode = (
    <section className={codeBoxClass} id={asset.id}>
      <section
        className="code-box-demo notranslate"
        translate="no"
        style={codeBoxDemoStyle}
        ref={demoContainerRef}
      >
        {liveDemoNode || <React.StrictMode>{previewContent}</React.StrictMode>}
      </section>
      {!simplify && (
        <Actions
          assetId={asset.id}
          codeExpand={codeExpand}
          code={previewSourceCode}
          onCodeExpand={() => setCodeExpand((prev) => !prev)}
        />
      )}
      {codeExpand && (
        <section className={highlightClass} key="code">
          <CodePreview
            sourceCode={previewSourceCode}
            jsxCode={hasRealCode ? undefined : jsx}
            styleCode={hasRealCode ? undefined : style}
            error={liveDemoError}
            entryName={entryName}
            onSourceChange={setLiveDemoSource}
          />
          <div
            tabIndex={0}
            role="button"
            className={classes.codeHideBtn}
            onClick={() => setCodeExpand(false)}
          >
            <AiOutlineUp />
            <FormattedMessage id="app.demo.code.hide.simplify" />
          </div>
        </section>
      )}
    </section>
  );

  useEffect(() => {
    // In Safari, if style tag be inserted into non-head tag,
    // it will affect the rendering ability of the browser,
    // resulting in some response delays like following issue:
    // https://github.com/ant-design/ant-design/issues/39995
    // So we insert style tag into head tag.
    if (!style) {
      return;
    }
    const styleTag = document.createElement('style');
    styleTag.innerHTML = style;
    (styleTag as any)['data-demo-url'] = demoUrlWithTheme;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, [style, demoUrlWithTheme]);

  if (version) {
    return (
      <div className={classes.versionRibbon}>
        <div className={classes.versionBadge}>
          <Badge color={version.includes('<') ? 'red' : undefined} variant="filled" size="md">
            {version}
          </Badge>
        </div>
        {codeBox}
      </div>
    );
  }

  return codeBox;
};

const CodePreviewer: React.FC<AntdPreviewerProps> = (props) => {
  const { expand } = props;
  const [codeExpand, setCodeExpand] = useState<boolean>(false);

  useEffect(() => {
    setCodeExpand(expand);
  }, [expand]);

  return (
    <CodeExpandProvider expanded={codeExpand} setExpanded={setCodeExpand}>
      <CodePreviewerInner {...props} codeExpand={codeExpand} setCodeExpand={setCodeExpand} />
    </CodeExpandProvider>
  );
};

export default CodePreviewer;
