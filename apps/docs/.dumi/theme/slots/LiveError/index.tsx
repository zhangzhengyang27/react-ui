import type { FC } from 'react';
import React from 'react';
import { Alert } from '@react-ui/ui';

const LiveError: FC<{ error: Error | null }> = ({ error }) => {
  if (!error) {
    return null;
  }

  return (
    <Alert variant="light" color="red" style={{ borderRadius: 0 }}>
      {error.toString()}
    </Alert>
  );
};

export default LiveError;
