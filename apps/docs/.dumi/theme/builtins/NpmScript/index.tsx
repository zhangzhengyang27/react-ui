import React, { useState } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';
import { SegmentedControl, Notifications } from '@xiaoye-react/ui';

import classes from './index.module.css';

type PM = 'npm' | 'yarn' | 'pnpm' | 'bun';

const PM_ORDER: PM[] = ['npm', 'yarn', 'pnpm', 'bun'];

function buildCommand(pm: PM, pkg: string, dev?: boolean): string {
  switch (pm) {
    case 'npm':
      return `npm install ${dev ? '--save-dev ' : ''}${pkg}`;
    case 'yarn':
      return `yarn add ${dev ? '--dev ' : ''}${pkg}`;
    case 'pnpm':
      return `pnpm add ${dev ? '-D ' : ''}${pkg}`;
    case 'bun':
      return `bun add ${dev ? '--dev ' : ''}${pkg}`;
  }
}

interface NpmScriptProps {
  pkg?: string;
  packages?: string[] | string;
  dev?: boolean;
}

/**
 * 单包安装命令组件。
 * 基于 react-ui SegmentedControl + 自定义复制按钮，支持 npm / yarn / pnpm / bun 切换。
 */
const NpmScript: React.FC<NpmScriptProps> = ({ pkg, packages, dev }) => {
  const [pm, setPm] = useState<PM>('npm');
  const target = pkg
    ? pkg
    : Array.isArray(packages)
      ? packages.join(' ')
      : (packages ?? '@xiaoye-react/ui');
  const cmd = buildCommand(pm, target, dev);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(cmd);
      Notifications.show({ title: '已复制', message: cmd, color: 'green' });
    } catch {
      Notifications.show({ title: '复制失败', color: 'red' });
    }
  };

  return (
    <div className={classes.wrapper}>
      <SegmentedControl
        data={PM_ORDER.map((p) => ({ label: p, value: p }))}
        value={pm}
        onChange={(v) => setPm(v as PM)}
      />
      <div className={classes.codeWrapper}>
        <pre className={classes.pre}>
          <code>{cmd}</code>
        </pre>
        <button type="button" className={classes.copyBtn} onClick={onCopy} aria-label="copy">
          <AiOutlineCopy />
        </button>
      </div>
    </div>
  );
};

export default NpmScript;
