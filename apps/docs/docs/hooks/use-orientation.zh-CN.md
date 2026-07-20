---
category: Hooks
title: UseOrientation
subtitle: 屏幕方向
description: react-ui 屏幕方向 Hook 文档。
---


## 用法

`useOrientation` Hook 返回一个包含设备当前方向的对象：

<code src="./use-orientation/demo/usage.tsx"></code>

## 类型定义

```tsx
interface UseOrientationOptions {
  /** 默认角度值，在获取到真实值之前使用（在服务端渲染期间和页面 JS 执行之前）。
   * 如果未提供，默认值为 `0`。
   * */
  defaultAngle?: number;

  /** 默认类型值，在获取到真实值之前使用（在服务端渲染期间和页面 JS 执行之前）。
   * 如果未提供，默认值为 `'landscape-primary'`。
   * */
  defaultType?: OrientationType;

  /** 如果为 true，初始值将在 useEffect 中解析（SSR 安全）。
   *  如果为 false，初始值将在 useLayoutEffect 中解析（SSR 不安全）。
   *  默认为 true。
   */
  getInitialValueInEffect?: boolean;
}

interface UseOrientationReturnType {
  angle: number;
  type: OrientationType;
}

function useOrientation(options?: UseOrientationOptions): UseOrientationReturnType;
```

## 导出类型

`UseOrientationOptions` 和 `UseOrientationReturnType` 类型从 `@react-ui/hooks` 包导出，
可在应用中导入：

```tsx
import type { UseOrientationOptions, UseOrientationReturnType } from '@react-ui/hooks';
```
