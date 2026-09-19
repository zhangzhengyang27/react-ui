import { Box, BoxProps, ElementProps } from '../../../core/Box/Box';
import { useProps } from '../../../core/UIProvider/index';
import { UISize } from '../../../core/UIProvider/theme.types';
import { factory } from '../../../core/factory/factory';
import { StylesApiProps } from '../../../core/styles-api/styles-api.types';
import { useStyles } from '../../../core/styles-api/use-styles/use-styles';
import { Factory } from '../../../schedule/components/AgendaView/AgendaView';
import classes from './LevelsGroup.module.css';

export type LevelsGroupStylesNames = 'levelsGroup';

export interface LevelsGroupProps
  extends BoxProps, StylesApiProps<LevelsGroupFactory>, ElementProps<'div'> {
  __staticSelector?: string;
  size?: UISize;

  /** Determines whether the group should take the full width of its container @default false */
  fullWidth?: boolean;
}

export type LevelsGroupFactory = Factory<{
  props: LevelsGroupProps;
  ref: HTMLDivElement;
  stylesNames: LevelsGroupStylesNames;
}>;

export const LevelsGroup = factory<LevelsGroupFactory>((_props) => {
  const props = useProps('LevelsGroup', null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    __staticSelector,
    fullWidth,
    attributes,
    ...others
  } = props;

  const getStyles = useStyles<LevelsGroupFactory>({
    name: __staticSelector || 'LevelsGroup',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    rootSelector: 'levelsGroup',
  });

  return <Box {...getStyles('levelsGroup')} data-full-width={fullWidth || undefined} {...others} />;
});

LevelsGroup.classes = classes;
LevelsGroup.displayName = '@xiaoye-react/ui/LevelsGroup';
