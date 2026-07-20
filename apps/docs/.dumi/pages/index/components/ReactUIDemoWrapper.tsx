import React from 'react';
import { UIProvider } from '@react-ui/ui';

interface ReactUIDemoWrapperProps {
  children: React.ReactNode;
  colorScheme?: 'light' | 'dark';
}

const ReactUIDemoWrapper: React.FC<ReactUIDemoWrapperProps> = ({ children, colorScheme }) => {
  return <UIProvider colorScheme={colorScheme}>{children}</UIProvider>;
};

export default ReactUIDemoWrapper;
