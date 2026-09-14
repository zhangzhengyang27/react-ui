import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { UIProvider } from '../../../core/UIProvider/UIProvider';
import { Upload, type UploadFile, type UploadHandlers } from './Upload';

const wrapper = ({ children }: { children: React.ReactNode }) => <UIProvider>{children}</UIProvider>;

function makeFile(name = 'a.txt', size = 10): File {
  return new File(['x'.repeat(size)], name, { type: 'text/plain', lastModified: 1700000000000 });
}

function makePendingFile(name = 'a.txt'): UploadFile {
  return { id: `id-${name}`, file: makeFile(name), status: 'pending' };
}

/** 模拟通过文件选择器选择文件 */
function selectFiles(container: HTMLElement, files: File[]) {
  const input = container.querySelector('input[type="file"]') as HTMLInputElement;
  const fileList = {
    0: files[0],
    1: files[1],
    2: files[2],
    length: files.length,
    item(index: number) {
      return files[index] ?? null;
    },
    [Symbol.iterator]: function* () {
      yield* files;
    }
  } as unknown as FileList;
  Object.defineProperty(input, 'files', { value: fileList, configurable: true });
  fireEvent.change(input);
}

describe('@xiaoye-react/dropzone/Upload', () => {
  it('展示 defaultValue 文件列表与大小', () => {
    render(<Upload defaultValue={[makePendingFile('设计稿.png')]} />, { wrapper });

    expect(screen.getByText('设计稿.png')).toBeInTheDocument();
    expect(screen.getByText('10 B')).toBeInTheDocument();
    expect(screen.getByText('待上传')).toBeInTheDocument();
  });

  it('autoUpload 默认开启：选择文件后自动上传至成功状态', async () => {
    const upload = vi.fn().mockResolvedValue('ok');
    const onUploadSuccess = vi.fn();
    const onChange = vi.fn();
    const { container } = render(<Upload upload={upload} onUploadSuccess={onUploadSuccess} onChange={onChange} />, {
      wrapper
    });

    selectFiles(container, [makeFile('report.pdf', 1024)]);

    await waitFor(() => expect(upload).toHaveBeenCalledTimes(1));
    expect(upload.mock.calls[0][0].name).toBe('report.pdf');

    await waitFor(() => expect(screen.getByLabelText('上传成功')).toBeInTheDocument());
    expect(onUploadSuccess).toHaveBeenCalled();
    // onChange 最后一次包含成功状态
    const lastCall = onChange.mock.calls.at(-1)![0] as UploadFile[];
    expect(lastCall[0].status).toBe('success');
  });

  it('上传失败展示错误信息并回调 onUploadError', async () => {
    const upload = vi.fn().mockRejectedValue(new Error('服务端错误'));
    const onUploadError = vi.fn();
    const uploadRef = { current: null as UploadHandlers | null };
    render(
      <Upload defaultValue={[makePendingFile()]} upload={upload} onUploadError={onUploadError} uploadRef={uploadRef} />,
      { wrapper }
    );

    uploadRef.current!.submit();

    await waitFor(() => expect(screen.getByLabelText('上传失败')).toBeInTheDocument());
    expect(screen.getByText(/服务端错误/)).toBeInTheDocument();
    expect(onUploadError).toHaveBeenCalled();
  });

  it('上报进度并展示进度条', async () => {
    let resolveUpload: (value: string) => void = () => {};
    const upload = vi.fn(
      (_file: File, { onProgress }: { onProgress: (percent: number) => void }) =>
        new Promise<string>(resolve => {
          onProgress(40);
          resolveUpload = resolve;
        })
    );
    const uploadRef = { current: null as UploadHandlers | null };
    render(<Upload defaultValue={[makePendingFile()]} upload={upload} uploadRef={uploadRef} />, { wrapper });

    uploadRef.current!.submit();

    await waitFor(() => expect(screen.getByRole('progressbar')).toBeInTheDocument());
    const section = screen.getByRole('progressbar').querySelector('div') as HTMLElement;
    expect(section.style.width).toBe('40%');

    await waitFor(() => resolveUpload('ok'));
    await waitFor(() => expect(screen.getByLabelText('上传成功')).toBeInTheDocument());
  });

  it('autoUpload=false 时通过 uploadRef.submit 手动触发', async () => {
    const upload = vi.fn().mockResolvedValue('ok');
    const uploadRef = { current: null as UploadHandlers | null };
    render(
      <Upload defaultValue={[makePendingFile()]} upload={upload} autoUpload={false} uploadRef={uploadRef} />,
      { wrapper }
    );

    expect(upload).not.toHaveBeenCalled();

    uploadRef.current!.submit();
    await waitFor(() => expect(upload).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByLabelText('上传成功')).toBeInTheDocument());
  });

  it('beforeUpload 返回字符串使文件进入 error 状态', async () => {
    const { container } = render(<Upload beforeUpload={() => '不支持的文件类型'} />, { wrapper });

    selectFiles(container, [makeFile('evil.exe')]);

    await waitFor(() => expect(screen.getByText(/不支持的文件类型/)).toBeInTheDocument());
    expect(screen.getByLabelText('上传失败')).toBeInTheDocument();
  });

  it('beforeUpload 返回 false 时忽略文件', async () => {
    const { container } = render(<Upload beforeUpload={() => false} />, { wrapper });

    selectFiles(container, [makeFile('a.txt')]);

    expect(screen.queryByText('a.txt')).not.toBeInTheDocument();
  });

  it('maxSize 超限的文件进入 error 状态', async () => {
    const { container } = render(<Upload maxSize={5} />, { wrapper });

    selectFiles(container, [makeFile('big.bin', 100)]);

    await waitFor(() => expect(screen.getByText(/文件超出大小限制/)).toBeInTheDocument());
  });

  it('maxFiles 限制文件数量', async () => {
    const onChange = vi.fn();
    const { container } = render(<Upload maxFiles={1} onChange={onChange} />, { wrapper });

    selectFiles(container, [makeFile('a.txt'), makeFile('b.txt')]);

    // react-dropzone 的事件处理是异步的
    await waitFor(() => expect(onChange).toHaveBeenCalled());
    const lastCall = onChange.mock.calls.at(-1)![0] as UploadFile[];
    expect(lastCall).toHaveLength(1);
    expect(lastCall[0].file.name).toBe('a.txt');
  });

  it('点击移除按钮删除文件', () => {
    const onRemove = vi.fn();
    const onChange = vi.fn();
    render(<Upload defaultValue={[makePendingFile()]} onRemove={onRemove} onChange={onChange} />, { wrapper });

    fireEvent.click(screen.getByRole('button', { name: '移除 a.txt' }));

    expect(screen.queryByText('a.txt')).not.toBeInTheDocument();
    expect(onRemove).toHaveBeenCalled();
    expect(onChange).toHaveBeenLastCalledWith([]);
  });

  it('受控模式：value 与 onChange 生效', () => {
    const onChange = vi.fn();
    const files = [makePendingFile()];
    render(<Upload value={files} onChange={onChange} />, { wrapper });

    fireEvent.click(screen.getByRole('button', { name: '移除 a.txt' }));

    expect(onChange).toHaveBeenLastCalledWith([]);
    // 受控模式下组件自身不移除条目
    expect(screen.getByText('a.txt')).toBeInTheDocument();
  });
});
