import { useState } from 'react';
import { Checkbox, Code, Table, Text } from '@react-ui/ui';
import { MdxInstallScript } from '../MdxInstallScript/MdxInstallScript';
import { MdxParagraph } from '../MdxTypography/MdxTypography';
import { PACKAGES_DATA } from './data';
import classes from './MdxPackagesInstallation.module.css';

function getPackagesList(selection: string[], extraPackages: string[]) {
  const packages = selection.reduce<string[]>((acc, item) => {
    acc.push(...PACKAGES_DATA.find((i) => i.package === item)!.dependencies);
    return acc;
  }, []);

  const unique = Array.from(
    new Set(['@react-ui/ui', '@react-ui/hooks', ...packages, ...extraPackages])
  );
  return unique.join(' ');
}

interface MdxPackagesInstallation {
  extraPackages?: string[];
}

export function MdxPackagesInstallation({ extraPackages = [] }: MdxPackagesInstallation) {
  const [selection, setSelection] = useState(['@react-ui/ui', '@react-ui/hooks']);
  const toggleSelection = (item: string) =>
    setSelection((current) =>
      current.includes(item) ? current.filter((i) => i !== item) : [...current, item]
    );
  const selectAll = () =>
    setSelection((current) =>
      current.length === PACKAGES_DATA.length ? [] : PACKAGES_DATA.map((item) => item.package)
    );

  const rows = PACKAGES_DATA.map((item) => (
    <Table.Tr
      key={item.package}
      className={classes.row}
      onClick={() => toggleSelection(item.package)}
    >
      <Table.Td>
        <Checkbox
          checked={selection.includes(item.package)}
          onChange={() => {}}
          className={classes.checkbox}
        />
      </Table.Td>
      <Table.Td>
        <Code>{item.package}</Code>
      </Table.Td>
      <Table.Td className={classes.hiddenMobile}>
        <Text fz="sm">{item.description}</Text>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <MdxParagraph>选择你需要在应用中使用的包：</MdxParagraph>
      <Table mb="xl">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Checkbox
                onChange={selectAll}
                checked={selection.length > 0}
                indeterminate={selection.length < PACKAGES_DATA.length && selection.length > 0}
              />
            </Table.Th>
            <Table.Th>包</Table.Th>
            <Table.Th className={classes.hiddenMobile}>说明</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <tbody>{rows}</tbody>
      </Table>

      <MdxParagraph>安装依赖：</MdxParagraph>

      <MdxInstallScript packages={getPackagesList(selection, extraPackages)} />
    </>
  );
}
