import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AiOutlineCopy, AiOutlineReload, AiOutlineSave } from '../../theme/icons'
import { Helmet } from 'dumi'
import {
    Alert,
    Button,
    ColorInput,
    Divider,
    Group,
    Notifications,
    NumberInput,
    Select,
    Slider,
    Stack,
    Switch,
    Tabs,
    Text,
    TextInput,
    Title,
    Textarea,
    notifications
} from '@xiaoye-react/ui'

import useLocale from '../../hooks/useLocale'

import classes from './index.module.css'

const locales = {
    cn: {
        title: '主题编辑器',
        subtitle: '基于 react-ui 主题系统的简化版主题编辑器',
        save: '保存',
        reset: '重置',
        copy: '复制配置',
        copied: '已复制到剪贴板',
        saveSuccessfully: '主题配置已保存',
        resetSuccessfully: '主题配置已重置',
        tabColors: '颜色',
        tabTypography: '字体',
        tabRadius: '圆角',
        tabSpacing: '间距',
        tabShadows: '阴影',
        tabExport: '导出',
        primaryColor: '主色调名称',
        primaryShadeLight: '浅色模式主色阶 (0-9)',
        primaryShadeDark: '深色模式主色阶 (0-9)',
        white: '白色色值',
        black: '黑色色值',
        autoContrast: '自动对比度',
        luminanceThreshold: '亮度阈值',
        fontFamily: '默认字体',
        fontFamilyMonospace: '等宽字体',
        fontSizeXs: '字号 xs',
        fontSizeSm: '字号 sm',
        fontSizeMd: '字号 md',
        fontSizeLg: '字号 lg',
        fontSizeXl: '字号 xl',
        defaultRadius: '默认圆角',
        radiusXs: '圆角 xs',
        radiusSm: '圆角 sm',
        radiusMd: '圆角 md',
        radiusLg: '圆角 lg',
        radiusXl: '圆角 xl',
        spacingXs: '间距 xs',
        spacingSm: '间距 sm',
        spacingMd: '间距 md',
        spacingLg: '间距 lg',
        spacingXl: '间距 xl',
        shadowXs: '阴影 xs',
        shadowSm: '阴影 sm',
        shadowMd: '阴影 md',
        shadowLg: '阴影 lg',
        shadowXl: '阴影 xl',
        focusRing: '焦点环样式',
        cursorType: '光标类型',
        exportHint: '复制下方 JSON 并通过 UIProvider 的 theme 属性应用：',
        configLabel: '主题配置 JSON',
        noteTitle: '说明',
        note: '本编辑器为简化版本，仅覆盖 react-ui 主题系统的常用字段。完整字段请参考 packages/ui/src/core/UIProvider/theme.types.ts。'
    },
    en: {
        title: 'Theme Editor',
        subtitle: 'A simplified theme editor built on the react-ui theme system',
        save: 'Save',
        reset: 'Reset',
        copy: 'Copy Config',
        copied: 'Copied to clipboard',
        saveSuccessfully: 'Theme config saved',
        resetSuccessfully: 'Theme config reset',
        tabColors: 'Colors',
        tabTypography: 'Typography',
        tabRadius: 'Radius',
        tabSpacing: 'Spacing',
        tabShadows: 'Shadows',
        tabExport: 'Export',
        primaryColor: 'Primary color name',
        primaryShadeLight: 'Primary shade (light, 0-9)',
        primaryShadeDark: 'Primary shade (dark, 0-9)',
        white: 'White color',
        black: 'Black color',
        autoContrast: 'Auto contrast',
        luminanceThreshold: 'Luminance threshold',
        fontFamily: 'Default font family',
        fontFamilyMonospace: 'Monospace font family',
        fontSizeXs: 'Font size xs',
        fontSizeSm: 'Font size sm',
        fontSizeMd: 'Font size md',
        fontSizeLg: 'Font size lg',
        fontSizeXl: 'Font size xl',
        defaultRadius: 'Default radius',
        radiusXs: 'Radius xs',
        radiusSm: 'Radius sm',
        radiusMd: 'Radius md',
        radiusLg: 'Radius lg',
        radiusXl: 'Radius xl',
        spacingXs: 'Spacing xs',
        spacingSm: 'Spacing sm',
        spacingMd: 'Spacing md',
        spacingLg: 'Spacing lg',
        spacingXl: 'Spacing xl',
        shadowXs: 'Shadow xs',
        shadowSm: 'Shadow sm',
        shadowMd: 'Shadow md',
        shadowLg: 'Shadow lg',
        shadowXl: 'Shadow xl',
        focusRing: 'Focus ring',
        cursorType: 'Cursor type',
        exportHint: 'Copy the JSON below and apply it via the theme prop of UIProvider:',
        configLabel: 'Theme config JSON',
        noteTitle: 'Note',
        note: 'This is a simplified editor that only covers common fields of the react-ui theme system. For the full schema, see packages/ui/src/core/UIProvider/theme.types.ts.'
    }
}

