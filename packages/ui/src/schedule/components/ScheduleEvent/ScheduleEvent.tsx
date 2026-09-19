import { use, useEffect, useRef } from 'react';
import { UnstyledButton } from '../../../components/UnstyledButton/UnstyledButton';
import { Box, BoxProps, ElementProps } from '../../../core/Box/Box';
import { useProps } from '../../../core/UIProvider/index';
import { UIRadius } from '../../../core/UIProvider/theme.types';
import { factory } from '../../../core/factory/factory';
import { createVarsResolver } from '../../../core/styles-api/index';
import { StylesApiProps } from '../../../core/styles-api/styles-api.types';
import { useStyles } from '../../../core/styles-api/use-styles/use-styles';
import { getRadius } from '../../../core/utils/index';
import { Factory } from '../AgendaView/AgendaView';
import { ScheduleEventData, ScheduleMode } from '../../types';
import { DragContext } from '../DragContext/DragContext';
import classes from './ScheduleEvent.module.css';

export type ScheduleEventStylesNames = 'event' | 'eventInner' | 'eventResizeHandle';

export type ScheduleEventVariant = 'filled' | 'light';
export type ScheduleEventCssVariables = {
  event: '--event-bg' | '--event-color' | '--event-radius' | '--event-hover';
};

export type RenderEventBody = (event: ScheduleEventData<any>) => React.ReactNode;

export type RenderEvent = (
  event: ScheduleEventData,
  props: React.ComponentPropsWithoutRef<'button'> & { children: React.ReactNode }
) => React.ReactElement;

export interface ScheduleEventProps
  extends BoxProps, StylesApiProps<ScheduleEventFactory>, ElementProps<'button'> {
  __staticSelector?: string;

  /** Event to display */
  event: ScheduleEventData;

  /** Key of `theme.radius` or any valid CSS value to set border-radius @default 'sm' */
  radius?: UIRadius;

  /** If set, event has `white-space: nowrap` @default false */
  nowrap?: boolean;

  /** If set, event shrinks its font-size with limited height @default false */
  autoSize?: boolean;

  /** Event size @default 'sm' */
  size?: 'sm' | 'md' | (string & {});

  /** Function to customize event body, `event` object is passed as first argument */
  renderEventBody?: RenderEventBody;

  /** Function to fully customize event rendering, receives all props that would be passed to the root element including children */
  renderEvent?: RenderEvent;

  /** Event hanging position */
  hanging?: 'start' | 'end' | 'both' | 'none';

  /** If true, event can be dragged @default false */
  draggable?: boolean;

  /** Called when event drag starts */
  onEventDragStart?: (event: ScheduleEventData) => void;

  /** Called when event drag ends */
  onEventDragEnd?: () => void;

  /** If true, event is currently being dragged @default false */
  isDragging?: boolean;

  /** Interaction mode: 'default' allows all interactions, 'static' disables event interactions @default default */
  mode?: ScheduleMode;

  /** If true, event can be resized by dragging its edges @default false */
  withResize?: boolean;

  /** Called when resize starts on an edge */
  onResizeStart?: (edge: 'top' | 'bottom', e: React.PointerEvent) => void;

  /** If true, event is currently being resized @default false */
  isResizing?: boolean;
}

export type ScheduleEventFactory = Factory<{
  props: ScheduleEventProps;
  ref: HTMLButtonElement;
  stylesNames: ScheduleEventStylesNames;
  vars: ScheduleEventCssVariables;
  variant: ScheduleEventVariant;
}>;

const defaultProps = {
  __staticSelector: 'ScheduleEvent',
  mode: 'default',
  radius: 'sm' as UIRadius,
} satisfies Partial<ScheduleEventProps>;

const varsResolver = createVarsResolver<ScheduleEventFactory>(
  (theme, { event, variant, radius }) => {
    const colors = theme.variantColorResolver({
      color: event.color || theme.primaryColor,
      theme,
      variant: variant || event.variant || 'light',
      autoContrast: true,
    });

    return {
      event: {
        '--event-bg': colors.background,
        '--event-hover': colors.hover,
        '--event-color': colors.color,
        '--event-radius': getRadius(radius),
      },
    };
  }
);

