import { Box, BoxProps, ElementProps } from '../../core/Box/Box';
import { useProps } from '../../core/UIProvider/index';
import { Factory } from '../../core/factory/create-factory';
import { factory } from '../../core/factory/factory';
import { CompoundStylesApiProps } from '../../core/styles-api/styles-api.types';
import { useSpotlightContext } from './Spotlight.context';
import classes from './Spotlight.module.css';

export type SpotlightEmptyStylesNames = 'empty';

export interface SpotlightEmptyProps
  extends BoxProps, CompoundStylesApiProps<SpotlightEmptyFactory>, ElementProps<'div'> {}

export type SpotlightEmptyFactory = Factory<{
  props: SpotlightEmptyProps;
  ref: HTMLDivElement;
  stylesNames: SpotlightEmptyStylesNames;
  compound: true;
}>;

export const SpotlightEmpty = factory<SpotlightEmptyFactory>((props) => {
  const { className, style, classNames, styles, ...others } = useProps(
    'SpotlightEmpty',
    null,
    props
  );

  const ctx = useSpotlightContext();

  return <Box {...ctx.getStyles('empty', { classNames, styles, className, style })} {...others} />;
});

SpotlightEmpty.classes = classes;
SpotlightEmpty.displayName = '@xiaoye-react/ui/SpotlightEmpty';
