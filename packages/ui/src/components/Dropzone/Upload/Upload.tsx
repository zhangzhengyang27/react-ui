import { useCallback, useMemo, useRef, useState } from 'react';
import { assignRef } from '@xiaoye-react/hooks';
import type { FileWithPath } from 'react-dropzone';
import { Box, BoxProps } from '../../../core/Box/Box';
import { useProps } from '../../../core/UIProvider/index';
import { type Factory } from '../../../core/factory/create-factory';
import { factory } from '../../../core/factory/factory';
import { type StylesApiProps } from '../../../core/styles-api/styles-api.types';
import { useStyles } from '../../../core/styles-api/use-styles/use-styles';
import { CloseButton } from '../../CloseButton/CloseButton';
import { Group } from '../../Group/Group';
import { Loader } from '../../Loader/Loader';
import { Progress } from '../../Progress/Progress';
import { Stack } from '../../Stack/Stack';
import { Text } from '../../Text/index';
import { Tooltip } from '../../Tooltip/Tooltip';
import { Dropzone } from '../Dropzone';
import type { DropzoneProps } from '../Dropzone';
import classes from './Upload.module.css';

export type UploadFileStatus = 'pending' | 'uploading' | 'success' | 'error';

export interface UploadFile {
  /** 唯一标识，未提供时由组件按文件信息生成 */
  id?: string;

  /** 文件对象 */
  file: File;

  /** 上传状态 */
  status: UploadFileStatus;

  /** 上传进度 0–100，`uploading` 状态时展示 */
  progress?: number;

  /** 校验/上传失败信息 */
  error?: string;

  /** 服务端返回结果 */
  response?: any;
}

export interface UploadHandlers {
  /** 上传所有 pending 状态的文件 */
  submit: () => void;

  /** 清空文件列表 */
  clear: () => void;
}

export interface UploadUploadOptions {
  /** 上报进度，percent 取值 0–100 */
  onProgress: (percent: number) => void;
}

export type UploadStylesNames = 'root' | 'fileList' | 'fileItem' | 'fileInfo' | 'fileName' | 'fileSize' | 'fileError' | 'removeButton';

export interface UploadProps
  extends BoxProps, StylesApiProps<UploadFactory> {
  /** 文件列表（受控） */
  value?: UploadFile[];

  /** 文件列表初始值（非受控） */
  defaultValue?: UploadFile[];

  /** 文件列表变化回调 */
  onChange?: (files: UploadFile[]) => void;

  /** 上传实现。未提供时文件只进入 pending 状态，可通过 uploadRef.submit 手动触发 */
  upload?: (file: File, options: UploadUploadOptions) => Promise<any>;

  /** 上传前校验：返回 false 跳过该文件，返回字符串则该文件进入 error 状态并展示此信息 */
  beforeUpload?: (file: File) => boolean | string | Promise<boolean | string>;

  /** 选择文件后立即上传 @default true */
  autoUpload?: boolean;

  /** 是否允许多选文件 @default true */
  multiple?: boolean;

  /** 可接受的文件类型 */
  accept?: DropzoneProps['accept'];

  /** 单文件大小上限（字节），超出进入 error 状态 */
  maxSize?: number;

  /** 文件数量上限，超出的文件被忽略 */
  maxFiles?: number;

  /** 禁用选择与移除 */
  disabled?: boolean;

  /** 拖放区内容 @default 内置上传提示 */
  dropzoneChildren?: React.ReactNode;

  /** 透传给 Dropzone 的属性 */
  dropzoneProps?: Omit<DropzoneProps, 'onDrop' | 'multiple' | 'accept' | 'maxSize' | 'maxFiles' | 'loading' | 'disabled' | 'children'>;

  /** 文件移除回调 */
  onRemove?: (file: UploadFile) => void;

  /** 单个文件上传成功回调 */
  onUploadSuccess?: (file: UploadFile, response: any) => void;

  /** 单个文件上传失败回调 */
  onUploadError?: (file: UploadFile, error: Error) => void;

  /** 接收 { submit, clear } 的 ref，用于手动触发上传或清空 */
  uploadRef?: React.MutableRefObject<UploadHandlers | null>;
}

export type UploadFactory = Factory<{
  props: UploadProps
  ref: HTMLDivElement
  stylesNames: UploadStylesNames
}>;

