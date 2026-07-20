import React from 'react';
import { AiOutlineRobot } from 'react-icons/ai';
import { Button } from '@react-ui/ui';

import classes from './index.module.css';

interface LlmButtonProps {
  href: string;
}

/**
 * LLMs.md 跳转按钮。
 * 基于 react-ui Button 实现。
 */
const LlmButton: React.FC<LlmButtonProps> = ({ href }) => {
  return (
    <Button
      component="a"
      href={href}
      target="_blank"
      size="lg"
      variant="default"
      rightSection={<AiOutlineRobot style={{ color: '#cf1322', fontSize: 22 }} />}
      className={classes.button}
    >
      使用大语言模型迁移
    </Button>
  );
};

export default LlmButton;
