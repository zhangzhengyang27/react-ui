/**
 * 生成 react-ui UIProvider 的主题代码字符串。
 * 入参为 AI 主题生成器产出的配置（{ primaryColor, colors: { brand: [...] } }），
 * 直接映射为 UIThemeOverride 用法示例；无有效配色时返回最简 UIProvider 包装代码。
 */
export function generateThemeCode(themeConfig?: any): string {
  const importLines = ["import { UIProvider } from '@xiaoye-react/ui';"];

  const brand: unknown = themeConfig?.colors?.brand;
  const hasBrand = Array.isArray(brand) && brand.length > 0;

  if (!hasBrand) {
    return [
      ...importLines,
      '',
      '<UIProvider>',
      '  {/* Your App */}',
      '</UIProvider>',
    ].join('\n');
  }

  const primaryColor =
    typeof themeConfig?.primaryColor === 'string' ? themeConfig.primaryColor : 'brand';

  return [
    ...importLines,
    '',
    '<UIProvider',
    '  theme={{',
    `    primaryColor: '${primaryColor}',`,
    '    colors: {',
    '      brand: [',
    ...brand.map((color) => `        '${String(color)}',`),
    '      ],',
    '    },',
    '  }}',
    '>',
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
