import type { MouseEvent, MouseEventHandler } from 'react';
import React, { useMemo } from 'react';
import { Link as DumiLink, useAppData, useLocation, useNavigate } from 'dumi';

export interface LinkProps {
  to?: string | { pathname?: string; search?: string; hash?: string };
  /** 外链或原生路径：与 to 二选一；显式传入时不会被 to 的计算结果覆盖 */
  href?: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: MouseEventHandler;
  component?: React.ComponentType<any>;
  ref?: React.Ref<HTMLAnchorElement>;
}

const Link: React.FC<React.PropsWithChildren<LinkProps>> = (props) => {
  const { component, children, to, href: hrefProp, ref, ...rest } = props;
  const { pathname } = useLocation();
  const { preloadRoute } = useAppData();
  const navigate = useNavigate();
  const href = useMemo<string>(() => {
    if (typeof to === 'object') {
      return `${to.pathname || pathname}${to.search || ''}${to.hash || ''}`;
    }
    if (typeof to === 'string') {
      return to;
    }
    return hrefProp;
  }, [pathname, to, hrefProp]);
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    rest.onClick?.(e);
    if (!href?.startsWith('http')) {
      // Should support open in new tab
      if (!e.metaKey && !e.ctrlKey && !e.shiftKey) {
        e.preventDefault();
        navigate(href);
      }
    }
  };
  if (component) {
    return React.createElement(
      component,
      {
        ...rest,
        ref,
        href,
        onClick,
        onMouseEnter: () => preloadRoute?.(href),
      },
      children,
    );
  }
  return (
    <DumiLink ref={ref} {...rest} to={href} prefetch>
      {children}
    </DumiLink>
  );
};

export default Link;
