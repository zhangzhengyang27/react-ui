import React, { useState } from 'react';
import { Notifications, Button } from '@xiaoye-react/ui';
import DemoWrap from '../../_util/demoWrap';

const App: React.FC = () => {
  const show = () => {
    // @ts-ignore
    if (typeof window !== 'undefined' && (window as any).notifications?.show) {
      // @ts-ignore
      (window as any).notifications.show({ title: '提示', message: '操作成功' });
    }
  };
  return (
    <DemoWrap>
      <Notifications />
      <Button onClick={show} size="sm">显示通知</Button>
    </DemoWrap>
  );
};

export default App;
