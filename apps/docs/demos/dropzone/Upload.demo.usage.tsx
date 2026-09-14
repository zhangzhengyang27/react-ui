import { Upload, UploadHandlers, UploadFile } from '@xiaoye-react/ui';
import { useRef } from 'react';
import { Button, Group } from '@xiaoye-react/ui';
import { UIDemo } from '@xiaoye-react/demo';

const code = `
import { useRef } from 'react';
import { Button, Group } from '@xiaoye-react/ui';
import { Upload, UploadHandlers } from '@xiaoye-react/ui';

// 模拟上传接口：进度上报 + 1 秒后完成
const fakeUpload = (file: File, { onProgress }: { onProgress: (p: number) => void }) =>
  new Promise(resolve => {
    let progress = 0;
    const timer = setInterval(() => {
      progress += 20;
      onProgress(Math.min(progress, 100));
      if (progress >= 100) {
        clearInterval(timer);
        resolve({ url: 'https://example.com/' + file.name });
      }
    }, 200);
  });

function Demo() {
  const uploadRef = useRef<UploadHandlers | null>(null);

  return (
    <div>
      <Upload
        upload={fakeUpload}
        multiple
        maxFiles={3}
        accept={['image/png', 'image/jpeg']}
        uploadRef={uploadRef}
        beforeUpload={(file) => file.size <= 5 * 1024 ** 2 || '文件不能超过 5MB'}
      />
      <Group mt="sm">
        <Button variant="default" size="xs" onClick={() => uploadRef.current?.submit()}>
          开始上传
        </Button>
        <Button variant="default" size="xs" onClick={() => uploadRef.current?.clear()}>
          清空列表
        </Button>
      </Group>
    </div>
  );
}
`;

// 模拟上传接口：进度上报 + 定时完成
const fakeUpload = (file: File, { onProgress }: { onProgress: (p: number) => void }) =>
    new Promise(resolve => {
        let progress = 0;
        const timer = setInterval(() => {
            progress += 20;
            onProgress(Math.min(progress, 100));
            if (progress >= 100) {
                clearInterval(timer);
                resolve({ url: 'https://example.com/' + file.name });
            }
        }, 200);
    });

function Demo() {
    const uploadRef = useRef<UploadHandlers | null>(null);

    return (
        <div>
            <Upload
                upload={fakeUpload}
                multiple
                maxFiles={3}
                accept={['image/png', 'image/jpeg']}
                uploadRef={uploadRef}
                beforeUpload={file => file.size <= 5 * 1024 ** 2 || '文件不能超过 5MB'}
            />
            <Group mt="sm">
                <Button variant="default" size="xs" onClick={() => uploadRef.current?.submit()}>
                    开始上传
                </Button>
                <Button variant="default" size="xs" onClick={() => uploadRef.current?.clear()}>
                    清空列表
                </Button>
            </Group>
        </div>
    );
}

export const usage: UIDemo = { type: 'code', code, component: Demo };
