import React from 'react';
import { AiFillGithub, AiFillHeart } from 'react-icons/ai';
import { Button } from '@xiaoye-react/ui';

interface SponsorButtonProps {
  href?: string;
  label?: string;
}

/**
 * 赞助按钮。
 * 基于 react-ui Button 实现。
 */
const SponsorButton: React.FC<SponsorButtonProps> = ({
  href = 'https://github.com/xiaoye/react-ui',
  label = '在 GitHub 上支持',
}) => {
  return (
    <Button
      component="a"
      href={href}
      target="_blank"
      size="lg"
      variant="default"
      leftSection={<AiFillGithub />}
      rightSection={<AiFillHeart style={{ color: '#cf1322', fontSize: 22 }} />}
      fullWidth={false}
      style={{
        minWidth: 300,
        borderRadius: 8,
        display: 'inline-flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {label}
    </Button>
  );
};

export default SponsorButton;
