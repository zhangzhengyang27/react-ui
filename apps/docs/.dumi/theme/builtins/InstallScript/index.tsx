import React, { useState } from 'react';
import { AiOutlineCopy } from 'react-icons/ai';
import { SegmentedControl, Notifications } from '@xiaoye-react/ui';

import classes from './index.module.css';

type PM = 'npm' | 'yarn' | 'pnpm' | 'bun';

const PM_ORDER: PM[] = ['npm', 'yarn', 'pnpm', 'bun'];

function buildCommand(pm: PM, pkgs: string[], dev?: boolean): string {
  const list = pkgs.join(' ');
  switch (pm) {
    case 'npm':
      return `npm install ${dev ? '--save-dev ' : ''}${list}`;
    case 'yarn':
      return `yarn add ${dev ? '--dev ' : ''}${list}`;
    case 'pnpm':
      return `pnpm add ${dev ? '-D ' : ''}${list}`;
    case 'bun':
      return `bun add ${dev ? '--dev ' : ''}${list}`;
  }
}

interface InstallScriptProps {
  packages?: string[] | string;
  dev?: boolean;
}

/**
 * 多包安装命令组件。
 * 基于 react-ui SegmentedControl + 自定义复制按钮，支持 npm / yarn / pnpm / bun 切换。
 */
const InstallScript: React.FC<InstallScriptProps> = ({ packages, dev }) => {
  const [pm, setPm] = useState<PM>('npm');
  const pkgList = Array.isArray(packages)
    ? packages
    : (packages ?? '@xiaoye-react/ui').split(/\s+/).filter(Boolean);
  const cmd = buildCommand(pm, pkgList, dev);

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

export default InstallScript;
