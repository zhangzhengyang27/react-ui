import React from 'react';
import { Checkbox, Text } from '@react-ui/ui';
import InstallDependencies from '../InstallDependencies';
import { PACKAGES_DATA } from './data';

import classes from './index.module.css';

interface PackagesInstallationProps {
  extraPackages?: string[];
}

function getPackagesList(selection: string[], extraPackages: string[]) {
  const packages = selection.reduce<string[]>((acc, item) => {
    const found = PACKAGES_DATA.find((i) => i.package === item);
    if (found) {
      acc.push(...found.dependencies);
    }
    return acc;
  }, []);

  const unique = Array.from(
    new Set(['@react-ui/ui', '@react-ui/hooks', ...packages, ...extraPackages]),
  );
  return unique.join(' ');
}

/**
 * 多包安装选择表格。
 * 基于 react-ui Checkbox + 原生表格 + InstallDependencies 实现。
 */
const PackagesInstallation: React.FC<PackagesInstallationProps> = ({ extraPackages = [] }) => {
  const [selection, setSelection] = React.useState<string[]>([
    '@react-ui/ui',
    '@react-ui/hooks',
  ]);

  const toggleSelection = (item: string) => {
    setSelection((current) =>
      current.includes(item) ? current.filter((i) => i !== item) : [...current, item],
    );
  };

  const selectAll = () => {
    setSelection((current) =>
      current.length === PACKAGES_DATA.length ? [] : PACKAGES_DATA.map((item) => item.package),
    );
  };

  const allChecked = selection.length === PACKAGES_DATA.length;
  const indeterminate = selection.length > 0 && selection.length < PACKAGES_DATA.length;

  const installCommand = `npm install ${getPackagesList(selection, extraPackages)}`;
  const yarnCommand = `yarn add ${getPackagesList(selection, extraPackages)}`;
  const pnpmCommand = `pnpm add ${getPackagesList(selection, extraPackages)}`;
  const bunCommand = `bun add ${getPackagesList(selection, extraPackages)}`;

  return (
    <div className={classes.wrapper}>
      <Text component="p" style={{ marginBottom: 8 }}>
        选择你需要在应用中使用的包：
      </Text>
      <table className={classes.table}>
        <thead>
          <tr>
            <th className={classes.cellCheckbox}>
              <Checkbox
                checked={selection.length > 0}
                indeterminate={indeterminate}
                onChange={selectAll}
              />
            </th>
            <th className={classes.cellPackage}>包</th>
            <th className={classes.cellDesc}>说明</th>
          </tr>
        </thead>
        <tbody>
          {PACKAGES_DATA.map((item) => (
            <tr
              key={item.package}
              className={classes.row}
              onClick={() => toggleSelection(item.package)}
            >
              <td className={classes.cellCheckbox}>
                <Checkbox
                  checked={selection.includes(item.package)}
                  onChange={() => toggleSelection(item.package)}
                />
              </td>
              <td className={classes.cellPackage}>
                <Text component="code" span>
                  {item.package}
                </Text>
              </td>
              <td className={classes.cellDesc}>{item.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Text component="p" style={{ marginTop: 16, marginBottom: 8 }}>
        安装依赖：
      </Text>
      <InstallDependencies
        npm={installCommand}
        yarn={yarnCommand}
        pnpm={pnpmCommand}
        bun={bunCommand}
      />
    </div>
  );
};

export default PackagesInstallation;
