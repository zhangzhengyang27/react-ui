import { padTime } from '../pad-time/pad-time';
import { secondsToTime, timeToSeconds } from '../time-to-seconds/time-to-seconds';

// min/max 中的非法值(解析为 NaN)按缺省处理,不参与钳制
function parseSeconds(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }
  const seconds = timeToSeconds(value);
  return Number.isFinite(seconds) ? seconds : fallback;
}

export function clampTime(time: string, min: string | undefined, max: string | undefined, withSeconds = true) {
  const timeInSeconds = timeToSeconds(time);

  // NaN 防御:非法时间串(如粘贴 'ab:cd')钳制无意义,原样返回交由调用方丢弃,避免 NaN:NaN 传播
  if (!Number.isFinite(timeInSeconds)) {
    return { timeString: time };
  }

  const minInSeconds = parseSeconds(min, -Infinity);
  const maxInSeconds = parseSeconds(max, Infinity);
  const clampedSeconds = Math.max(minInSeconds, Math.min(timeInSeconds, maxInSeconds));
  const { hours, minutes, seconds } = secondsToTime(clampedSeconds);

  // 输出格式与 withSeconds 对齐,避免 withSeconds=false 时 onChange 值契约漂移成 HH:mm:ss
  return {
    timeString: `${padTime(hours)}:${padTime(minutes)}${withSeconds ? `:${padTime(seconds)}` : ''}`,
    hours,
    minutes,
    seconds,
  };
}
