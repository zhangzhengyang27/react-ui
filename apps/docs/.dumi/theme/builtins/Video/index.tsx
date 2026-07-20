import React from 'react';

interface VideoProps {
  src: string;
  className?: string;
}

/**
 * 演示视频嵌入组件。
 * 用原生 <video> 替代旧 MdxVideo（基于 react-ui 主题的视频样式）。
 */
const Video: React.FC<VideoProps> = ({ src, className }) => {
  return (
    <video
      src={src}
      className={className}
      controls
      playsInline
      style={{
        width: '100%',
        borderRadius: 8,
        margin: '16px 0',
        background: 'rgba(0,0,0,0.02)',
      }}
    />
  );
};

export default Video;
