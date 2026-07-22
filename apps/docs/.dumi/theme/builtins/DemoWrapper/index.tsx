import React, { Suspense } from 'react';
import { AiOutlineBug, AiOutlineCode } from 'react-icons/ai';
import { ActionIcon, Tooltip } from '@xiaoye-react/ui';
import type { IDumiDemoGridProps } from 'dumi';
import { DumiDemo, FormattedMessage } from 'dumi';

import useLayoutState from '../../../hooks/useLayoutState';
import DemoContext from '../../slots/DemoContext';
import DemoFallback from '../Previewer/DemoFallback';

const DemoWrapper: React.FC<IDumiDemoGridProps> = ({ items }) => {
  const { showDebug, setShowDebug } = React.use(DemoContext);

  const [expandAll, setExpandAll] = useLayoutState(false);

  const handleVisibleToggle = () => {
    setShowDebug?.(!showDebug);
  };

  const handleExpandToggle = () => {
    setExpandAll(!expandAll);
  };

  const demos = React.useMemo(
    () =>
      items.reduce<typeof items>((acc, item) => {
        const { previewerProps } = item;
        const { debug } = previewerProps;
        if (debug && !showDebug) {
          return acc;
        }
        return acc.concat({
          ...item,
          previewerProps: {
            ...previewerProps,
            expand: expandAll,
            // always override debug property, because dumi will hide debug demo in production
            debug: false,
            /**
             * extra marker for the original debug
             * @see https://github.com/ant-design/ant-design/pull/40130#issuecomment-1380208762
             */
            originDebug: debug,
          },
        });
      }, []),
    [expandAll, items, showDebug],
  );

  return (
    <div className="demo-wrapper">
      <style>{`:root { --antd-site-api-deprecated-display: ${showDebug ? 'table-row' : 'none'}; }`}</style>
      <span className="all-code-box-controls">
        <Tooltip
          label={
            <FormattedMessage id={`app.component.examples.${expandAll ? 'collapse' : 'expand'}`} />
          }
        >
          <ActionIcon
            variant="subtle"
            size="sm"
            onClick={handleExpandToggle}
            className={expandAll ? 'icon-enabled' : ''}
            aria-label="toggle expand"
          >
            <AiOutlineCode />
          </ActionIcon>
        </Tooltip>
        <Tooltip
          label={
            <FormattedMessage id={`app.component.examples.${showDebug ? 'hide' : 'visible'}`} />
          }
        >
          <ActionIcon
            variant="subtle"
            size="sm"
            onClick={handleVisibleToggle}
            className={showDebug ? 'icon-enabled' : ''}
            aria-label="toggle debug"
          >
            <AiOutlineBug />
          </ActionIcon>
        </Tooltip>
      </span>
      <div className="demo-stack">
        {demos.map((item) => (
          <Suspense key={item.demo.id} fallback={<DemoFallback />}>
            <DumiDemo {...item} />
          </Suspense>
        ))}
      </div>
    </div>
  );
};

export default DemoWrapper;
