const buttonVariants = [
    'filled',
    'light',
    'outline',
    'transparent',
    'white',
    'subtle',
    'default',
    'gradient'
] as const

export type ButtonVariant = (typeof buttonVariants)[number]

export interface ButtonProps {
    /** 按钮的变体 */
    variant?: ButtonVariant
    /** 按钮的尺寸 */
    size?: 'small' | 'medium' | 'large'
    /** 是否禁用 */
    disabled?: boolean
}
