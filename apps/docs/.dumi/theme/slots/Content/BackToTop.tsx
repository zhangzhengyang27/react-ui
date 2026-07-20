import React from 'react';
import { AiOutlineArrowUp } from 'react-icons/ai';
import { ActionIcon, Tooltip } from '@react-ui/ui';
import { useWindowScroll } from '@react-ui/hooks';

import classes from './BackToTop.module.css';

const SHOW_THRESHOLD = 400;

const BackToTop: React.FC = () => {
  const [{ y }, scrollTo] = useWindowScroll();
  const visible = y > SHOW_THRESHOLD;

  if (!visible) {
    return null;
  }

  return (
    <Tooltip label="Back to top" position="left">
      <ActionIcon
        className={classes.root}
        variant="default"
        size="lg"
        aria-label="Back to top"
        onClick={() => scrollTo({ y: 0 })}
      >
        <AiOutlineArrowUp />
      </ActionIcon>
    </Tooltip>
  );
};

export default BackToTop;
