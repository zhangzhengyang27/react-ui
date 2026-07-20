import * as React from 'react';
import { clsx } from 'clsx';

import classes from './Marker.module.css';

export interface MarkerProps {
  rect: {
    left: number;
    top: number;
    width: number;
    height: number;
    visible: boolean;
  };
  primary?: boolean;
}

const Marker = React.memo<MarkerProps>((props) => {
  const { rect, primary, ...restProps } = props;

  const rectRef = React.useRef(rect);
  if (rect.visible) {
    rectRef.current = rect;
  }

  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    setVisible(rect.visible);
  }, [rect.visible]);

  const mergedRect = rectRef.current;

  return (
    <div
      className={clsx(
        classes.marker,
        visible && classes.markerActive,
        primary && classes.markerPrimary,
      )}
      style={
        {
          '--rect-left': mergedRect.left,
          '--rect-top': mergedRect.top,
          '--rect-width': mergedRect.width,
          '--rect-height': mergedRect.height,
        } as React.CSSProperties
      }
      {...restProps}
    />
  );
});

export default Marker;
