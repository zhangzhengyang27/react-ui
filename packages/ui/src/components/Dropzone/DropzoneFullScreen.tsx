import { useEffect, useState } from 'react';
import { Box, BoxProps, ElementProps } from '../../core/Box/Box';
import { useProps } from '../../core/UIProvider/index';
import { Factory } from '../../core/factory/create-factory';
import { factory } from '../../core/factory/factory';
import { useResolvedStylesApi } from '../../core/styles-api/index';
import { StylesApiProps } from '../../core/styles-api/styles-api.types';
import { useStyles } from '../../core/styles-api/use-styles/use-styles';
import { getDefaultZIndex } from '../../core/utils/index';
import { OptionalPortal } from '../Portal/OptionalPortal';
import { BasePortalProps } from '../Portal/Portal';
import { useDisclosure } from '@xiaoye-react/hooks';
import { Dropzone, DropzoneProps, DropzoneStylesNames, DropzoneVariant } from './Dropzone';
import classes from './Dropzone.module.css';

export type DropzoneFullScreenStylesNames = DropzoneStylesNames | 'fullScreen';

export interface DropzoneFullScreenProps
  extends
    BoxProps,
    Omit<DropzoneProps, 'styles' | 'classNames' | 'vars' | 'variant' | 'attributes'>,
    StylesApiProps<DropzoneFullScreenFactory>,
    ElementProps<'div', 'onDragLeave' | 'onDragOver' | 'onDrop' | 'onDragEnter'> {
  /** Determines whether user can drop files to browser window @default true */
  active?: boolean;

  /** Z-index value @default 9999 */
  zIndex?: React.CSSProperties['zIndex'];

  /** Determines whether component should be rendered within `Portal` @default true */
  withinPortal?: boolean;

  /** Props to pass down to the portal when withinPortal is `true` */
  portalProps?: Omit<BasePortalProps, 'withinPortal'>;
}

export type DropzoneFullScreenFactory = Factory<{
  props: DropzoneFullScreenProps;
  ref: HTMLDivElement;
  stylesNames: DropzoneFullScreenStylesNames;
  variant: DropzoneVariant;
}>;

const defaultProps = {
  maxSize: Infinity,
  activateOnDrag: true,
  dragEventsBubbling: true,
  activateOnKeyboard: true,
  active: true,
  zIndex: getDefaultZIndex('max'),
  withinPortal: true,
} satisfies Partial<DropzoneFullScreenProps>;

export const DropzoneFullScreen = factory<DropzoneFullScreenFactory>((_props) => {
  const props = useProps('DropzoneFullScreen', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    active,
    onDrop,
    onReject,
    zIndex,
    withinPortal,
    portalProps,
    attributes,
    mod,
    ...others
  } = props;

  const getStyles = useStyles<DropzoneFullScreenFactory>({
    name: 'DropzoneFullScreen',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: 'fullScreen',
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<DropzoneFullScreenFactory>({
    classNames,
    styles,
    props,
  });

  const [counter, setCounter] = useState(0);
  const [visible, { open, close }] = useDisclosure(false);

  const handleDragEnter = (event: DragEvent) => {
    if (event.dataTransfer?.types.includes('Files')) {
      // dragenter/leave 在子元素间穿梭成对触发，但 dragleave 无法区分拖的是否是文件：
      // 页面内非文件拖拽（拖选文本/拖动元素）只触发 leave 会把计数打成负数且无复位路径，
      // 之后真实文件 dragenter 先归 0 再 open，counter===0 的 effect 立即 close，遮罩闪烁。
      // 钳到非负：非文件拖拽的 leave 对计数无影响
      setCounter((prev) => Math.max(0, prev + 1));
      open();
    }
  };

  const handleDragLeave = () => {
    setCounter((prev) => Math.max(0, prev - 1));
  };

  useEffect(() => {
    counter === 0 && close();
  }, [counter, close]);

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    document.addEventListener('dragenter', handleDragEnter, false);
    document.addEventListener('dragleave', handleDragLeave, false);

    return () => {
      document.removeEventListener('dragenter', handleDragEnter, false);
      document.removeEventListener('dragleave', handleDragLeave, false);
    };
  }, [active]);

  return (
    <OptionalPortal {...portalProps} withinPortal={withinPortal}>
      <Box
        {...getStyles('fullScreen', {
          style: { opacity: visible ? 1 : 0, pointerEvents: visible ? 'all' : 'none', zIndex },
        })}
      >
        <Dropzone
          activateOnClick={false}
          {...others}
          classNames={resolvedClassNames}
          styles={resolvedStyles}
          unstyled={unstyled}
          className={classes.dropzone}
          onDrop={(files: any) => {
            onDrop?.(files);
            close();
            setCounter(0);
          }}
          onReject={(files: any) => {
            onReject?.(files);
            close();
            setCounter(0);
          }}
        />
      </Box>
    </OptionalPortal>
  );
});

DropzoneFullScreen.classes = classes;
DropzoneFullScreen.displayName = '@xiaoye-react/ui/DropzoneFullScreen';

export type DropzoneFullScreenType = typeof DropzoneFullScreen;
