import React from 'react';
import { Button, type ButtonProps } from '@xiaoye-react/ui';
import Link from './Link';
import type { LinkProps } from './Link';

// 兼容历史 antd 风格入参（type/size），内部映射到 react-ui Button 的 variant/size
type LegacyButtonType = 'primary' | 'default' | 'dashed' | 'link' | 'text';
type LegacyButtonSize = 'large' | 'middle' | 'small';

export type LinkButtonProps = LinkProps &
  Readonly<React.PropsWithChildren<{ type?: LegacyButtonType; size?: LegacyButtonSize }>>;

const variantMap: Record<LegacyButtonType, ButtonProps['variant']> = {
  primary: 'filled',
  default: 'default',
  dashed: 'outline',
  link: 'transparent',
  text: 'subtle',
};

const sizeMap: Record<LegacyButtonSize, ButtonProps['size']> = {
  large: 'lg',
  middle: 'md',
  small: 'sm',
};

// Link 通过 React.createElement(component, { href, ... }) 渲染按钮；
// react-ui Button 默认渲染为 <button>，需要显式 component="a" 才能渲染为锚点。
const AnchorButton: React.FC<Record<string, any>> = (props) => {
  const { type, size, ...rest } = props;
  return (
    <Button
      {...rest}
      component="a"
      variant={type ? variantMap[type] : 'default'}
      size={size ? sizeMap[size] : 'md'}
    />
  );
};

const LinkButton: React.FC<LinkButtonProps> = (props) => (
  <Link {...props} component={AnchorButton} />
);

export default LinkButton;
