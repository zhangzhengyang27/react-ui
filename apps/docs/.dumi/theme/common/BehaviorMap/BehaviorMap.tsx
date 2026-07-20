import React, { useEffect, useRef } from 'react';
import { useRouteMeta } from 'dumi';

import useLocale from '../../../hooks/useLocale';
import { useMermaidCode } from './useMermaidCode';
import styles from './BehaviorMap.module.css';

export interface BehaviorMapItem {
  id: string;
  label: string;
  targetType?: 'mvp' | 'extension';
  children?: BehaviorMapItem[];
  link?: string;
}

export interface BehaviorMapProps {
  data: BehaviorMapItem;
}

const locales = {
  cn: {
    MVPPurpose: 'MVP 行为目的',
    extensionPurpose: '拓展行为目的',
    behaviorMap: '行为模式地图',
  },
  en: {
    MVPPurpose: 'MVP behavior purpose',
    extensionPurpose: 'Extension behavior purpose',
    behaviorMap: 'Behavior Map',
  },
};

const BehaviorMap: React.FC<BehaviorMapProps> = ({ data }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [locale] = useLocale(locales);
  const meta = useRouteMeta();

  const mermaidCode = useMermaidCode(data);

  const cancelledRef = useRef<boolean>(false);

  useEffect(() => {
    cancelledRef.current = false;

    const renderChart = async () => {
      if (!chartRef.current || !mermaidCode) {
        return;
      }

      try {
        const mermaid = (await import('mermaid')).default;

        if (cancelledRef.current) {
          return;
        }

        mermaid.initialize({
          startOnLoad: false,
          theme: 'base',
          securityLevel: 'strict',
          flowchart: {
            htmlLabels: true,
            curve: 'linear',
            rankSpacing: 150,
            nodeSpacing: 10,
          },
        });

        const id = `mermaid-${Date.now()}`;

        const { svg } = await mermaid.render(id, mermaidCode);

        if (!cancelledRef.current && chartRef.current) {
          chartRef.current.innerHTML = svg;
        }
      } catch {
        if (!cancelledRef.current && chartRef.current) {
          chartRef.current.innerHTML = 'Render Error';
        }
      }
    };

    renderChart();

    return () => {
      cancelledRef.current = true;
    };
  }, [mermaidCode]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>{`${meta.frontmatter.title} ${locale.behaviorMap}`}</div>
      <div ref={chartRef} className={styles.chartContainer} />
      <div className={styles.tips}>
        <div className={styles.mvp}>{locale.MVPPurpose}</div>
        <div className={styles.extension}>{locale.extensionPurpose}</div>
      </div>
    </div>
  );
};

export default BehaviorMap;
