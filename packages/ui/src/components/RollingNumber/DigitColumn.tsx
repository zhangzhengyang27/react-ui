import { useStyles } from '../../core'
import type { RollingNumberFactory } from './RollingNumber'

const STRIP_CELLS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '1']

interface DigitColumnProps {
    digit: string
    getStyles: ReturnType<typeof useStyles<RollingNumberFactory>>
    previousDigit: string | null
    empty?: boolean
    valueDirection: 'up' | 'down'
}

export function DigitColumn({
    digit,
    getStyles,
    previousDigit,
    empty,
    valueDirection,
}: DigitColumnProps) {
    const digitIndex = parseInt(digit, 10)
    const previousDigitIndex = previousDigit !== null ? parseInt(previousDigit, 10) : digitIndex

    // 递增跨边界(如 9→0):从真实数位向前滚到 strip 尾部重复区
    const wrapsForward =
        valueDirection === 'up' &&
        previousDigit !== null &&
        digitIndex < previousDigitIndex &&
        digitIndex <= 1

    // 递减跨边界(如 10→9):从 strip 尾部重复区(index previousDigitIndex + 10)
    // 向后单步滚到真实数位,避免从 index 0 反向滚 9 步
    const wrapsBackward =
        valueDirection === 'down' &&
        previousDigit !== null &&
        digitIndex > previousDigitIndex &&
        previousDigitIndex <= 1

    const rollFromIndex = wrapsBackward ? previousDigitIndex + 10 : previousDigitIndex
    const rollToIndex = wrapsForward ? digitIndex + 10 : digitIndex

    const digitStyles = getStyles('digit')
    const columnStyles = getStyles('digitColumn')

    return (
        <span {...digitStyles} data-empty={empty || undefined} aria-hidden="true">
            <span
                key={digit}
                {...columnStyles}
                style={{
                    ...columnStyles.style,
                    transform: `translateY(${-digitIndex}em)`,
                    ['--rolling-number-roll-from' as any]: `translateY(${-rollFromIndex}em)`,
                    ['--rolling-number-roll-to' as any]: `translateY(${-rollToIndex}em)`,
                }}
            >
                {STRIP_CELLS.map((d, i) => (
                    <span key={i}>{d}</span>
                ))}
            </span>
        </span>
    )
}
