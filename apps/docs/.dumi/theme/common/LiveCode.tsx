import type { ComponentProps, FC } from 'react';
import React from 'react';
import SourceCodeEditor from 'dumi/theme-default/slots/SourceCodeEditor';

import LiveError from '../slots/LiveError';

import classes from './LiveCode.module.css';

const LiveCode: FC<
  {
    error: Error | null;
  } & Pick<ComponentProps<typeof SourceCodeEditor>, 'lang' | 'initialValue' | 'onChange'>
> = (props) => {
  return (
    <div className={classes.editor}>
      <SourceCodeEditor
        lang={props.lang}
        initialValue={props.initialValue}
        onChange={props.onChange}
      />
      <LiveError error={props.error} />
    </div>
  );
};

export default LiveCode;
