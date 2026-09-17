import { useCallback, useState } from 'react'

interface ModalStackReturnType<T extends string> {
    state: Record<T, boolean>
    open: (id: T) => void
    close: (id: T) => void
    toggle: (id: T) => void
    closeAll: () => void
    register: (id: T) => { opened: boolean; onClose: () => void; stackId: T }
}

export function useModalsStack<const T extends string>(modals: T[]): ModalStackReturnType<T> {
    // 惰性初始化：initialState 若在渲染期每次新建对象，closeAll 的依赖 [initialState]
    // 会让其引用每次渲染变化，与 open/close/toggle 的稳定 API 语义不一致
    const [state, setState] = useState(() =>
        modals.reduce(
            (acc, modal) => ({ ...acc, [modal]: false }),
            {} as Record<T, boolean>
        )
    )

    const open = useCallback((modal: T) => {
        setState((current) => ({ ...current, [modal]: true }))
    }, [])

    const close = useCallback(
        (modal: T) => setState((current) => ({ ...current, [modal]: false })),
        []
    )

    const toggle = useCallback(
        (modal: T) => setState((current) => ({ ...current, [modal]: !current[modal] })),
        []
    )

    // 基于当前 state 形状整体置 false：modals 数组首帧后增删 key 时也能保留新 key，
    // 而不是重置回首帧形状（新 key 变 undefined）
    const closeAll = useCallback(
        () =>
            setState((current) =>
                Object.fromEntries(Object.keys(current).map((key) => [key, false])) as Record<T, boolean>
            ),
        []
    )

    const register = useCallback(
        (modal: T) => ({
            opened: state[modal],
            onClose: () => close(modal),
            stackId: modal
        }),
        [state, close]
    )

    return { state, open, close, closeAll, toggle, register }
}

export const useDrawersStack = useModalsStack
