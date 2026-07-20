import * as React from 'react';
import { Text, Title } from '@react-ui/ui';
import { clsx } from 'clsx';

import SiteContext from '../../../theme/slots/SiteContext';
import GroupMaskLayer from './GroupMaskLayer';

import classes from './Group.module.css';

export interface GroupProps {
  id?: string;
  title?: React.ReactNode;
  titleColor?: string;
  description?: React.ReactNode;
  background?: string;
  /** 是否不使用两侧 margin */
  collapse?: boolean;
  decoration?: React.ReactNode;
  /** 预加载的背景图片列表 */
  backgroundPrefetchList?: string[];
  /** 标题右侧的操作按钮 */
  extra?: React.ReactNode;
}

const Group: React.FC<React.PropsWithChildren<GroupProps>> = (props) => {
  const {
    id,
    title,
    titleColor,
    description,
    children,
    decoration,
    background,
    collapse,
    backgroundPrefetchList,
    extra,
  } = props;

  // 预加载背景图片
  React.useEffect(() => {
    if (backgroundPrefetchList && backgroundPrefetchList.length > 0) {
      backgroundPrefetchList.forEach((url) => {
        if (url && url.startsWith('https')) {
          const img = new Image();
          img.src = url;
        }
      });
    }
  }, [backgroundPrefetchList]);

  const { isMobile } = React.use(SiteContext);
  return (
    <div
      style={
        background?.startsWith('https') || background?.startsWith('linear-gradient')
          ? {
              backgroundImage: background?.startsWith('linear-gradient')
                ? background
                : `url(${background})`,
            }
          : { backgroundColor: background }
      }
      className={classes.box}
    >
      <div className={classes.container}>{decoration}</div>
      <GroupMaskLayer style={{ paddingBlock: 'var(--ui-spacing-xl)' }}>
        <div className={classes.typographyWrapper}>
          <div className={classes.header}>
            <Title
              id={id}
              order={1}
              style={{
                fontWeight: 900,
                color: titleColor,
                margin: 0,
                fontSize: isMobile ? 'var(--ui-h2-font-size)' : 'var(--ui-h1-font-size)',
              }}
            >
              {title}
            </Title>
            {extra}
          </div>
          <Text
            style={{
              color: titleColor,
              marginTop: 'var(--ui-spacing-sm)',
              marginBottom: isMobile ? 'var(--ui-spacing-xl)' : 'var(--ui-spacing-lg)',
            }}
          >
            {description}
          </Text>
        </div>
        <div className={clsx({ [classes.marginStyle]: !collapse })}>
          {children ? <div>{children}</div> : <div className={classes.withoutChildren} />}
        </div>
      </GroupMaskLayer>
    </div>
  );
};

export default Group;
