import { useReactId } from './use-react-id'

/**
 * 生成唯一的ID，优先使用静态ID，其次使用 React 19 useId 生成的稳定 ID。
 *
 * @param {string} [staticId] - 可选的静态ID，如果提供则直接返回该值
 * @returns {string} 生成的唯一ID
 *
 * @remarks
 * - **D1 决策**: 始终返回 reactId（React 19 useId 已稳定且唯一）。
 *   此前的实现会在客户端挂载后通过 useIsomorphicEffect 切换为 randomId(),
 *   导致 SSR hydration mismatch（首屏渲染 reactId,客户端挂载后变 randomId）。
 *   React 19 的 useId 已提供稳定且 SSR 友好的唯一 ID,无需再 fallback 到 randomId。
 *   若消费者需要可预测的固定 ID,请传 staticId。
 */
export function useId(staticId?: string) {
    const reactId = useReactId()

    if (typeof staticId === 'string') {
        return staticId
    }

    return reactId
}
