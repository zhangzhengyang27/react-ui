import { forwardRef, useCallback, useEffect, useRef } from 'react'
import { assignRef, useMergedRef } from '@xiaoye-react/hooks'

export interface FileButtonProps<Multiple extends boolean = false> {
    /** Called when files are picked */
    onChange: (payload: Multiple extends true ? File[] : File | null) => void

    /** Function that receives button props and returns react node that should be rendered */
    children: (props: { onClick: () => void }) => React.ReactNode

    /** If set, user can pick more than one file */
    multiple?: Multiple

    /** File input accept attribute, for example, `"image/png,image/jpeg"` */
    accept?: string

    /** Input name attribute */
    name?: string

    /** Input form attribute */
    form?: string

    /** Reference of the function that should be called when value changes to null or empty array */
    resetRef?: React.Ref<() => void>

    /** Disables file picker */
    disabled?: boolean

    /** Specifies that, optionally, a new file should be captured, and which device should be used to capture that new media of a type defined by the accept attribute. */
    capture?: boolean | 'user' | 'environment'

    /** Passes down props to the input element used to capture files */
    inputProps?: React.ComponentProps<'input'>
}

export const FileButton = forwardRef<HTMLInputElement, FileButtonProps>(
    ({ onChange, children, multiple, accept, name, form, resetRef, disabled, capture, inputProps, ...others }, ref) => {
        const inputRef = useRef<HTMLInputElement>(null)

        const onClick = () => {
            if (!disabled) {
                inputRef.current?.click()
            }
        }

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.currentTarget.files === null) {
                return onChange(multiple ? ([] as any) : null)
            }

            if (multiple) {
                onChange(Array.from(event.currentTarget.files) as any)
            } else {
                onChange((event.currentTarget.files[0] as any) || null)
            }
        }

        // reset 闭包仅依赖稳定的 inputRef，useCallback 稳定身份供 effect 依赖
        const reset = useCallback(() => {
            if (inputRef.current) {
                inputRef.current.value = ''
            }
        }, [])

        // 渲染期直接 assignRef 会在并发渲染被丢弃的渲染中也写 ref，且卸载不清理（残留已卸载闭包），
        // 移入 effect 并在卸载/重挂时置空（对齐 MaskInput resetRef 的写法）
        useEffect(() => {
            assignRef(resetRef, reset)
            return () => {
                assignRef(resetRef, null)
            }
        }, [resetRef, reset])

        return (
            <>
                <input
                    style={{ display: 'none' }}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleChange}
                    ref={useMergedRef(ref, inputRef)}
                    name={name}
                    form={form}
                    capture={capture}
                    {...inputProps}
                />
                {children({ onClick, ...others })}
            </>
        )
    }
) as <Multiple extends boolean = false>(props: FileButtonProps<Multiple>) => React.JSX.Element
;(FileButton as any).displayName = '@xiaoye-react/ui/FileButton'

export namespace FileButton {
    export type Props<Multiple extends boolean = false> = FileButtonProps<Multiple>
}
