---
category: Guides
title: Jest
subtitle: Jest
description: react-ui Jest 文档。
---


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

## 模拟 Web API

大多数 ReactUI 组件依赖浏览器 API，如 `window.matchMedia` 或 `ResizeObserver`。
这些 API 在 `jest-environment-jsdom` 环境中不可用，你需要在测试中模拟它们。

在项目根目录创建 `jest.setup.js` 文件，并添加以下代码：


然后在 `jest.config.js` 中将其添加为 setup 文件：

```tsx
import '@testing-library/jest-dom';

const { getComputedStyle } = window;
window.getComputedStyle = (elt) => getComputedStyle(elt);
window.HTMLElement.prototype.scrollIntoView = () => {};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

if (!document.fonts) {
  Object.defineProperty(document, 'fonts', {
    writable: true,
    value: { addEventListener: jest.fn(), removeEventListener: jest.fn() },
  });
}

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;
```

```js
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // ... 你的其他配置
};
```

## 框架特定配置

不同框架的 Jest 配置可能有所不同，并且通常会随时间变化。
要了解如何为你的框架配置 Jest，可以查看 [Jest](https://jestjs.io/docs/getting-started)
和 [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) 文档，
或参考现成的[模板](/getting-started)。大多数模板都包含 Jest 配置，你可以将其作为参考。

## 测试示例

你可以在 ReactUI GitHub Discussions 中找到测试示例：

- [如何测试 Modal/Drawer/Popover 组件？](https://github.com/zhangzhengyang27/react-ui/discussions)
- [如何测试 Select/MultiSelect 组件？](https://github.com/zhangzhengyang27/react-ui/discussions)
