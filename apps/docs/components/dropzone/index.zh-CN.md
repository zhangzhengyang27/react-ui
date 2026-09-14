---
category: Components
title: Dropzone
subtitle: 拖拽上传
description: react-ui Dropzone 文档。
group:
  title: 数据录入
  order: 4
---


## 安装

> **⚠️ 尚未发布到 npm**：该组件位于仓库内的 `@xiaoye-react/dropzone` 包中，此包还没有发布到 npm。组件源码随本仓库提供，发布后此处会更新安装方式。


安装完成后，在应用根目录导入包样式：

```tsx
import '@xiaoye-react/ui/style.css';
// ‼️ dropzone 样式必须在核心包样式之后导入
import '@xiaoye-react/dropzone/styles.css';
```

## 用法

`Dropzone` 允许你从用户处捕获一个或多个文件。该组件基于 [react-dropzone](https://react-dropzone.js.org/)，并支持其核心功能：

- 根据提供的 mime 类型接受/拒绝文件
- 限制单个文件大小
- 渲染给定的子元素，并提供基于上下文的组件，根据当前状态显示元素

<code src="./demo/usage.tsx"></code>

## Dropzone.Accept、Dropzone.Reject 和 Dropzone.Idle

`Dropzone.Accept`、`Dropzone.Reject` 和 `Dropzone.Idle` 组件仅在用户执行特定操作时可见：

- `Dropzone.Accept` 仅在用户拖拽可被接受的文件到 dropzone 上时可见
- `Dropzone.Reject` 仅在用户拖拽无法被接受的文件到 dropzone 上时可见
- `Dropzone.Idle` 在用户没有拖拽任何文件到 dropzone 上时可见

## 加载状态

设置 `loading` 属性以使用 [LoadingOverlay](/components/loading-overlay/) 组件指示加载状态。当 `loading` 属性为 true 时，用户无法拖放或选择新文件（`Dropzone` 变为禁用状态）：

<code src="./demo/loading.tsx"></code>

## 禁用状态

如果你想实现自己的加载状态，可以在不使用 `LoadingOverlay` 的情况下禁用 `Dropzone`。与 `loading` 相同，当 `Dropzone` 被禁用时，用户无法拖放或选择新文件：

<code src="./demo/disabled.tsx"></code>

## 手动打开文件浏览器

要从组件外部打开文件浏览器，请使用 `openRef` 属性获取一个会触发文件浏览器的函数：

<code src="./demo/manual.tsx"></code>

## 启用子元素指针事件

默认情况下，Dropzone 会禁用其子元素的指针事件，以便拖拽事件正常工作。当 `activateOnClick={false}` 时，点击 Dropzone 内的任何子元素都不会有任何反应。
不过，你可以设置样式 `pointerEvents: 'all'` 使子元素可点击。注意，你只需要在交互元素（如按钮或链接）上设置这些样式。

<code src="./demo/enableChildPointerEvent.tsx"></code>

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

<code src="./demo/stylesApi.tsx"></code>

## 图片预览

<code src="./demo/preview.tsx"></code>

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

<code src="./demo/fullScreen.tsx"></code>


## Upload 上传 {#upload}

`Upload` 在 Dropzone 的基础上提供完整的上传管理：受控文件列表、上传进度、成功/失败状态与手动上传 API。

<code src="./demo/usage-upload.tsx"></code>

### 上传流程

1. 用户通过 Dropzone 选择文件后，文件进入 `pending` 状态（经过 `beforeUpload` 与 `maxSize` 校验，失败则直接进入 `error` 状态并展示原因）
2. `autoUpload`（默认开启）时立即调用 `upload` 函数；关闭时可通过 `uploadRef.current.submit()` 手动触发
3. 上传中通过 `onProgress` 上报进度（0–100），完成后进入 `success`，抛错则进入 `error`

### UploadProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value / defaultValue / onChange | 文件列表（受控/非受控） | `UploadFile[]` | `[]` |
| upload | 上传实现 | `(file: File, options: { onProgress }) => Promise<any>` | - |
| beforeUpload | 上传前校验，返回 `false` 跳过、字符串进入 error 状态 | `(file: File) => boolean \| string \| Promise<boolean \| string>` | - |
| autoUpload | 选择后立即上传 | `boolean` | `true` |
| multiple / accept | 透传给 Dropzone 的选择限制 | 同 Dropzone | - |
| maxSize | 单文件大小上限（字节），超出进入 error 状态 | `number` | - |
| maxFiles | 文件数量上限，超出的文件被忽略 | `number` | - |
| uploadRef | 接收 `{ submit, clear }`，用于手动触发上传/清空 | `React.MutableRefObject<UploadHandlers \| null>` | - |
| onUploadSuccess / onUploadError | 单文件上传成功/失败回调 | `(file: UploadFile, ...) => void` | - |
| onRemove | 文件移除回调 | `(file: UploadFile) => void` | - |

文件项类型 `UploadFile`：`{ id, file, status: 'pending' | 'uploading' | 'success' | 'error', progress?, error?, response? }`。
