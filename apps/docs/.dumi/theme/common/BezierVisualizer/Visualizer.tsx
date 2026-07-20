import React, { useId } from 'react';

export interface VisualizerProps {
  /**
   * 控制点坐标
   * @description 控制点坐标范围 [0, 1]
   * @example [0.78, 0.14, 0.15, 0.86]
   */
  controls: [number, number, number, number];
  width?: number;
  height?: number;
  duration?: number;
}

const STROKE_WIDTH = 1;
const STROKE_WIDTH_BOLD = 2;

const Visualizer: React.FC<VisualizerProps> = (props) => {
  const {
    controls: [x1, y1, x2, y2],
    width = 180,
    height = width,
  } = props;

  // 坐标转换到SVG视图
  const scale = (val: number, axis: 'x' | 'y') =>
    axis === 'x' ? val * width : height - val * height;

  const gridStep = width / 5; // 网格步长
  const patternId = useId(); // 生成唯一ID

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <title>Cubic Bezier Visualizer</title>
      {/* 背景 */}
      <rect width="100%" height="100%" fill="var(--ui-color-body)" />

      {/* 修正后的网格 */}
      <pattern id={patternId} width={gridStep} height={gridStep} patternUnits="userSpaceOnUse">
        <path
          d={`
          M 0 0 H ${gridStep}
          M 0 0 V ${gridStep}
          M ${gridStep} 0 V ${gridStep}
          M 0 ${gridStep} H ${gridStep}
        `}
          stroke="var(--ui-color-default-border)"
          strokeWidth={STROKE_WIDTH}
          shapeRendering="crispEdges"
        />
      </pattern>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />

      {/* 贝塞尔曲线路径 */}
      <path
        d={`
          M 0 ${height}
          C ${scale(x1, 'x')} ${scale(y1, 'y')},
            ${scale(x2, 'x')} ${scale(y2, 'y')},
            ${width} 0
        `}
        fill="none"
        stroke="var(--ui-primary-color-filled)"
        strokeWidth={STROKE_WIDTH_BOLD}
      />

      {/* 控制点连线 */}
      <path
        d={`
          M 0 ${height}
          L ${scale(x1, 'x')} ${scale(y1, 'y')}
          L ${scale(x2, 'x')} ${scale(y2, 'y')}
          L ${width} 0
        `}
        fill="none"
        stroke="var(--ui-primary-color-filled-hover)"
        strokeDasharray="4 2"
        strokeWidth={STROKE_WIDTH}
      />

      {/* 控制点 */}
      <circle cx={scale(x1, 'x')} cy={scale(y1, 'y')} r="5" fill="var(--ui-color-red-6)" />
      <circle cx={scale(x2, 'x')} cy={scale(y2, 'y')} r="5" fill="var(--ui-color-green-6)" />
    </svg>
  );
};

export default Visualizer;