export const ScheduleEvent = factory<ScheduleEventFactory>((_props) => {
  const props = useProps('ScheduleEvent', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    attributes,
    children,
    nowrap,
    radius,
    color,
    __staticSelector,
    event,
    renderEventBody,
    renderEvent,
    size,
    autoSize,
    mod,
    hanging,
    draggable = false,
    onEventDragStart,
    onEventDragEnd,
    isDragging = false,
    mode,
    withResize = false,
    onResizeStart,
    isResizing = false,
    ...others
  } = props;

  const ctx = use(DragContext);

  const getStyles = useStyles<ScheduleEventFactory>({
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
    rootSelector: 'event',
  });

  const handleDragStart = (e: React.DragEvent<HTMLButtonElement>) => {
    if (!draggable) {
      e.preventDefault();
      return;
    }

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('application/json', JSON.stringify({ eventId: event.id }));
    onEventDragStart?.(event);
    ctx.onDragStart?.(event);
  };

  const handleDragEnd = () => {
    // drop 路径会先经 DragContext 清理拖拽态，随后的原生 dragend 事件到达时
    // 本次手势已结束：跳过，避免 onEventDragEnd / ctx.onDragEnd 重复触发
    if (!isDragging && ctx.draggedEventId !== event.id) {
      return;
    }
    dragEndHandledRef.current = true;
    onEventDragEnd?.();
    ctx.onDragEnd?.();
  };

  const isCurrentlyDragging = isDragging || ctx.draggedEventId === event.id;
  const isAnyEventDragging = ctx.isDragging || false;

  const dragEndRef = useRef(ctx.onDragEnd);
  dragEndRef.current = ctx.onDragEnd;
  const dragEndHandledRef = useRef(false);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    isDraggingRef.current = isCurrentlyDragging;
    if (isCurrentlyDragging) {
      dragEndHandledRef.current = false;
    }
  }, [isCurrentlyDragging]);

  // 拖拽进行中事件被卸载（删除/过滤出视图）时 DragContext 收不到 dragend，
  // 这里兜底通知一次；正常结束（dragend/drop）路径已在 handleDragEnd 或
  // hook 的 handleDrop 中调用过，由 isDraggingRef/handled 标记跳过
  useEffect(() => {
    return () => {
      if (isDraggingRef.current && !dragEndHandledRef.current) {
        dragEndRef.current?.();
      }
    };
  }, []);

  const showResizeHandles = withResize && mode !== 'static';

  const eventChildren = (
    <>
      {showResizeHandles && (
        <Box
          {...getStyles('eventResizeHandle')}
          mod={{ edge: 'top' }}
          onPointerDown={(e: React.PointerEvent) => onResizeStart?.('top', e)}
        />
      )}
      <Box mod={{ nowrap, size, autoSize, hanging }} {...getStyles('eventInner')}>
        {typeof renderEventBody === 'function' ? renderEventBody(event) : event.title}
      </Box>
      {showResizeHandles && (
        <Box
          {...getStyles('eventResizeHandle')}
          mod={{ edge: 'bottom' }}
          onPointerDown={(e: React.PointerEvent) => onResizeStart?.('bottom', e)}
        />
      )}
    </>
  );

  const rootProps = {
    ...getStyles('event'),
    'data-event-id': event.id,
    size,
    title: event.title,
    mod: [
      {
        autoSize,
        hanging,
        draggable,
        dragging: isCurrentlyDragging,
        'any-dragging': isAnyEventDragging,
        static: mode === 'static',
        resizing: isResizing,
        resizable: showResizeHandles,
      },
      mod,
    ],
    ...others,
    draggable: draggable && mode !== 'static',
    tabIndex: mode === 'static' ? -1 : 0,
    onDragStart: mode === 'static' ? undefined : handleDragStart,
    onDragEnd: mode === 'static' ? undefined : handleDragEnd,
    onClick: mode === 'static' ? undefined : others.onClick,
    children: eventChildren,
  };

  if (typeof renderEvent === 'function') {
    return renderEvent(event, rootProps);
  }

  return <UnstyledButton {...rootProps} />;
});

ScheduleEvent.displayName = '@xiaoye-react/ui/ScheduleEvent';
ScheduleEvent.classes = classes;
ScheduleEvent.varsResolver = varsResolver;
