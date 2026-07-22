import { useEffect, useId } from 'react';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '@xiaoye-react/ui';
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
      spotlightActions.setListId('', ctx.store);
    };
  }, []);

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
SpotlightActionsList.displayName = '@xiaoye-react/spotlight/SpotlightActionsList';