const STORAGE_KEY = 'react-ui-theme-editor-theme'

const PRIMARY_COLOR_OPTIONS = [
    'dark',
    'gray',
    'red',
    'pink',
    'grape',
    'violet',
    'indigo',
    'blue',
    'cyan',
    'green',
    'lime',
    'yellow',
    'orange',
    'teal'
]

const SIZE_OPTIONS = ['xs', 'sm', 'md', 'lg', 'xl']

interface ThemeEditorState {
    primaryColor: string
    primaryShadeLight: number
    primaryShadeDark: number
    white: string
    black: string
    autoContrast: boolean
    luminanceThreshold: number
    fontFamily: string
    fontFamilyMonospace: string
    fontSizes: Record<string, string>
    defaultRadius: string
    radius: Record<string, string>
    spacing: Record<string, string>
    shadows: Record<string, string>
    focusRing: 'auto' | 'always' | 'never'
    cursorType: 'default' | 'pointer'
}

const DEFAULT_STATE: ThemeEditorState = {
    primaryColor: 'blue',
    primaryShadeLight: 6,
    primaryShadeDark: 8,
    white: '#ffffff',
    black: '#0a0a0a',
    autoContrast: false,
    luminanceThreshold: 0.3,
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    fontFamilyMonospace:
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    fontSizes: {
        xs: '0.75rem',
        sm: '0.875rem',
        md: '1rem',
        lg: '1.125rem',
        xl: '1.25rem'
    },
    defaultRadius: 'sm',
    radius: {
        xs: '0.125rem',
        sm: '0.25rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem'
    },
    spacing: {
        xs: '0.625rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.25rem',
        xl: '1.5rem'
    },
    shadows: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    focusRing: 'auto',
    cursorType: 'default'
}

function loadState(): ThemeEditorState {
    if (typeof window === 'undefined') return DEFAULT_STATE
    try {
        const stored = window.localStorage.getItem(STORAGE_KEY)
        if (!stored) return DEFAULT_STATE
        const parsed = JSON.parse(stored)
        return { ...DEFAULT_STATE, ...parsed }
    } catch {
        return DEFAULT_STATE
    }
}

function stateToThemeConfig(state: ThemeEditorState) {
    return {
        primaryColor: state.primaryColor,
        primaryShade: { light: state.primaryShadeLight, dark: state.primaryShadeDark },
        white: state.white,
        black: state.black,
        autoContrast: state.autoContrast,
        luminanceThreshold: state.luminanceThreshold,
        fontFamily: state.fontFamily,
        fontFamilyMonospace: state.fontFamilyMonospace,
        fontSizes: state.fontSizes,
        defaultRadius: state.defaultRadius,
        radius: state.radius,
        spacing: state.spacing,
        shadows: state.shadows,
        focusRing: state.focusRing,
        cursorType: state.cursorType
    }
}

