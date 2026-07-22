/** 把 camelCase 转为 kebab-case，例如 colorPrimary -> color-primary */
function toKebabCase(key: string): string {
  return key.replace(/([A-Z])/g, '-$1').toLowerCase();
}

/** 把 token key 转换为 react-ui CSS 变量名，例如 colorPrimary -> --ui-color-primary */
function tokenKeyToCssVar(key: string): string {
  return `--ui-${toKebabCase(key)}`;
}

/** 把 token 对象序列化为字符串（不再处理 function 类型，已移除 antd algorithm 相关逻辑） */
function stringifyValue(value: unknown, depth = 0): string {
  const indent = '  '.repeat(depth + 1);
  const closingIndent = '  '.repeat(depth);

  if (value === undefined) {
    return 'undefined';
  }
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'boolean') {
    return String(value);
  }
  if (typeof value === 'number') {
    return String(value);
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }
    const items = value.map((item) => `${indent}${stringifyValue(item, depth + 1)}`);
    return `[\n${items.join(',\n')},\n${closingIndent}]`;
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>).filter(
      ([, v]) => v !== undefined,
    );
    if (entries.length === 0) {
      return '{}';
    }
    const items = entries.map(([k, v]) => `${indent}${k}: ${stringifyValue(v, depth + 1)}`);
    return `{\n${items.join(',\n')},\n${closingIndent}}`;
  }

  return String(value);
}

/**
 * 生成 react-ui UIProvider 的主题代码字符串。
 * - 无 themeConfig 或无 token 时返回最简 UIProvider 包装代码。
 * - 含 token 时把 token 转换为 CSS 变量覆盖代码（通过 <style> 注入到 :root）。
 */
export function generateThemeCode(themeConfig?: any): string {
  const importLines = ["import { UIProvider } from '@xiaoye-react/ui';"];

  const token = themeConfig?.token;
  const tokenKeys = token && typeof token === 'object' ? Object.keys(token) : [];

  if (tokenKeys.length === 0) {
    return [
      ...importLines,
      '',
      '<UIProvider>',
      '  {/* Your App */}',
      '</UIProvider>',
    ].join('\n');
  }

  const cssDeclarations = tokenKeys
    .map((key) => {
      const cssVar = tokenKeyToCssVar(key);
      const rawValue = (token as Record<string, unknown>)[key];
      const cssValue = typeof rawValue === 'string' ? rawValue : stringifyValue(rawValue);
      return `${cssVar}: ${cssValue};`;
    })
    .join(' ');

  const styleContent = `:root { ${cssDeclarations} }`;

  return [
    ...importLines,
    '',
    '<UIProvider>',
    '  <style>{`' + styleContent + '`}</style>',
    '  {/* Your App */}',
    '</UIProvider>',
  ].join('\n');
}

/**
 * 生成可复制的完整文件代码。简化实现（已移除 antd algorithm / hook 解析逻辑）：
 * - 若传入 copyCode，将其作为主题定义片段单独成文件，App.tsx 使用 UIProvider 包裹。
 * - 否则使用 generateThemeCode 生成 UIProvider 使用代码（含 token CSS 变量覆盖）。
 */
export function generateFullCopyFile(params: { themeConfig?: any; copyCode?: string }): string {
  const { themeConfig, copyCode } = params;

  if (copyCode?.trim()) {
    return [
      '// ========== theme.ts ==========',
      '',
      copyCode.trim(),
      '',
      '// ========== App.tsx ==========',
      '',
      "import React from 'react';",
      "import { UIProvider } from '@xiaoye-react/ui';",
      '',
      'export default () => {',
      '  return (',
      '    <UIProvider>',
      '      {/* Your App */}',
      '    </UIProvider>',
      '  );',
      '};',
    ].join('\n');
  }

  return ['// ========== App.tsx ==========', '', generateThemeCode(themeConfig)].join('\n');
}
