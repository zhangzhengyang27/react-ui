/**
 * react-router@6.3.0 matchPath 正则编译缓存补丁
 *
 * 背景（切页卡顿治理 · 修复 2）：react-router 的 matchPath 每次调用都会为
 * pattern 重新执行 compilePath（多层字符串 replace + new RegExp）。本站路由表
 * 有数千条路由（demo 子路由占大头），<Routes> 每次渲染都会全量 matchRoutes，
 * 叠加异步 chunk 加载引发的高频重渲染，实测单次切页触发约 90 万次正则编译/
 * 匹配，是切页卡顿的主要来源。
 *
 * matchRoutes 内部每次都会新建 pattern 对象，因此缓存 key 只能用
 * "path|caseSensitive|end" 字符串（key 数量 ≈ 路由条数，有界）。
 * 匹配逻辑与 react-router@6.3.0 的 matchPath/compilePath 完全一致，仅去除
 * 开发期 warning。
 *
 * 生效方式（见 .dumirc.ts）：
 *   alias 'react-router$'        → 本文件（精确匹配，不影响 react-router-dom 等子路径）
 *   alias 'react-router-actual$' → 配置期 require.resolve 出的 react-router 实际副本入口
 */

interface CompiledPath {
    matcher: RegExp
    paramNames: string[]
}

const compiledCache = new Map<string, CompiledPath>()

function compilePath(path: string, caseSensitive: boolean, end: boolean): CompiledPath {
    const paramNames: string[] = []
    let regexpSource =
        '^' +
        path
            .replace(/\/*\*?$/, '')
            .replace(/^\/*/, '/')
            .replace(/[\\.*+^$?{}|()[\]]/g, '\\$&')
            .replace(/:(\w+)/g, (_match: string, paramName: string) => {
                paramNames.push(paramName)
                return '([^\\/]+)'
            })

    if (path.endsWith('*')) {
        paramNames.push('*')
        regexpSource += path === '*' || path === '/*' ? '(.*)$' : '(?:\\/(.+)|\\/*)$'
    } else {
        regexpSource += end ? '\\/*$' : '(?:(?=[.~-]|%[0-9A-F]{2})|\\b|\\/|$)'
    }

    const matcher = new RegExp(regexpSource, caseSensitive ? undefined : 'i')
    return { matcher, paramNames }
}

function getCompiled(path: string, caseSensitive: boolean, end: boolean): CompiledPath {
    const cacheKey = `${path}|${caseSensitive}|${end}`
    let compiled = compiledCache.get(cacheKey)
    if (!compiled) {
        compiled = compilePath(path, caseSensitive, end)
        compiledCache.set(cacheKey, compiled)
    }
    return compiled
}

function matchPath(pattern: any, pathname: string) {
    if (typeof pattern === 'string') {
        pattern = { path: pattern, caseSensitive: false, end: true }
    }

    const compiled = getCompiled(pattern.path, !!pattern.caseSensitive, pattern.end !== false)

    const match = pathname.match(compiled.matcher)
    if (!match) return null
    const matchedPathname = match[0]
    let pathnameBase = matchedPathname.replace(/(.)\/+$/, '$1')
    const captureGroups = match.slice(1)
    const params = compiled.paramNames.reduce((memo, paramName, index) => {
        // splat 参数需要用原始（未解码）值计算 pathnameBase
        if (paramName === '*') {
            const splatValue = captureGroups[index] || ''
            pathnameBase = matchedPathname
                .slice(0, matchedPathname.length - splatValue.length)
                .replace(/(.)\/+$/, '$1')
        }
        memo[paramName] = safelyDecodeURIComponent(captureGroups[index] || '', paramName)
        return memo
    }, {} as Record<string, string>)
    return {
        params,
        pathname: matchedPathname,
        pathnameBase,
        pattern,
    }
}

function safelyDecodeURIComponent(value: string) {
    try {
        return decodeURIComponent(value)
    } catch (error) {
        return value
    }
}

export { matchPath }

export * from 'react-router-actual'