const ThemeEditorPage: React.FC = () => {
    const [locale] = useLocale(locales)
    const [state, setState] = useState<ThemeEditorState>(loadState)

    useEffect(() => {
        if (typeof window === 'undefined') return
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }, [state])

    const update = useCallback(<K extends keyof ThemeEditorState>(key: K, value: ThemeEditorState[K]) => {
        setState(prev => ({ ...prev, [key]: value }))
    }, [])

    const updateSizeRecord = useCallback(
        (key: 'fontSizes' | 'radius' | 'spacing' | 'shadows', size: string, value: string) => {
            setState(prev => ({ ...prev, [key]: { ...prev[key], [size]: value } }))
        },
        []
    )

    const themeConfig = useMemo(() => stateToThemeConfig(state), [state])
    const configJson = useMemo(() => JSON.stringify(themeConfig, null, 2), [themeConfig])

    const handleSave = useCallback(() => {
        notifications.show({
            title: locale.title,
            message: locale.saveSuccessfully,
            color: 'green',
            autoClose: 2500
        })
    }, [locale])

    const handleReset = useCallback(() => {
        setState(DEFAULT_STATE)
        notifications.show({
            title: locale.title,
            message: locale.resetSuccessfully,
            color: 'blue',
            autoClose: 2500
        })
    }, [locale])

    const handleCopy = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(configJson)
            notifications.show({
                title: locale.title,
                message: locale.copied,
                color: 'teal',
                autoClose: 2000
            })
        } catch {
            notifications.show({
                title: locale.title,
                message: locale.copied,
                color: 'red',
                autoClose: 2500
            })
        }
    }, [configJson, locale])

    return (
        <div className={classes.wrapper}>
            <Notifications position="top-right" />
            <Helmet>
                <title>{`${locale.title} - react-ui`}</title>
                <meta property="og:title" content={`${locale.title} - react-ui`} />
            </Helmet>

            <Stack gap="md">
                <div className={classes.header}>
                    <Stack gap={4}>
                        <Title order={2}>{locale.title}</Title>
                        <Text size="sm" c="dimmed">
                            {locale.subtitle}
                        </Text>
                    </Stack>
                    <Group gap="sm">
                        <Button variant="default" leftSection={<AiOutlineReload />} onClick={handleReset}>
                            {locale.reset}
                        </Button>
                        <Button leftSection={<AiOutlineSave />} onClick={handleSave}>
                            {locale.save}
                        </Button>
                    </Group>
                </div>

                <Alert color="blue" variant="light" title={locale.noteTitle}>
                    {locale.note}
                </Alert>

                <Tabs defaultValue="colors" className={classes.tabs}>
                    <Tabs.List>
                        <Tabs.Tab value="colors">{locale.tabColors}</Tabs.Tab>
                        <Tabs.Tab value="typography">{locale.tabTypography}</Tabs.Tab>
                        <Tabs.Tab value="radius">{locale.tabRadius}</Tabs.Tab>
                        <Tabs.Tab value="spacing">{locale.tabSpacing}</Tabs.Tab>
                        <Tabs.Tab value="shadows">{locale.tabShadows}</Tabs.Tab>
                        <Tabs.Tab value="export">{locale.tabExport}</Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="colors" className={classes.panel}>
                        <Stack gap="md">
                            <div className={classes.grid}>
                                <Select
                                    label={locale.primaryColor}
                                    data={PRIMARY_COLOR_OPTIONS}
                                    value={state.primaryColor}
                                    onChange={v => update('primaryColor', v ?? 'blue')}
                                />
                                <NumberInput
                                    label={locale.primaryShadeLight}
                                    min={0}
                                    max={9}
                                    value={state.primaryShadeLight}
                                    onChange={v => update('primaryShadeLight', Number(v) || 0)}
                                />
                                <NumberInput
                                    label={locale.primaryShadeDark}
                                    min={0}
                                    max={9}
                                    value={state.primaryShadeDark}
                                    onChange={v => update('primaryShadeDark', Number(v) || 0)}
                                />
                                <ColorInput
                                    label={locale.white}
                                    value={state.white}
                                    onChange={v => update('white', v)}
                                />
                                <ColorInput
                                    label={locale.black}
                                    value={state.black}
                                    onChange={v => update('black', v)}
                                />
                            </div>
                            <Divider />
                            <Group align="center" gap="md">
                                <Switch
                                    label={locale.autoContrast}
                                    checked={state.autoContrast}
                                    onChange={e => update('autoContrast', e.currentTarget.checked)}
                                />
                            </Group>
                            <div className={classes.sliderRow}>
                                <Text size="sm" fw={500}>
                                    {locale.luminanceThreshold}
                                </Text>
                                <Slider
                                    min={0}
                                    max={1}
                                    step={0.05}
                                    value={state.luminanceThreshold}
                                    onChange={v => update('luminanceThreshold', v)}
                                    className={classes.slider}
                                />
                                <Text size="sm" c="dimmed" className={classes.sliderValue}>
                                    {state.luminanceThreshold.toFixed(2)}
                                </Text>
                            </div>
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="typography" className={classes.panel}>
                        <Stack gap="md">
                            <TextInput
                                label={locale.fontFamily}
                                value={state.fontFamily}
                                onChange={e => update('fontFamily', e.currentTarget.value)}
                            />
                            <TextInput
                                label={locale.fontFamilyMonospace}
                                value={state.fontFamilyMonospace}
                                onChange={e => update('fontFamilyMonospace', e.currentTarget.value)}
                            />
                            <Divider label={locale.fontSizeMd} labelPosition="left" />
                            <div className={classes.grid}>
                                {SIZE_OPTIONS.map(size => (
                                    <TextInput
                                        key={size}
                                        label={
                                            locale[
                                                `fontSize${size.charAt(0).toUpperCase()}${size.slice(1)}` as keyof typeof locale
                                            ]
                                        }
                                        value={state.fontSizes[size]}
                                        onChange={e => updateSizeRecord('fontSizes', size, e.currentTarget.value)}
                                    />
                                ))}
                            </div>
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="radius" className={classes.panel}>
                        <Stack gap="md">
                            <Select
                                label={locale.defaultRadius}
                                data={SIZE_OPTIONS}
                                value={state.defaultRadius}
                                onChange={v => update('defaultRadius', v ?? 'sm')}
                            />
                            <Divider />
                            <div className={classes.grid}>
                                {SIZE_OPTIONS.map(size => (
                                    <TextInput
                                        key={size}
                                        label={
                                            locale[
                                                `radius${size.charAt(0).toUpperCase()}${size.slice(1)}` as keyof typeof locale
                                            ]
                                        }
                                        value={state.radius[size]}
                                        onChange={e => updateSizeRecord('radius', size, e.currentTarget.value)}
                                    />
                                ))}
                            </div>
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="spacing" className={classes.panel}>
                        <Stack gap="md">
                            <div className={classes.grid}>
                                {SIZE_OPTIONS.map(size => (
                                    <TextInput
                                        key={size}
                                        label={
                                            locale[
                                                `spacing${size.charAt(0).toUpperCase()}${size.slice(1)}` as keyof typeof locale
                                            ]
                                        }
                                        value={state.spacing[size]}
                                        onChange={e => updateSizeRecord('spacing', size, e.currentTarget.value)}
                                    />
                                ))}
                            </div>
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="shadows" className={classes.panel}>
                        <Stack gap="md">
                            {SIZE_OPTIONS.map(size => (
                                <TextInput
                                    key={size}
                                    label={
                                        locale[
                                            `shadow${size.charAt(0).toUpperCase()}${size.slice(1)}` as keyof typeof locale
                                        ]
                                    }
                                    value={state.shadows[size]}
                                    onChange={e => updateSizeRecord('shadows', size, e.currentTarget.value)}
                                />
                            ))}
                        </Stack>
                    </Tabs.Panel>

                    <Tabs.Panel value="export" className={classes.panel}>
                        <Stack gap="md">
                            <Alert color="teal" variant="light" icon={<AiOutlineCopy />}>
                                {locale.exportHint}
                            </Alert>
                            <Group gap="sm">
                                <Button leftSection={<AiOutlineCopy />} onClick={handleCopy}>
                                    {locale.copy}
                                </Button>
                            </Group>
                            <Textarea
                                label={locale.configLabel}
                                value={configJson}
                                readOnly
                                rows={20}
                                className={classes.codeArea}
                            />
                        </Stack>
                    </Tabs.Panel>
                </Tabs>
            </Stack>
        </div>
    )
}

export default ThemeEditorPage
