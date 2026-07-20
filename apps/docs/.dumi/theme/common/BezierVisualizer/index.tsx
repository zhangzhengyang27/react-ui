import React, { useMemo } from 'react';
import { Button, Flex, Tooltip, Text } from '@react-ui/ui';

import useLocale from '../../../hooks/useLocale';
import ExternalLinkIcon from '../../icons/ExternalLinkIcon';
import Visualizer from './Visualizer';

export interface BezierVisualizerProps {
  value: string;
}

const RE = /^cubic-bezier\((.*)\)$/;

const locales = {
  cn: {
    open: '在 cubic-bezier.com 中打开',
  },
  en: {
    open: 'Open in cubic-bezier.com',
  },
};

const BezierVisualizer: React.FC<BezierVisualizerProps> = (props) => {
  const { value } = props;
  const [locale] = useLocale(locales);

  const controls = useMemo(() => {
    const m = RE.exec(value.toLowerCase().trim());
    if (m) {
      return m[1].split(',').map((v) => Number.parseFloat(v.trim())) as [
        number,
        number,
        number,
        number,
      ];
    }
    return null;
  }, [value]);

  if (!controls) {
    return null;
  }

  return (
    <Flex direction="column" gap="sm">
      <Visualizer controls={controls} />
      <Flex align="center">
        <Text>{value}</Text>
        <Tooltip label={locale.open}>
          <Button
            variant="transparent"
            color="blue"
            component="a"
            href={`https://cubic-bezier.com/#${controls.join(',')}`}
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLinkIcon />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default BezierVisualizer;
