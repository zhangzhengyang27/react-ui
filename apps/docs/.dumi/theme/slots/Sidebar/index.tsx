import React from 'react';
import { clsx } from 'clsx';
import { Box, ScrollArea } from '@xiaoye-react/ui';

import useMenu, { DocsMenuItem } from '../../../hooks/useMenu';

import classes from './Sidebar.module.css';

interface DocsMenuProps {
  items: DocsMenuItem[];
  selectedKey: string;
}

/**
 * 文档菜单：平铺结构，完全照抄 ant.design 侧边栏 Menu 布局。
 * - 顶层叶子项 -> 直接渲染为菜单项
 * - 顶层分组（有 children）-> 分组标题 + 平铺子项
 * - 二级分组（type: 'group'）-> 子分组标题 + 平铺子项
 */
/** 提取 React 节点的纯文本，用于按标题去重（dumi 会把页面目录下的实现文件
 * 也注册成同名子路由，导致侧边栏出现重复项） */
const nodeText = (node: React.ReactNode): string => {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join('');
  if (React.isValidElement(node)) return nodeText((node.props as { children?: React.ReactNode })?.children);
  return '';
};

const DocsMenu: React.FC<DocsMenuProps> = ({ items, selectedKey }) => {
  const seenLabels = new Set<string>();
  const renderLeaf = (item: DocsMenuItem, extraClass?: string) => {
    const label = nodeText(item.label);
    if (label && seenLabels.has(label)) return null;
    if (label) seenLabels.add(label);
    return (
      <div
        key={item.key}
        className={clsx(
          classes.menuItem,
          extraClass,
          item.key === selectedKey && classes.menuItemActive,
        )}
      >
        {item.label}
      </div>
    );
  };

  const renderChildren = (children: DocsMenuItem[]) =>
    children.map((child) => {
      if (child.children) {
        // 二级分组（/docs/spec 分类）
        return (
          <div key={child.key} className={classes.menuGroup}>
            <div className={classes.subGroupTitle}>{child.label}</div>
            {child.children.map((leaf) => renderLeaf(leaf, classes.subGroupItem))}
          </div>
        );
      }
      return renderLeaf(child);
    });

  return (
    <div className={classes.menuRoot}>
      {items.map((item) => {
        if (item.children) {
          return (
            <div key={item.key} className={classes.menuGroup}>
              <div className={classes.groupTitle}>{item.label}</div>
              {renderChildren(item.children)}
            </div>
          );
        }
        return renderLeaf(item);
      })}
    </div>
  );
};

const Sidebar: React.FC = () => {
  const [menuItems, selectedKey] = useMenu();

  return (
    <Box className={classes.mainMenu}>
      <ScrollArea h="calc(100vh - 64px)" scrollbarSize={8}>
        <Box className={classes.asideContainer}>
          <DocsMenu items={menuItems} selectedKey={selectedKey} />
        </Box>
      </ScrollArea>
    </Box>
  );
};

export default Sidebar;
