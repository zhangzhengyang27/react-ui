import React, { PropsWithChildren } from 'react'
import * as SC from './styles'
import { ButtonProps } from './types'

export const Button = ({
    variant = 'default',
    disabled = false,
    children
}: PropsWithChildren<ButtonProps>) => {
    return (
        <>
            <SC.Button disabled={disabled} data-disable={disabled} variant={variant}>
                {children}
            </SC.Button>
        </>
    )
}
