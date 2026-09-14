import { Box, BoxProps, ElementProps } from '../../core/Box/Box';
import { useProps } from '../../core/UIProvider/index';
import { Factory } from '../../core/factory/create-factory';
import { factory } from '../../core/factory/factory';
import { CompoundStylesApiProps } from '../../core/styles-api/styles-api.types';
import { useSpotlightContext } from './Spotlight.context';
import classes from './Spotlight.module.css';

export type SpotlightActionsGroupStylesNames = 'actionsGroup';

export interface SpotlightActionsGroupProps
  extends BoxProps, CompoundStylesApiProps<SpotlightActionsGroupFactory>, ElementProps<'div'> {
  /** `Spotlight.Action` components */
  children?: React.ReactNode;

  /** Group label */
  label?: string;
}

export type SpotlightActionsGroupFactory = Factory<{
  props: SpotlightActionsGroupProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightActionsGroupStylesNames;
  compound: true;
}>;

export const SpotlightActionsGroup = factory<SpotlightActionsGroupFactory>((props) => {
  const { className, style, styles, classNames, label, children, ...others } = useProps(
    'SpotlightActionsGroup',
    null,
    props
  );

  const ctx = useSpotlightContext();

  return (
    <Box
      {...ctx.getStyles('actionsGroup', { className, style, classNames, styles })}
      {...others}
      __vars={{
        '--spotlight-label': `'${label?.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`,
      }}
    >
      {children}
    </Box>
  );
});

SpotlightActionsGroup.classes = classes;
SpotlightActionsGroup.displayName = '@xiaoye-react/ui/SpotlightActionsGroup';
