import React from 'react';
import { Card, Stack, Text, Title } from '@xiaoye-react/ui';

import classes from './Simple.module.css';

interface SimplePreviewProps {
  style?: React.CSSProperties;
  className?: string;
  inherit?: boolean;
}

const SimplePreview: React.FC<SimplePreviewProps> = ({ style, className }) => {
  return (
    <div className={`${classes.root} ${className || ''}`} style={style}>
      <Stack gap="md">
        <Title order={5}>主题预览</Title>
        <Card withBorder padding="sm">
          <Title order={6} className={classes.cardTitle}>
            卡片
          </Title>
          <Text component="p" c="dimmed" size="sm">
            示例内容
          </Text>
        </Card>
      </Stack>
    </div>
  );
};

export default SimplePreview;
