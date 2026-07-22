---
category: X
title: Dropzone
subtitle: 拖拽上传
description: react-ui Dropzone 文档。
---


## 安装

<InstallScript packages="@xiaoye-react/ui"></InstallScript>

安装完成后，在应用根目录导入包样式：

```tsx
import '@xiaoye-react/ui/styles.css';
// ‼️ dropzone 样式必须在核心包样式之后导入
import '@xiaoye-react/dropzone/styles.css';
```

## 用法

`Dropzone` 允许你从用户处捕获一个或多个文件。该组件基于 [react-dropzone](https://react-dropzone.js.org/)，并支持其核心功能：

- 根据提供的 mime 类型接受/拒绝文件
- 限制单个文件大小
- 渲染给定的子元素，并提供基于上下文的组件，根据当前状态显示元素

<code src="./dropzone/demo/usage.tsx"></code>

## Dropzone.Accept、Dropzone.Reject 和 Dropzone.Idle

`Dropzone.Accept`、`Dropzone.Reject` 和 `Dropzone.Idle` 组件仅在用户执行特定操作时可见：

- `Dropzone.Accept` 仅在用户拖拽可被接受的文件到 dropzone 上时可见
- `Dropzone.Reject` 仅在用户拖拽无法被接受的文件到 dropzone 上时可见
- `Dropzone.Idle` 在用户没有拖拽任何文件到 dropzone 上时可见

## 加载状态

设置 `loading` 属性以使用 [LoadingOverlay](/components/loading-overlay/) 组件指示加载状态。当 `loading` 属性为 true 时，用户无法拖放或选择新文件（`Dropzone` 变为禁用状态）：

<code src="./dropzone/demo/loading.tsx"></code>

## 禁用状态

如果你想实现自己的加载状态，可以在不使用 `LoadingOverlay` 的情况下禁用 `Dropzone`。与 `loading` 相同，当 `Dropzone` 被禁用时，用户无法拖放或选择新文件：

<code src="./dropzone/demo/disabled.tsx"></code>

## 手动打开文件浏览器

要从组件外部打开文件浏览器，请使用 `openRef` 属性获取一个会触发文件浏览器的函数：

<code src="./dropzone/demo/manual.tsx"></code>

## 启用子元素指针事件

默认情况下，Dropzone 会禁用其子元素的指针事件，以便拖拽事件正常工作。当 `activateOnClick={false}` 时，点击 Dropzone 内的任何子元素都不会有任何反应。
不过，你可以设置样式 `pointerEvents: 'all'` 使子元素可点击。注意，你只需要在交互元素（如按钮或链接）上设置这些样式。

<code src="./dropzone/demo/enableChildPointerEvent.tsx"></code>

## MIME 类型

要指定文件类型，请提供一个对象，键设置为 [mime 类型](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types)，值为文件扩展名数组。更多接受特定文件类型的示例可以在 [react-dropzone 文档](https://react-dropzone.js.org/#section-accepting-specific-file-types) 中找到。


你也可以通过向 `accept` 属性提供 mime 类型数组来指定文件类型：


为了节省研究时间，你可以使用 `@xiaoye-react/dropzone` 导出的 `MIME_TYPES` 变量：


`MIME_TYPES` 包含以下数据：

<DataTable head={['键', 'Mime 类型']} data={Object.keys(MIME_TYPES).map((key) => [key, MIME_TYPES[key]])}></DataTable>

此外，你还可以使用分组的 mime 类型：

<DataTable head={['变量', 'Mime 类型']} data={[ ['IMAGE_MIME_TYPE', IMAGE_MIME_TYPE.join(', ')], ['PDF_MIME_TYPE', PDF_MIME_TYPE.join(', ')], ['MS_WORD_MIME_TYPE', MS_WORD_MIME_TYPE.join(', ')], ['MS_EXCEL_MIME_TYPE', MS_EXCEL_MIME_TYPE.join(', ')], ['MS_POWERPOINT_MIME_TYPE', MS_POWERPOINT_MIME_TYPE.join(', ')], ]}></DataTable>

```tsx
import { Dropzone } from '@xiaoye-react/dropzone';

function Demo() {
  return (
    <Dropzone
      accept={{
        'image/*': [], // 所有图片
        'text/html': ['.html', '.htm'],
      }}
      onDrop={() => {}}
    >
      {/* 子元素 */}
    </Dropzone>
  );
}
```

```tsx
import { Dropzone } from '@xiaoye-react/dropzone';

function Demo() {
  return (
    <Dropzone
      accept={[
        'image/png',
        'image/jpeg',
        'image/svg+xml',
        'image/gif',
      ]}
      onDrop={() => {}}
    >
      {/* 子元素 */}
    </Dropzone>
  );
}
```

```tsx
import { Dropzone, MIME_TYPES } from '@xiaoye-react/dropzone';

function Demo() {
  return (
    <Dropzone
      accept={[
        MIME_TYPES.png,
        MIME_TYPES.jpeg,
        MIME_TYPES.svg,
        MIME_TYPES.gif,
      ]}
      onDrop={() => {}}
    >
      {/* 子元素 */}
    </Dropzone>
  );
}
```

```tsx
import { Dropzone, IMAGE_MIME_TYPE } from '@xiaoye-react/dropzone';

function Demo() {
  return (
    <Dropzone accept={IMAGE_MIME_TYPE} onDrop={() => {}}>
      {/* 子元素 */}
    </Dropzone>
  );
}
```

## 样式 API

`Dropzone` 根元素具有以下 data 属性，用于根据当前状态改变样式：

- `data-loading` – 当 `loading` 属性为 `true` 时
- `data-accept` – 当用户拖拽可被接受的文件到 dropzone 上时
- `data-reject` – 当用户拖拽无法被接受的文件到 dropzone 上时
- `data-idle` – 默认状态——用户没有拖拽任何文件到 dropzone 上

<code src="./dropzone/demo/stylesApi.tsx"></code>

## 图片预览

<code src="./dropzone/demo/preview.tsx"></code>

## 获取 ref

```tsx
import { useEffect, useRef } from 'react';
import { Dropzone } from '@xiaoye-react/dropzone';

function Demo() {
  const dropzoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dropzoneRef.current?.focus();
  }, []);

  return (
    <Dropzone ref={dropzoneRef} onDrop={() => {}}>
      {/* 子元素 */}
    </Dropzone>
  );
}
```

## Dropzone.FullScreen 组件

`Dropzone.FullScreen` 允许你捕获拖放到浏览器窗口而非特定区域的文件。它支持与 `Dropzone` 组件相同的属性。

要预览该组件，请点击按钮并将图片拖放到浏览器窗口：

<code src="./dropzone/demo/fullScreen.tsx"></code>
