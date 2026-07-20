import type { FC } from 'react';
import React, { useEffect, useRef } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { SiSketch } from 'react-icons/si';
import { nodeToGroup } from 'html2sketch';

import type { AntdPreviewerProps } from '.';
import useLocale from '../../../hooks/useLocale';
import classes from './DesignPreviewer.module.css';

const locales = {
  cn: {
    copySketch: '复制 Sketch JSON',
    pasteToPlugin: '已复制，使用 Kitchen 插件即可粘贴',
    message: '复制失败',
  },
  en: {
    copySketch: 'Copy Sketch JSON',
    pasteToPlugin: 'Copied. You can paste using the Kitchen plugin.',
    message: 'Copy failed',
  },
};

const DesignPreviewer: FC<AntdPreviewerProps> = ({ children, title, description, tip, asset }) => {
  const demoRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState<boolean>(false);
  const [locale] = useLocale(locales);
  const timerRef = React.useRef<ReturnType<typeof setTimeout>>(null);

  const handleCopy = async () => {
    try {
      if (demoRef.current) {
        const group = await nodeToGroup(demoRef.current);
        await navigator.clipboard.writeText(JSON.stringify(group.toSketchJSON()));
        setCopied(true);
        timerRef.current = setTimeout(() => {
          setCopied(false);
        }, 5000);
      }
    } catch (e) {
      console.error(locale.message, e);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className={classes.wrapper} id={asset.id}>
      <a className={classes.title} href={`#${asset.id}`}>
        {title}
      </a>
      {description && (
        <div className={classes.description} dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <div className={classes.copy}>
        {copied ? (
          <div className={classes.copiedTip}>
            <AiOutlineCheck />
            <span style={{ marginInlineStart: 8 }}>{locale.pasteToPlugin}</span>
          </div>
        ) : (
          <button type="button" onClick={handleCopy} className={classes.copyTip}>
            <SiSketch />
            <span style={{ marginInlineStart: 8 }}>{locale.copySketch}</span>
          </button>
        )}
      </div>
      <div className={classes.demo} ref={demoRef}>
        {children}
      </div>
      <div className={classes.tip}>{tip}</div>
    </div>
  );
};

export default DesignPreviewer;
