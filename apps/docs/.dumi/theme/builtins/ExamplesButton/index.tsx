import React from 'react';
import { AiOutlineExport } from 'react-icons/ai';
import { Button } from '@xiaoye-react/ui';

interface ExamplesButtonProps {
  label: string;
  link: string;
}

/**
 * 示例跳转按钮。
 * 基于 react-ui Button 实现。
 */
const ExamplesButton: React.FC<ExamplesButtonProps> = ({ label, link }) => {
  return (
    <Button
      component="a"
      href={link}
      target="_blank"
      fullWidth
      size="lg"
      variant="default"
      rightSection={<AiOutlineExport />}
      style={{
        height: 50,
        paddingInline: 20,
        borderRadius: 8,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      {label}
    </Button>
  );
};

export default ExamplesButton;
