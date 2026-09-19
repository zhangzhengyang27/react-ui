import { useEffect, useId } from 'react';
import { Box, BoxProps, ElementProps } from '../../core/Box/Box';
import { useProps } from '../../core/UIProvider/index';
import { Factory } from '../../core/factory/create-factory';
import { factory } from '../../core/factory/factory';
import { CompoundStylesApiProps } from '../../core/styles-api/styles-api.types';
import { useSpotlightContext } from './Spotlight.context';
import { spotlightActions } from './spotlight.store';
import classes from './Spotlight.module.css';

export type SpotlightActionsListStylesNames = 'actionsList' | 'actionsListInner';

export interface SpotlightActionsListProps
  extends BoxProps, CompoundStylesApiProps<SpotlightActionsListFactory>, ElementProps<'div'> {}

export type SpotlightActionsListFactory = Factory<{
  props: SpotlightActionsListProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightActionsListStylesNames;
  compound: true;
}>;

export const SpotlightActionsList = factory<SpotlightActionsListFactory>((props) => {
  const { className, style, id, children, vars, classNames, styles, ...others } = useProps(
    'SpotlightActionsList',
    null,
    props
  );
  const ctx = useSpotlightContext();
  const generatedId = `ui-${useId().replace(/:/g, '')}`;
  const listId = id || generatedId;

  useEffect(() => {
    spotlightActions.setListId(listId, ctx.store);
    return () => {
      // React 保证 cleanup 先于新一轮 effect 执行，这里无条件清空是安全的
      spotlightActions.setListId('', ctx.store);
    };
    // listId/ctx.store 必须入 deps：此前为 []，动态修改 id 后 store 残留旧 id，
    // selectAction/triggerSelectedAction 仍按旧 id 查 DOM，方向键与 Enter 静默失效
  }, [listId, ctx.store]);

  return (
    <Box
      {...ctx.getStyles('actionsList', { className, style, classNames, styles })}
      id={listId}
      {...others}
    >
      {children}
    </Box>
  );
});

SpotlightActionsList.classes = classes;
SpotlightActionsList.displayName = '@xiaoye-react/ui/SpotlightActionsList';
