import React, { Suspense } from 'react';
import { AiOutlineCheck, AiOutlineCopy } from 'react-icons/ai';
import { CopyButton, Tooltip } from '@react-ui/ui';
import { FormattedMessage } from 'dumi';

import ExpandIcon from '../../icons/ExpandIcon';

interface ActionsProps {
  assetId: string;
  codeExpand: boolean;
  code?: string;
  onCodeExpand: () => void;
}

const Actions: React.FC<ActionsProps> = ({ assetId, codeExpand, code, onCodeExpand }) => {
  const handleCodeExpand = () => {
    window.gtag?.('event', 'demo', { event_category: 'expand', event_label: assetId });
    onCodeExpand();
  };

  return (
    <div className="code-box-actions" style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
      {code && (
        <Tooltip label={<FormattedMessage id="app.demo.code.copy" />}>
          <CopyButton value={code}>
            {({ copied, copy }) => (
              <div
                className="code-copy-icon code-box-code-action"
                tabIndex={0}
                role="button"
                onClick={copy}
              >
                {copied ? <AiOutlineCheck /> : <AiOutlineCopy />}
              </div>
            )}
          </CopyButton>
        </Tooltip>
      )}
      <Tooltip label={<FormattedMessage id={`app.demo.code.${codeExpand ? 'hide' : 'show'}`} />}>
        <div
          className="code-expand-icon code-box-code-action"
          tabIndex={0}
          role="button"
          onClick={handleCodeExpand}
        >
          <ExpandIcon expanded={codeExpand} />
        </div>
      </Tooltip>
    </div>
  );
};

const SuspenseActions: React.FC<React.ComponentProps<typeof Actions>> = (props) => (
  <Suspense fallback={null}>
    <Actions {...props} />
  </Suspense>
);

export default SuspenseActions;
