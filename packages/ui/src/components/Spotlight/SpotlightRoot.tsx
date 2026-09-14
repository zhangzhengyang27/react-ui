import { useProps } from '../../core/UIProvider/index';
import { Factory } from '../../core/factory/create-factory';
import { factory } from '../../core/factory/factory';
import { useResolvedStylesApi } from '../../core/styles-api/index';
import { StylesApiProps } from '../../core/styles-api/styles-api.types';
import { useStyles } from '../../core/styles-api/use-styles/use-styles';
import { getDefaultZIndex, rem } from '../../core/utils/index';
import { Modal, ModalProps, ModalStylesNames } from '../Modal/index';
import { useCallback, useMemo } from 'react';
import { useDidUpdate, useHotkeys } from '@xiaoye-react/hooks';
import { getHotkeys } from './get-hotkeys';
import { SpotlightProvider } from './Spotlight.context';
import { spotlightActions, SpotlightStore, spotlightStore, useSpotlight } from './spotlight.store';
import classes from './Spotlight.module.css';

export type SpotlightRootStylesNames =
  | ModalStylesNames
  | 'search'
  | 'actionsList'
  | 'action'
  | 'empty'
  | 'footer'
  | 'actionBody'
  | 'actionLabel'
  | 'actionDescription'
  | 'actionSection'
  | 'actionsGroup';

export interface SpotlightRootProps
  extends
    StylesApiProps<SpotlightRootFactory>,
    Omit<
      ModalProps,
      | 'styles'
      | 'classNames'
      | 'vars'
      | 'variant'
      | 'opened'
      | 'onClose'
      | 'closeButtonProps'
      | 'withCloseButton'
      | 'attributes'
    > {
  /** Spotlight store, can be used to create multiple instances of spotlight */
  store?: SpotlightStore;

  /** Controlled Spotlight search query */
  query?: string;

  /** Called when query changes */
  onQueryChange?: (query: string) => void;

  /** Determines whether the search query should be cleared when the spotlight is closed @default true */
  clearQueryOnClose?: boolean;

  /** Keyboard shortcut or a list of shortcuts to trigger spotlight @default 'mod + K' */
  shortcut?: string | string[] | null;

  /** A list of tags which when focused will be ignored by shortcut @default ['input', 'textarea', 'select'] */
  tagsToIgnore?: string[];

  /** Determines whether shortcut should trigger based in contentEditable @default false */
  triggerOnContentEditable?: boolean;

  /** If set, spotlight will not be rendered */
  disabled?: boolean;

  /** Called when spotlight opens */
  onSpotlightOpen?: () => void;

  /** Called when spotlight closes */
  onSpotlightClose?: () => void;

  /** Forces opened state, useful for tests */
  forceOpened?: boolean;

  /** Determines whether spotlight should be closed when one of the actions is triggered @default true */
  closeOnActionTrigger?: boolean;

  /** Spotlight content max-height. Ignored unless `scrollable` prop is set. @default 400 */
  maxHeight?: React.CSSProperties['maxHeight'];

  /** Determines whether the actions list should be scrollable. If not set, `maxHeight` is ignored @default false */
  scrollable?: boolean;
}

export type SpotlightRootFactory = Factory<{
  props: SpotlightRootProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightRootStylesNames;
}>;

const defaultProps = {
  size: 600,
  yOffset: 80,
  zIndex: getDefaultZIndex('max'),
  overlayProps: { backgroundOpacity: 0.35, blur: 7 },
  transitionProps: { duration: 200, transition: 'pop' },
  store: spotlightStore,
  clearQueryOnClose: true,
  closeOnActionTrigger: true,
  shortcut: 'mod + K',
  maxHeight: 400,
} satisfies Partial<SpotlightRootProps>;

export const SpotlightRoot = factory<SpotlightRootFactory>((_props) => {
  const props = useProps('SpotlightRoot', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    store,
    children,
    query,
    onQueryChange,
    transitionProps,
    clearQueryOnClose,
    shortcut,
    tagsToIgnore,
    triggerOnContentEditable,
    disabled,
    onSpotlightOpen,
    onSpotlightClose,
    forceOpened,
    closeOnActionTrigger,
    maxHeight,
    scrollable,
    attributes,
    ...others
  } = props;

  const { opened, query: storeQuery } = useSpotlight(store);
  const _query = typeof query === 'string' ? query : storeQuery;
  const setQuery = useCallback(
    (q: string) => {
      onQueryChange?.(q);
      spotlightActions.setQuery(q, store);
    },
    [onQueryChange, store]
  );

  const getStyles = useStyles<SpotlightRootFactory>({
    name: 'Spotlight',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
  });

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<SpotlightRootFactory>({
    classNames,
    styles,
    props,
  });

  // disabled 时不注册快捷键：否则 mod+K 仍会把共享 store 的 opened 置 true，
  // disabled 翻回 false 后 Modal 以 opened=true 挂载，spotlight 意外弹出
  useHotkeys(
    disabled ? [] : getHotkeys(shortcut, store),
    tagsToIgnore,
    triggerOnContentEditable
  );

  useDidUpdate(() => {
    opened ? onSpotlightOpen?.() : onSpotlightClose?.();
  }, [opened]);

  // useMemo 必须在条件 return 之前：disabled 切换会改变 hooks 数量导致 React 崩溃
  const ctx = useMemo(
    () => ({
      getStyles,
      query: _query,
      setQuery,
      store,
      closeOnActionTrigger,
    }),
    [getStyles, _query, setQuery, store, closeOnActionTrigger]
  );

  if (disabled) {
    return null;
  }

  return (
    <SpotlightProvider
      value={ctx}
    >
      <Modal
        {...others}
        withinPortal={false}
        withCloseButton={false}
        opened={opened || !!forceOpened}
        padding={0}
        onClose={() => spotlightActions.close(store)}
        className={className}
        style={style}
        classNames={resolvedClassNames}
        styles={resolvedStyles}
        attributes={attributes}
        transitionProps={{
          ...transitionProps,
          onExited: () => {
            clearQueryOnClose && setQuery('');
            spotlightActions.clearSpotlightState({ clearQuery: clearQueryOnClose }, store);
            transitionProps?.onExited?.();
          },
        }}
        __vars={{ '--spotlight-max-height': scrollable ? rem(maxHeight) : undefined }}
        __staticSelector="Spotlight"
        data-scrollable={scrollable || undefined}
      >
        {children}
      </Modal>
    </SpotlightProvider>
  );
});

SpotlightRoot.classes = classes;
SpotlightRoot.displayName = '@xiaoye-react/spotlight/SpotlightRoot';
