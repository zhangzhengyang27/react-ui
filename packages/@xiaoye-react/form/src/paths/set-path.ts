import { klona } from 'klona/full';
import { getSplittedPath } from './get-splitted-path';

export function setPath<T>(path: unknown, value: unknown, values: T): T {
  const splittedPath = getSplittedPath(path);

  if (splittedPath.length === 0) {
    return values;
  }

  const cloned: any = klona(values);

  let val = cloned;
  for (let i = 0; i < splittedPath.length - 1; i += 1) {
    const key = splittedPath[i];
    // 中间段缺失（undefined/null）或为原始值时无法在其上继续赋值：
    // 创建容器（下一段是数字索引则建数组，否则建对象），而不是 TypeError 崩溃或静默丢失
    if (val[key] === undefined || val[key] === null || typeof val[key] !== 'object') {
      val[key] = /^\d+$/.test(String(splittedPath[i + 1])) ? [] : {};
    }
    val = val[key];
  }

  val[splittedPath[splittedPath.length - 1]] = value;

  return cloned;
}
