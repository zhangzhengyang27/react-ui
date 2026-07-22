---
category: Hooks
title: UseNetwork
subtitle: 网络状态
description: react-ui 网络状态 Hook 文档。
---


## 用法

`use-network` Hook 返回一个包含当前连接状态的对象：

<code src="./use-network/demo/usage.tsx"></code>

## 浏览器支持

`use-network` 使用实验性的 `navigator.connection` API。请查看[浏览器兼容性表](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/connection#browser_compatibility)。

## 类型定义

```tsx

interface UserNetworkReturnValue {
  online: boolean;
  downlink?: number;
  downlinkMax?: number;
  effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
  rtt?: number;
  saveData?: boolean;
  type?: 'bluetooth' | 'cellular' | 'ethernet' | 'wifi' | 'wimax' | 'none' | 'other' | 'unknown';
}

function useNetwork(): UserNetworkReturnValue;
```

## 导出类型

`UserNetworkReturnValue` 类型从 `@xiaoye-react/hooks` 包导出，
可在应用中导入：

```tsx
import type { UserNetworkReturnValue } from '@xiaoye-react/hooks';
```
