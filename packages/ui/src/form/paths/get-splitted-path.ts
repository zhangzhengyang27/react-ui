// 限制:路径以点号分段,字段名本身含点号时无法用 a.b 形式表达
// (无转义语法,a\.b 会被拆成 a\b 两段);路径转义属破坏性 API 变更,当前版本不支持
export function getSplittedPath(path: unknown) {
  if (typeof path !== 'string') {
    return [];
  }

  return path.split('.');
}
