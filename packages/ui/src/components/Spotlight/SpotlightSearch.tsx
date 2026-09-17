import { useState } from 'react';
import { BoxProps, ElementProps } from '../../core/Box/Box';
import { useProps } from '../../core/UIProvider/index';
import { Factory } from '../../core/factory/create-factory';
import { factory } from '../../core/factory/factory';
import { CompoundStylesApiProps } from '../../core/styles-api/styles-api.types';
import { Input, InputProps, InputStylesNames } from '../Input/index';
import { useSpotlightContext } from './Spotlight.context';
import { spotlightActions } from './spotlight.store';
import classes from './Spotlight.module.css';

export type SpotlightSearchStylesNames = InputStylesNames;

export interface SpotlightSearchProps
  extends
    BoxProps,
    Omit<InputProps, 'classNames' | 'styles' | 'vars' | 'variant'>,
    CompoundStylesApiProps<SpotlightSearchFactory>,
    ElementProps<'input', 'size'> {}

export type SpotlightSearchFactory = Factory<{
  props: SpotlightSearchProps;
  ref: HTMLInputElement;
  stylesNames: SpotlightSearchStylesNames;
  compound: true;
}>;

const defaultProps = {
  size: 'lg',
} satisfies Partial<SpotlightSearchProps>;

export const SpotlightSearch = factory<SpotlightSearchFactory>((props) => {
  const {
    classNames,
    styles,
    onKeyDown,
    onChange,
    onCompositionStart,
    onCompositionEnd,
    vars,
    value,
    attributes,
    ...others
  } = useProps('SpotlightSearch', defaultProps, props);
  const ctx = useSpotlightContext();
  const inputStyles = ctx.getStyles('search');
  const [isComposing, setIsComposing] = useState(false); // IME

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (isComposing) {
      return;
    }

    if (event.nativeEvent.code === 'ArrowDown') {
      event.preventDefault();
      spotlightActions.selectNextAction(ctx.store);
    }

    if (event.nativeEvent.code === 'ArrowUp') {
      event.preventDefault();
      spotlightActions.selectPreviousAction(ctx.store);
    }

    if (event.nativeEvent.code === 'Enter' || event.nativeEvent.code === 'NumpadEnter') {
      event.preventDefault();
      spotlightActions.triggerSelectedAction(ctx.store);
    }
  };

  return (
    <Input
      {...inputStyles}
      classNames={[{ input: inputStyles.className }, classNames] as any}
      styles={[{ input: inputStyles.style }, styles] as any}
      {...others}
      value={value ?? ctx.query}
      onChange={(event) => {
        ctx.setQuery(event.currentTarget.value);
        onChange?.(event);
      }}
      onKeyDown={handleKeyDown}
      onCompositionStart={(event) => {
        setIsComposing(true);
        onCompositionStart?.(event);
      }}
      onCompositionEnd={(event) => {
        setIsComposing(false);
        onCompositionEnd?.(event);
      }}
    />
  );
});

SpotlightSearch.classes = classes;
SpotlightSearch.displayName = '@xiaoye-react/spotlight/SpotlightSearch';
