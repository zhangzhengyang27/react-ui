import { ReorderPayload } from '../types';

export function reorderErrors<T>(path: unknown, { from, to }: ReorderPayload, errors: T): T {
  const oldKeyStart = `${path}.${from}`;
  const newKeyStart = `${path}.${to}`;

  const clone: any = { ...errors };
  const processedKeys = new Set<string>();

  Object.keys(errors as any).forEach((key) => {
    if (processedKeys.has(key)) {
      return;
    }

    let oldKey;
    let newKey;

    // 完整段匹配（key 等于前缀或以「前缀.」开头）：
    // 纯 startsWith 会让 list.12.x 误命中 list.1 的交换，产出 list.22.x 这类脏 key
    if (key === oldKeyStart || key.startsWith(`${oldKeyStart}.`)) {
      oldKey = key;
      newKey = key.replace(oldKeyStart, newKeyStart);
    } else if (key === newKeyStart || key.startsWith(`${newKeyStart}.`)) {
      oldKey = key.replace(newKeyStart, oldKeyStart);
      newKey = key;
    }

    if (oldKey && newKey) {
      const value1 = clone[oldKey];
      const value2 = clone[newKey];

      value2 === undefined ? delete clone[oldKey] : (clone[oldKey] = value2);
      value1 === undefined ? delete clone[newKey] : (clone[newKey] = value1);

      processedKeys.add(oldKey);
      processedKeys.add(newKey);
    }
  });

  return clone;
}
