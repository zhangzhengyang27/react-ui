import { useCallback, useEffect, useRef, useState } from 'react'
import { useIsomorphicEffect } from '../use-isomorphic-effect/use-isomorphic-effect'

export interface UseFileDialogOptions {
    /** Determines whether multiple files are allowed, `true` by default */
    multiple?: boolean

    /** `accept` attribute of the file input, '*' by default */
    accept?: string

    /** `capture` attribute of the file input */
    capture?: string

    /** Determines whether the user can pick a directory instead of file, `false` by default */
    directory?: boolean

    /** Determines whether the file input state should be reset when the file dialog is opened, `false` by default */
    resetOnOpen?: boolean

    /** Initial selected files */
    initialFiles?: FileList | File[]

    /** Called when files are selected */
    onChange?: (files: FileList | null) => void

    /** Called when file dialog is canceled */
    onCancel?: () => void
}

const defaultOptions: UseFileDialogOptions = {
    multiple: true,
    accept: '*'
}

function getInitialFilesList(files: UseFileDialogOptions['initialFiles']): FileList | null {
    if (!files) {
        return null
    }

    if (files instanceof FileList) {
        return files
    }

    const result = new DataTransfer()
    for (const file of files) {
        result.items.add(file)
    }

    return result.files
}

function createInput(options: UseFileDialogOptions) {
    if (typeof document === 'undefined') {
        return null
    }

    const input = document.createElement('input')
    input.type = 'file'

    if (options.accept) {
        input.accept = options.accept
    }

    if (options.multiple) {
        input.multiple = options.multiple
    }

    if (options.capture) {
        input.capture = options.capture
    }

    if (options.directory) {
        input.webkitdirectory = options.directory
    }

    input.style.display = 'none'
    return input
}

export interface UseFileDialogReturnValue {
    files: FileList | null
    open: () => void
    reset: () => void
}

export function useFileDialog(input: UseFileDialogOptions = {}): UseFileDialogReturnValue {
    const options: UseFileDialogOptions = { ...defaultOptions, ...input }
    const [files, setFiles] = useState<FileList | null>(getInitialFilesList(options.initialFiles))
    const inputRef = useRef<HTMLInputElement | null>(null)

    // 用 ref 跟踪最新 options,避免 options 对象进入 useCallback deps
    // 每次 render 新身份导致 createAndSetupInput/open 也每次新身份,消费者 memoization 失效
    const optionsRef = useRef(options)
    useEffect(() => {
        optionsRef.current = options
    })

    const handleChange = useCallback((event: Event) => {
        const target = event.target as HTMLInputElement
        if (target?.files) {
            setFiles(target.files)
            optionsRef.current.onChange?.(target.files)
        }
    }, [])

    const createAndSetupInput = useCallback(() => {
        inputRef.current?.remove()
        const opts = optionsRef.current
        inputRef.current = createInput(opts)

        if (inputRef.current) {
            inputRef.current.addEventListener('change', handleChange, { once: true })
            if (opts.onCancel) {
                inputRef.current.addEventListener('cancel', opts.onCancel, { once: true })
            }
            document.body.appendChild(inputRef.current)
        }
    }, [handleChange])

    useIsomorphicEffect(() => {
        createAndSetupInput()
        return () => inputRef.current?.remove()
    }, [createAndSetupInput])

    const reset = useCallback(() => {
        setFiles(null)
        optionsRef.current.onChange?.(null)
    }, [])

    const open = useCallback(() => {
        if (optionsRef.current.resetOnOpen) {
            reset()
        }

        createAndSetupInput()
        inputRef.current?.click()
    }, [reset, createAndSetupInput])

    return { files, open, reset }
}

export namespace useFileDialog {
    export type Options = UseFileDialogOptions
    export type ReturnValue = UseFileDialogReturnValue
}
