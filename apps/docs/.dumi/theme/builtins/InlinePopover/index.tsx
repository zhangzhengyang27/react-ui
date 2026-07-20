import React from 'react';
import { AiOutlinePicture } from 'react-icons/ai';
import { Anchor, Tooltip } from '@react-ui/ui';

import useLocale from '../../../hooks/useLocale';
import classes from './index.module.css';

const locales = {
  cn: {
    tip: '预览',
  },
  en: {
    tip: 'Preview',
  },
};

export interface InlinePopoverProps {
  previewURL?: string;
}

// 鼠标悬浮弹出 Popover 组件，用于帮助用户更快看到一些属性对应的预览效果
const InlinePopover: React.FC<InlinePopoverProps> = (props) => {
  const { previewURL } = props;
  const [locale] = useLocale(locales);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setVisible(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [visible]);

  return (
    <>
      <Tooltip label={locale.tip}>
        <Anchor component="button" onClick={() => setVisible(true)}>
          <AiOutlinePicture />
        </Anchor>
      </Tooltip>

      {visible && (
        <div
          className={classes.overlay}
          role="dialog"
          aria-modal
          onClick={() => setVisible(false)}
        >
          <img
            className={classes.previewImg}
            src={previewURL}
            alt={locale.tip}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default InlinePopover;
