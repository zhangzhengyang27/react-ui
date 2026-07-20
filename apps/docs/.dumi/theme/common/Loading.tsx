import React from 'react';
import { useLocation } from 'dumi';

import { Common } from './styles';

import classes from './Loading.module.css';

const Loading: React.FC = () => {
  const { pathname } = useLocation();

  let loadingNode: React.ReactNode = null;

  if (
    pathname.startsWith('/components') ||
    pathname.startsWith('/docs') ||
    pathname.startsWith('/changelog')
  ) {
    loadingNode = (
      <div className={classes.skeletonWrapper}>
        <img
          src="/favicon.svg"
          width={40}
          height={40}
          alt="loading"
          draggable={false}
          className={classes.img}
        />
        {/* 用原生 div 模拟 Skeleton 占位条，避免在 UIProvider 挂载前使用 react-ui 组件 */}
        <div className={classes.skeletonBar} />
        <div className={classes.skeletonBar} style={{ width: '80%' }} />
        <div className={classes.skeletonBar} style={{ width: '60%' }} />
        <div style={{ marginTop: 32 }}>
          <div className={classes.skeletonBar} />
          <div className={classes.skeletonBar} style={{ width: '85%' }} />
          <div className={classes.skeletonBar} style={{ width: '70%' }} />
          <div className={classes.skeletonBar} style={{ width: '50%' }} />
        </div>
      </div>
    );
  } else {
    loadingNode = (
      <div
        style={{
          width: '100%',
          margin: '120px 0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: '4px solid #e0e0e0',
            borderTopColor: '#1677ff',
            borderRadius: '50%',
            animation: 'ui-loading-spin 0.8s linear infinite',
          }}
        />
        <style>{`@keyframes ui-loading-spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <>
      <Common />
      {loadingNode}
    </>
  );
};

export default Loading;
