import * as React from 'react';
import { Link } from 'dumi';

type LinkProps = Parameters<typeof Link>[0];

export interface LocaleLinkProps extends LinkProps {
  sourceType: 'a' | 'Link';
}

const LocaleLink: React.FC<React.PropsWithChildren<LocaleLinkProps>> = ({
  sourceType,
  to,
  ...props
}) => {
  const Component = sourceType === 'a' ? 'a' : Link;

  const localeTo = React.useMemo(() => {
    if (!to || typeof to !== 'string') {
      return to;
    }

    // 本站仅有一个 zh-CN locale（suffix: ''），所有路由都不带 -cn 后缀，
    // 这里不再做 locale 前缀改写——之前的 `path + '-cn'` 会生成全站死链
    //（如 /docs/hooks/use-pagination-cn，路由表里并不存在）。
    return to;
  }, [to]);

  const linkProps: LocaleLinkProps = {
    ...props,
  } as LocaleLinkProps;

  if (to) {
    linkProps.to = localeTo;
  }

  return <Component {...linkProps} />;
};

export default LocaleLink;
