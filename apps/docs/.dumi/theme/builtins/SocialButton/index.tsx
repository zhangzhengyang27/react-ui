import React from 'react';
import { Button } from '@xiaoye-react/ui';

import classes from './index.module.css';

export interface SocialButtonProps extends React.ComponentProps<'a'> {
  icon?: React.ReactNode;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, ...others }) => {
  return (
    <Button
      component="a"
      target="_blank"
      rel="noopener noreferrer"
      leftSection={icon}
      radius="md"
      classNames={{
        root: classes.socialButton,
        section: classes.socialButtonSection,
      }}
      {...(others as any)}
    />
  );
};

export default SocialButton;