const defaultProps = {
  multiple: true,
  autoUpload: true
} satisfies Partial<UploadProps>;

let uploadFileCounter = 0;

function createUploadFile(file: File): UploadFile {
  uploadFileCounter += 1;
  return {
    id: `upload-${file.name}-${file.size}-${file.lastModified}-${uploadFileCounter}`,
    file,
    status: 'pending'
  };
}

function formatFileSize(size: number): string {
  if (size < 1024) {
    return `${size} B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

export const Upload = factory<UploadFactory>((_props, ref) => {
  const props = useProps('Upload', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    attributes,
    mod,
    value,
    defaultValue,
    onChange,
    upload,
    beforeUpload,
    autoUpload,
    multiple,
    accept,
    maxSize,
    maxFiles,
    disabled,
    dropzoneChildren,
    dropzoneProps,
    onRemove,
    onUploadSuccess,
    onUploadError,
    uploadRef,
    ...others
  } = props;

  const getStyles = useStyles<UploadFactory>({
    name: 'Upload',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars
  });

  // 上传进度是异步高频更新，且 useUncontrolled 的 setter 不支持函数式更新，
  // 这里显式管理受控/非受控：所有变更必须经过 commit，filesRef 同步更新保证并发安全
  const isControlled = value !== undefined;
  const [internalFiles, setInternalFiles] = useState<UploadFile[]>(defaultValue ?? []);
  const files = isControlled ? value! : internalFiles;
  const filesRef = useRef<UploadFile[]>(files);
  filesRef.current = files;

  const commit = useCallback(
    (next: UploadFile[]) => {
      filesRef.current = next;
      if (value !== undefined) {
        // 受控模式：状态由使用方维护，仅通知
        onChange?.(next);
      } else {
        // 非受控模式：对齐 useUncontrolled 语义，setter 同时更新内部状态并通知
        setInternalFiles(next);
        onChange?.(next);
      }
    },
    [value, onChange]
  );

  const updateFile = useCallback(
    (id: string, patch: Partial<UploadFile>) => {
      commit(filesRef.current.map(item => (item.id === id ? { ...item, ...patch } : item)));
    },
    [commit]
  );

  const runUpload = useCallback(
    async (target: UploadFile) => {
      if (!upload) {
        return;
      }
      updateFile(target.id!, { status: 'uploading', progress: 0 });
      try {
        const response = await upload(target.file, {
          onProgress: percent => {
            const clamped = Math.max(0, Math.min(100, percent));
            updateFile(target.id!, { progress: clamped });
          }
        });
        updateFile(target.id!, { status: 'success', progress: 100, response, error: undefined });
        onUploadSuccess?.({ ...target, status: 'success', progress: 100, response }, response);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        updateFile(target.id!, { status: 'error', error: message });
        onUploadError?.({ ...target, status: 'error', error: message }, error as Error);
      }
    },
    [upload, updateFile, onUploadSuccess, onUploadError]
  );

  const submitPending = useCallback(() => {
    if (!upload) {
      return;
    }
    // 读 filesRef 而非渲染期 files：同一事件内先 addFiles 后 submit 时不会遗漏刚加入的文件
    filesRef.current.filter(item => item.status === 'pending').forEach(item => {
      void runUpload(item);
    });
  }, [upload, runUpload]);

  assignRef(uploadRef, { submit: submitPending, clear: () => commit([]) });

  const addFiles = async (incoming: FileWithPath[]) => {
    const current = filesRef.current;
    const remainingSlots = maxFiles != null ? Math.max(0, maxFiles - current.length) : Infinity;
    const accepted: UploadFile[] = [];

    for (const file of incoming) {
      if (accepted.length >= remainingSlots) {
        break;
      }
      if (maxSize != null && file.size > maxSize) {
        accepted.push({ ...createUploadFile(file), status: 'error', error: '文件超出大小限制' });
        continue;
      }
      accepted.push(createUploadFile(file));
    }

    const withValidation: UploadFile[] = [];
    for (const item of accepted) {
      if (!beforeUpload) {
        withValidation.push(item);
        continue;
      }
      try {
        const result = await beforeUpload(item.file);
        if (result === false) {
          continue;
        }
        withValidation.push(typeof result === 'string' ? { ...item, status: 'error', error: result } : item);
      } catch (error) {
        withValidation.push({
          ...item,
          status: 'error',
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    // await 期间可能有并发变更（再次 drop、删除文件）：基于最新列表提交，
    // 否则入口处快照会覆盖并发写入（丢文件/已删文件复活）。
    // maxFiles 槽位同样按提交时刻的最新长度收口，避免并发 drop 各按旧快照计槽而超额；
    // 已超额时以现有列表长度为下限，只挡新文件、不挤掉已有文件
    const currentFiles = filesRef.current;
    const cap = maxFiles != null ? Math.max(maxFiles, currentFiles.length) : Infinity;
    const finalFiles = [...currentFiles, ...withValidation].slice(0, cap);
    const committed = finalFiles.slice(currentFiles.length);
    commit(finalFiles);

    if (autoUpload && upload) {
      committed.filter(item => item.status === 'pending').forEach(item => {
        void runUpload(item);
      });
    }
  };

  const handleRemove = (target: UploadFile) => {
    commit(filesRef.current.filter(item => item.id !== target.id));
    onRemove?.(target);
  };

  const isUploading = useMemo(() => files.some(item => item.status === 'uploading'), [files]);

  const renderStatus = (item: UploadFile) => {
    if (item.status === 'uploading') {
      return <Loader size="xs" />;
    }
    if (item.status === 'success') {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label="上传成功" role="img">
          <path d="M3 8.5 6.5 12 13 4.5" stroke="var(--ui-color-teal-7, #087f5b)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    }
    if (item.status === 'error') {
      return (
        <Tooltip label={item.error} disabled={!item.error}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-label="上传失败" role="img">
            <circle cx="8" cy="8" r="6.5" stroke="var(--ui-color-red-7, #c92a2a)" strokeWidth="1.5" />
            <path d="M8 4.5V9M8 11.2v.3" stroke="var(--ui-color-red-7, #c92a2a)" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </Tooltip>
      );
    }
    return <Text size="xs" c="dimmed">待上传</Text>;
  };

  return (
    <Box ref={ref} {...getStyles('root')} mod={[{ disabled }, mod]} {...others}>
      <Dropzone
        multiple={multiple}
        accept={accept}
        loading={isUploading}
        disabled={disabled}
        {...dropzoneProps}
        onDrop={incoming => {
          void addFiles(incoming);
        }}
      >
        {dropzoneChildren ?? (
          <div style={{ pointerEvents: 'none', textAlign: 'center', padding: 'var(--ui-spacing-md)' }}>
            <Text size="sm">点击选择或拖拽文件到此处上传</Text>
            <Text size="xs" c="dimmed" mt={4}>
              {multiple ? '支持多选' : '单文件'}
            </Text>
          </div>
        )}
      </Dropzone>

      {files.length > 0 && (
        <Stack gap="xs" mt="sm" {...getStyles('fileList')}>
          {files.map(item => (
            <div key={item.id} {...getStyles('fileItem')}>
              <Group justify="space-between" gap="sm" wrap="nowrap">
                <div {...getStyles('fileInfo', { style: { minWidth: 0, flex: 1 } })}>
                  <div {...getStyles('fileName')}>{item.file.name}</div>
                  <Text size="xs" c="dimmed" {...getStyles('fileSize')}>
                    {formatFileSize(item.file.size)}
                  </Text>
                  {/* 声明的 fileError 样式槽接线：错误文案独立成节点，走红色错误样式 */}
                  {item.error && (
                    <Text size="xs" {...getStyles('fileError')}>
                      {item.error}
                    </Text>
                  )}
                </div>
                {renderStatus(item)}
                <CloseButton
                  size="sm"
                  disabled={disabled}
                  aria-label={`移除 ${item.file.name}`}
                  onClick={() => handleRemove(item)}
                  {...getStyles('removeButton')}
                />
              </Group>
              {item.status === 'uploading' && (
                <Progress value={item.progress ?? 0} size="xs" mt={6} striped animated />
              )}
            </div>
          ))}
        </Stack>
      )}
    </Box>
  );
});

Upload.classes = classes
Upload.displayName = '@xiaoye-react/ui/Upload'

export namespace Upload {
  export type Props = UploadProps
  export type StylesNames = UploadStylesNames
  export type Factory = UploadFactory
  export type File = UploadFile
}
