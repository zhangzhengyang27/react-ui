import { useEffect } from 'react'
import { useEffectEvent } from '../use-effect-event/use-effect-event'
import { getHotkeyHandler, getHotkeyMatcher, HotkeyItemOptions } from './parse-hotkey'

export type { HotkeyItemOptions }
export { getHotkeyHandler }

export type HotkeyItem = [string, (event: KeyboardEvent) => void, HotkeyItemOptions?]

function shouldFireEvent(event: KeyboardEvent, tagsToIgnore: string[], triggerOnContentEditable = false) {
    if (event.target instanceof HTMLElement) {
        if (triggerOnContentEditable) {
            return !tagsToIgnore.includes(event.target.tagName)
        }

        return !event.target.isContentEditable && !tagsToIgnore.includes(event.target.tagName)
    }

    return true
}

export function useHotkeys(
    hotkeys: HotkeyItem[],
    tagsToIgnore: string[] = ['INPUT', 'TEXTAREA', 'SELECT'],
    triggerOnContentEditable = false
) {
    const handleKeydown = useEffectEvent((event: KeyboardEvent) => {
        // 输入法合成期间的 keydown(isComposing/keyCode 229):组合文本尚未上屏,
        // 触发快捷键会误触,尤其 triggerOnContentEditable 场景 tagsToIgnore 挡不住
        if (event.isComposing || event.keyCode === 229) {
            return
        }
        hotkeys.forEach(([hotkey, handler, options = { preventDefault: true, usePhysicalKeys: false }]) => {
            if (
                getHotkeyMatcher(hotkey, options.usePhysicalKeys)(event) &&
                shouldFireEvent(event, tagsToIgnore, triggerOnContentEditable)
            ) {
                if (options.preventDefault) {
                    event.preventDefault()
                }

                handler(event)
            }
        })
    })

    useEffect(() => {
        if (typeof document === 'undefined') {
            return
        }
        document.documentElement.addEventListener('keydown', handleKeydown)
        return () => document.documentElement.removeEventListener('keydown', handleKeydown)
    }, [])
}

export namespace useHotkeys {
    export type Hotkey = HotkeyItem
}
