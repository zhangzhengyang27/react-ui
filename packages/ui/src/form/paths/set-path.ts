import { getSplittedPath } from './get-splitted-path';

// copy-on-write 辅助:浅克隆容器并保留原型。此前每次 setPath 都对整表值做
// O(整表) 深克隆(klona),大表单高频键入时是稳定热点;实际上只有路径上的
// 祖先链需要克隆,其余分支与旧值共享引用即可(表单值整体不可变更新)
function cloneContainer(item: any) {
  if (Array.isArray(item)) {
    return item.slice();
  }
  return Object.assign(Object.create(Object.getPrototypeOf(item)), item);
}

export function setPath<T>(path: unknown, value: unknown, values: T): T {
  const splittedPath = getSplittedPath(path);

  if (splittedPath.length === 0) {
    return values;
  }

  const cloned: any = cloneContainer(values);

  let val = cloned;
  for (let i = 0; i < splittedPath.length - 1; i += 1) {
    const key = splittedPath[i];
    // 中间段缺失（undefined/null）或为原始值时无法在其上继续赋值：
    // 创建容器（下一段是数字索引则建数组，否则建对象），而不是 TypeError 崩溃或静默丢失
    if (val[key] === undefined || val[key] === null || typeof val[key] !== 'object') {
      val[key] = /^\d+$/.test(String(splittedPath[i + 1])) ? [] : {};
    } else {
      // 只克隆路径上的祖先链,叶子值直接替换
      val[key] = cloneContainer(val[key]);
    }
    val = val[key];
  }

  val[splittedPath[splittedPath.length - 1]] = value;

  return cloned;
}
