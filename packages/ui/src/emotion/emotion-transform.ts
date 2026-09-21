import { UIStylesTransform } from '../core/UIProvider/UI.context';
import { useUITheme } from '../core/UIProvider/index';
import { getHelpers } from './create-styles';
import { useCss } from './use-css';

/**
 * 这两个 *Transform 是 UIStylesTransform 的字段：它们本身就是 hook——由 Box/useStyles
 * 在组件渲染期取出并调用一次，返回的才是普通闭包。插件按命名认不出"塞进对象字面量的
 * hook"，故在这两处 hook 调用点就地豁免；调用方必须保持在组件顶层。
 */
function sxTransform() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useUITheme();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { css } = useCss();

  return (sx: any) => {
    const parsedSx = typeof sx === 'function' ? sx(theme, getHelpers(theme)) : sx;
    return !parsedSx ? '' : css(parsedSx);
  };
}

function stylesTransform() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const theme = useUITheme();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { css } = useCss();

  return (styles: any, payload: any) => {
    if (!styles) {
      return {};
    }

    const stylesObject =
      typeof styles === 'function' ? styles(theme, payload.props, getHelpers(theme)) : styles;

    return Object.keys(stylesObject).reduce((acc, key) => {
      const value = stylesObject[key];
      const parsedValue = typeof value === 'function' ? value(theme) : value;
      return { ...acc, [key]: css(parsedValue) };
    }, {});
  };
}

export const emotionTransform: UIStylesTransform = {
  sx: sxTransform,
  styles: stylesTransform,
};
