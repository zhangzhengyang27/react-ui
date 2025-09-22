import styled, { css } from 'styled-components'
import { VariantColorResolverResult } from '../../core/types/theme.types'
import { darken, lighten } from '../../core/utils/theme'
import { ButtonVariant } from './types'

const variantMap: Record<ButtonVariant, VariantColorResolverResult> = {
    default: {
        color: '#383838',
        background: '#f5f5f5',
        hover: darken('#f5f5f5', 0.01),
        border: '1px solid #e9e9e9'
    },
    filled: {
        color: '#fff',
        background: 'var(--ui-primary-color-6)',
        hover: darken('#f8f9fa', 0.01),
        border: '1px solid #e9ecef'
    },
    light: {
        color: '#383838',
        background: '#f8f9fa',
        hover: darken('#f8f9fa', 0.01),
        border: '1px solid #e9ecef'
    },
    outline: {
        color: 'var(--ui-primary-color-6)',
        background: 'transparent',
        hover: lighten('#f5f5f5', 0.01),
        border: `1px solid var(--ui-primary-color-6)`
    },
    transparent: {
        color: 'var(--ui-primary-color-6)',
        background: 'transparent',
        hover: 'transparent',
        border: 'none'
    },
    white: {
        color: '#383838',
        background: '#fff',
        hover: darken('#fff', 0.01),
        border: '1px solid #e9ecef'
    },
    subtle: {
        color: '#383838',
        background: '#f5f5f5',
        hover: darken('#f5f5f5', 0.01),
        border: 'none'
    },
    gradient: {
        color: '#fff',
        background: `linear-gradient(45deg, var(--ui-primary-color-6), ${lighten('var(--ui-primary-color-6)', 0.4)})`,
        hover: `linear-gradient(45deg, var(--ui-primary-color-6), ${lighten('var(--ui-primary-color-6)', 0.4)})`,
        border: 'none'
    }
}

const getVariantColors = (variant: keyof typeof variantMap = 'default') => {
    return variantMap[variant]
}

const ButtonVarsCss = css`
    --button-height-xs: 30px;
    --button-height-sm: 36px;
    --button-height-md: 42px;
    --button-height-lg: 50px;
    --button-height-xl: 60px;
`

export const Button = styled.button<{ variant?: keyof typeof variantMap }>`
    ${ButtonVarsCss}

    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    user-select: none;
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: 0.25rem;
    transition:
        color 0.15s,
        background-color 0.15s,
        border-color 0.15s;
    cursor: pointer;

    color: ${props => getVariantColors(props.variant).color};
    background: ${props => getVariantColors(props.variant).background};
    border: ${props => getVariantColors(props.variant).border};

    &:focus {
        outline: none;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.65;
    }

    &.btn-block {
        display: block;
        width: 100%;
    }

    &:not(:disabled):hover {
        background: ${props => getVariantColors(props.variant).hover};
    }
`
