import * as React from 'react';
import { Tabs } from '@xiaoye-react/ui';
import { clsx } from 'clsx';
import throttle from 'lodash/throttle';

import styles from './AffixTabs.module.css';

const listenerEvents: (keyof WindowEventMap)[] = ['scroll', 'resize'];

const VIEW_BALANCE = 32;

const AffixTabs: React.FC = () => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const idsRef = React.useRef<string[]>([]);
  const [loaded, setLoaded] = React.useState(false);
  const [fixedId, setFixedId] = React.useState<string | undefined>(undefined);

  function scrollToId(id: string) {
    const targetNode = document.getElementById(id);

    if (targetNode) {
      const newTop = targetNode.offsetTop - containerRef.current!.offsetHeight - VIEW_BALANCE;
      window.scrollTo({ top: newTop, behavior: 'smooth' });
    }
  }

  React.useEffect(() => {
    const nodeList = document.querySelectorAll<HTMLHeadingElement>('h2[id]');
    idsRef.current = Array.from(nodeList).map<string>(({ id }) => id);
    setLoaded(true);
  }, []);

  React.useEffect(() => {
    const hashId = decodeURIComponent((location.hash || '').slice(1));
    if (hashId) {
      scrollToId(hashId);
    }
  }, [loaded]);

  const onSyncAffix = React.useMemo(() => {
    function doSync() {
      const { scrollY } = window;
      const containerHeight = containerRef.current!.offsetHeight;

      for (let i = idsRef.current.length - 1; i >= 0; i -= 1) {
        const id = idsRef.current[i];
        const current = document.getElementById(id)!;
        const offsetTop = current.offsetTop - containerHeight - VIEW_BALANCE;

        if (offsetTop <= scrollY) {
          setFixedId(id);
          return;
        }
      }

      setFixedId(undefined);
    }

    return throttle(doSync);
  }, []);

  React.useEffect(() => {
    listenerEvents.forEach((event) => {
      window.addEventListener(event, onSyncAffix);
    });
    onSyncAffix();
    return () => {
      listenerEvents.forEach((event) => {
        window.removeEventListener(event, onSyncAffix);
      });
    };
  }, [onSyncAffix]);

  return (
    <div className={clsx(styles.affixTabs, fixedId && styles.affixTabsFixed)} ref={containerRef}>
      <Tabs
        value={fixedId}
        onChange={scrollToId}
        classNames={{ root: styles.tabs, list: styles.tabsList, tab: styles.tab }}
      >
        <Tabs.List position="center">
          {idsRef.current.map((id) => (
            <Tabs.Tab key={id} value={id}>
              <span className={styles.span}>{id.replace(/-/g, ' ')}</span>
            </Tabs.Tab>
          ))}
        </Tabs.List>
      </Tabs>
    </div>
  );
};

export default AffixTabs;
