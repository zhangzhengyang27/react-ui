import cx from 'clsx';
import { BoxProps, Button, ElementProps } from '@react-ui/ui';
import classes from './SocialButton.module.css';

export interface SocialButtonProps extends BoxProps, ElementProps<'a', 'type'> {
  icon?: React.ReactNode;
}

export function SocialButton({ icon, ...others }: SocialButtonProps) {
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
      {...others}
    />
  );
}
