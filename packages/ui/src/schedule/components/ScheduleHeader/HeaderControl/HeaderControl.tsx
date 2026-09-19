import { AccordionChevron } from '../../../../components/Accordion/AccordionChevron';
import { UnstyledButton } from '../../../../components/UnstyledButton/UnstyledButton';
import { BoxProps, ElementProps } from '../../../../core/Box/Box';
import { useDirection } from '../../../../core/DirectionProvider/DirectionProvider';
import { useProps } from '../../../../core/UIProvider/index';
import { UIRadius } from '../../../../core/UIProvider/theme.types';
import { factory } from '../../../../core/factory/factory';
import { createVarsResolver } from '../../../../core/styles-api/index';
import { StylesApiProps } from '../../../../core/styles-api/styles-api.types';
import { useStyles } from '../../../../core/styles-api/use-styles/use-styles';
import { getRadius } from '../../../../core/utils/index';
import { Factory } from '../../AgendaView/AgendaView';
import { getLabel, ScheduleLabelsOverride } from '../../../labels';
import { useScheduleHeaderLabels } from '../ScheduleHeaderContext';
import classes from './HeaderControl.module.css';

export type HeaderControlStylesNames = 'headerControl';
export type HeaderControlCssVariables = {
  headerControl: '--control-radius';
};

export interface HeaderControlProps
  extends BoxProps, StylesApiProps<HeaderControlFactory>, ElementProps<'button'> {
  __staticSelector?: string;

  /** Applies active styles */
  active?: boolean;

  /** Removes inline padding */
  square?: boolean;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius` @default theme.defaultRadius */
  radius?: UIRadius;

  /** If set to `false`, the control will not be clickable  */
  interactive?: boolean;

  /** Labels override */
  labels?: ScheduleLabelsOverride;
}

export type HeaderControlFactory = Factory<{
  props: HeaderControlProps;
  ref: HTMLButtonElement;
  stylesNames: HeaderControlStylesNames;
  vars: HeaderControlCssVariables;
}>;

const defaultProps = {
  __staticSelector: 'HeaderControl',
  interactive: true,
} satisfies Partial<HeaderControlProps>;

const varsResolver = createVarsResolver<HeaderControlFactory>((_theme, { radius }) => ({
  headerControl: {
    '--control-radius': radius === undefined ? undefined : getRadius(radius),
  },
}));

export const HeaderControl = factory<HeaderControlFactory>((_props) => {
  const props = useProps('HeaderControl', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    __staticSelector,
    mod,
    attributes,
    active,
    square,
    radius,
    interactive,
    labels,
    ...others
  } = props;

  const getStyles = useStyles<HeaderControlFactory>({
    name: __staticSelector,
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver,
    rootSelector: 'headerControl',
  });

  return (
    <UnstyledButton
      {...getStyles('headerControl', { active: interactive })}
      mod={[{ active, square, interactive }, mod]}
      tabIndex={interactive ? undefined : -1}
      {...others}
    />
  );
});

HeaderControl.displayName = '@xiaoye-react/ui/HeaderControl';
HeaderControl.classes = classes;
HeaderControl.varsResolver = varsResolver;

export function ScheduleHeaderNext(props: HeaderControlProps) {
  const { dir } = useDirection();
  const resolvedLabels = useScheduleHeaderLabels(props.labels);

  return (
    <HeaderControl data-type="next" aria-label={getLabel('next', resolvedLabels)} square {...props}>
      <AccordionChevron style={{ transform: `rotate(${dir === 'rtl' ? 90 : -90}deg)` }} />
    </HeaderControl>
  );
}

export function ScheduleHeaderPrevious(props: HeaderControlProps) {
  const { dir } = useDirection();
  const resolvedLabels = useScheduleHeaderLabels(props.labels);

  return (
    <HeaderControl
      data-type="previous"
      aria-label={getLabel('previous', resolvedLabels)}
      square
      {...props}
    >
      <AccordionChevron style={{ transform: `rotate(${dir === 'rtl' ? -90 : 90}deg)` }} />
    </HeaderControl>
  );
}

export function ScheduleHeaderToday(props: HeaderControlProps) {
  const resolvedLabels = useScheduleHeaderLabels(props.labels);

  return (
    <HeaderControl data-type="today" aria-label={getLabel('today', resolvedLabels)} {...props}>
      {getLabel('today', resolvedLabels)}
    </HeaderControl>
  );
}

ScheduleHeaderNext.displayName = '@xiaoye-react/ui/ScheduleHeaderNext';
ScheduleHeaderPrevious.displayName = '@xiaoye-react/ui/ScheduleHeaderPrevious';
ScheduleHeaderToday.displayName = '@xiaoye-react/ui/ScheduleHeaderToday';
