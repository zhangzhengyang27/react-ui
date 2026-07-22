---
category: Components
title: Typography
subtitle: 排版
description: react-ui Typography 排版组件。
group:
  title: 通用
  order: 1
---

## 何时使用 {#when-to-use}

需要集中管理文字排版相关的所有组件（Text/Title/Code 等）时使用。

## 代码演示 {#examples}

### 用法

ReactUI 不包含排版全局样式。
使用 `Typography` 为 HTML 内容添加排版样式：

```tsx
import { Typography } from '@xiaoye-react/ui';

function Demo() {
  return (
    <Typography>
      <div
        dangerouslySetInnerHTML={{ __html: '<p>你的 HTML 在这里</p>' }}
      />
    </Typography>
  );
}
```

### 示例

<code src="./demo/usage.tsx"></code>

### 全部样式演示

`Typography` 包含以下样式：

- 段落
- 标题
- 列表
- 引用块
- 表格
- 链接
- 图片
- 水平分割线
- 键盘按键
- 代码和预格式化文本

<code src="./demo/all.tsx"></code>



## API {#api}

### TypographyProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 子元素 | `ReactNode` | — |

支持所有原生 HTML 属性。

## FAQ {#faq}

### 为什么需要 UIProvider？

参见 [Button FAQ](/components/button#faq)。
