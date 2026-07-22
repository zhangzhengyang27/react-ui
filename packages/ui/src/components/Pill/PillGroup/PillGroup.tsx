import { createContext, useContext } from 'react'
import {
    Box,
    BoxProps,
    createVarsResolver,
    ElementProps,
    factory,
    Factory,
    getSize,
    getSpacing,
    UISize,
    StylesApiProps,
    useProps,
    useStyles
} from '../../../core'
import { PillsInputContext } from '../../PillsInput/PillsInput.context'
import classes from '../Pill.module.css'

export interface PillGroupContextValue {
    size: UISize | (string & {}) | undefined
    disabled: boolean | undefined
}

export const PillGroupContext = createContext<PillGroupContextValue | null>(null)

export type PillGroupStylesNames = 'group'
export type PillGroupCssVariables = {
    group: '--pill-group-gap'
}

export interface PillGroupProps
    extends BoxProps, StylesApiProps<PillGroupFactory>, ElementProps<'div'> {
    /** Controls spacing between pills, by default controlled by `size` */
    gap?: UISize | (string & {}) | number

    /** Controls size of the child `Pill` components and gap between them @default 'sm' */
    size?: UISize | (string & {})

    /** If set, adds disabled to all child `Pill` components */
    disabled?: boolean
}

export type PillGroupFactory = Factory<{
    props: PillGroupProps
    ref: HTMLDivElement
    stylesNames: PillGroupStylesNames
    vars: PillGroupCssVariables
    ctx: { size: UISize | (string & {}) | undefined }
}>

const varsResolver = createVarsResolver<PillGroupFactory>((_, { gap }, { size }) => ({
    group: {
        '--pill-group-gap': gap !== undefined ? getSpacing(gap) : getSize(size, 'pill-group-gap')
    }
}))

export const PillGroup = factory<PillGroupFactory>((_props, _ref) => {
    const props = useProps('PillGroup', null, _props)
    const {
        classNames,
        className,
        style,
        styles,
        unstyled,
        vars,
        size,
        disabled,
        attributes,
        ...others
    } = props
    const pillsInputCtx = useContext(PillsInputContext)
    const _size = pillsInputCtx?.size || size || undefined

    const getStyles = useStyles<PillGroupFactory>({
        name: 'PillGroup',
        classes,
        props,
        className,
        style,
        classNames,
        styles,
        unstyled,
        attributes,
        vars,
        varsResolver,
        stylesCtx: { size: _size },
        rootSelector: 'group'
    })

    return (
        <PillGroupContext.Provider value={{ size: _size, disabled }}>
            <Box ref={_ref} size={_size} {...getStyles('group')} {...others} />
        </PillGroupContext.Provider>
    )
})

PillGroup.classes = classes
PillGroup.varsResolver = varsResolver
PillGroup.displayName = '@xiaoye-react/ui/PillGroup'
