---
category: Guides
title: Vitest
subtitle: Vitest
description: react-ui Vitest 文档。
---


## 安装

安装 Vitest 和 React Testing Library：

<InstallScript dev packages="vitest jsdom @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event"></InstallScript>

如果你想从 IDE 运行测试，请安装其中一个[扩展](https://vitest.dev/guide/ide)。

## 配置

将 Vitest 配置添加到你的 Vite 配置文件中：


然后在项目根目录创建 `vitest.setup.mjs` 文件，并添加以下代码：


上面的代码模拟了 `window.matchMedia` 和 `ResizeObserver` API，这些 API 在 `jsdom` 环境中不可用，但部分 ReactUI 组件需要它们。

可选地，你可以在 `package.json` 中添加 Vitest 脚本：

```tsx
import { defineConfig } from 'vite';

export default defineConfig({
  // ... 你的其他配置
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.mjs',
  },
});
```

```tsx
import '@testing-library/jest-dom/vitest';

import { vi } from 'vitest';

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

if (!document.fonts) {
  Object.defineProperty(document, 'fonts', {
    writable: true,
    value: { addEventListener: vi.fn(), removeEventListener: vi.fn() },
  });
}

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
```

```json
{
  "scripts": {
    "vitest": "vitest run",
    "vitest:watch": "vitest"
  }
}
```

## 自定义 render

所有 ReactUI 组件都需要在组件树中提供 [UIProvider](/docs/theming/ui-provider/)。
要在测试中的组件树添加 [UIProvider](/docs/theming/ui-provider/)，请创建一个[自定义 render](https://testing-library.com/docs/react-testing-library/setup/#custom-render)函数：


通常，更方便的做法是从 `./testing-utils/index.ts` 文件中导出所有你计划使用的 `@testing-library/*` 函数：


然后你应该从 `./testing-utils` 导入测试工具，而不是 `@testing-library/react`：

```tsx
// ./test-utils/render.tsx
import { render as testingLibraryRender } from '@testing-library/react';
import { UIProvider } from '@xiaoye-react/ui';
// 导入你的 theme 对象
import { theme } from '../src/theme';

export function render(ui: React.ReactNode) {
  return testingLibraryRender(<>{ui}</>, {
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <UIProvider theme={theme} env="test">{children}</UIProvider>
    ),
  });
}
```

```tsx
import userEvent from '@testing-library/user-event';

export * from '@testing-library/react';
export { render } from './render';
export { userEvent };
```

```tsx
import { render, screen } from '../test-utils';
import { Welcome } from './Welcome';

describe('Welcome component', () => {
  it('has correct Next.js theming section link', () => {
    render(<Welcome />);
    expect(screen.getByText('this guide')).toHaveAttribute(
      'href',
      '/guides/next/'
    );
  });
});
```

## 完整设置示例

你可以在 [react-ui-vite-template](https://github.com/react-ui-org/vite-template) 中找到包含完整 Vitest 设置的示例。
