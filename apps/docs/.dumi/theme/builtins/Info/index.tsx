import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Alert } from '@xiaoye-react/ui';

interface InfoProps {
  children?: React.ReactNode;
  className?: string;
  color?: string;
  icon?: React.ReactNode;
  title?: React.ReactNode;
}

/**
 * 信息提示框组件。
 * 基于 react-ui Alert 实现。
 * 默认 info 类型，可通过 color 自定义左侧边框色。
 */
const Info: React.FC<InfoProps> = ({ children, color, icon, title }) => {
  return (
    <Alert
      variant="light"
      color="blue"
      icon={icon ?? <AiOutlineInfoCircle />}
      title={title}
      style={{
        margin: 'var(--ui-spacing-md) 0',
        borderLeft: color ? `3px solid ${color}` : undefined,
        backgroundColor: color ? `${color}10` : undefined,
      }}
    >
      {children}
    </Alert>
  );
};

export default Info;
