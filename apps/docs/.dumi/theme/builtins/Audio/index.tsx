import React from 'react';
import { AiOutlineSound } from 'react-icons/ai';

import classes from './index.module.css';

interface AudioProps {
  id?: string;
}

const AudioControl: React.FC<React.PropsWithChildren<AudioProps>> = ({ id, children }) => {
  const onClick: React.MouseEventHandler<HTMLAnchorElement> = () => {
    const audio = document.querySelector<HTMLAudioElement>(`#${id}`);
    audio?.play();
  };
  return (
    <a className={classes.playBtn} onClick={onClick}>
      {children}
      <AiOutlineSound className={classes.icon} />
    </a>
  );
};

export default AudioControl;
