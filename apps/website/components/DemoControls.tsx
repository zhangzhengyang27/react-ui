'use client'

import React from 'react'

const baseControlStyle: React.CSSProperties = {
    padding: '6px 10px',
    borderRadius: 8,
    border: '1px solid var(--nextra-border-color, #333)',
    background: 'var(--nextra-bg, #111)',
    color: 'var(--nextra-color, #fff)',
    fontSize: 13,
    outline: 'none',
    minWidth: 80
}

export interface DemoControlSelectOption {
    label: string
    value: string
}

export interface DemoControlSelectProps {
    label: string
    value: string
    options: DemoControlSelectOption[]
    onChange: (value: string) => void
}

function Select({ label, value, options, onChange }: DemoControlSelectProps) {
    return (
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <span style={{ color: 'var(--nextra-secondary-color, #888)' }}>{label}</span>
            <select value={value} onChange={e => onChange(e.target.value)} style={baseControlStyle}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    )
}

export interface DemoControlBooleanProps {
    label: string
    checked: boolean
    onChange: (checked: boolean) => void
}

function BooleanControl({ label, checked, onChange }: DemoControlBooleanProps) {
    return (
        <label
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 13,
                cursor: 'pointer',
                userSelect: 'none'
            }}
        >
            <input
                type="checkbox"
                checked={checked}
                onChange={e => onChange(e.target.checked)}
                style={{ width: 16, height: 16, cursor: 'pointer' }}
            />
            <span style={{ color: 'var(--nextra-secondary-color, #888)' }}>{label}</span>
        </label>
    )
}

export interface DemoControlNumberProps {
    label: string
    value: number
    min?: number
    max?: number
    step?: number
    onChange: (value: number) => void
}

function NumberControl({ label, value, min, max, step, onChange }: DemoControlNumberProps) {
    return (
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <span style={{ color: 'var(--nextra-secondary-color, #888)' }}>{label}</span>
            <input
                type="number"
                value={value}
                min={min}
                max={max}
                step={step}
                onChange={e => onChange(Number(e.target.value))}
                style={{ ...baseControlStyle, width: 70 }}
            />
        </label>
    )
}

export interface DemoControlTextProps {
    label: string
    value: string
    onChange: (value: string) => void
}

function TextControl({ label, value, onChange }: DemoControlTextProps) {
    return (
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <span style={{ color: 'var(--nextra-secondary-color, #888)' }}>{label}</span>
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                style={{ ...baseControlStyle, width: 120 }}
            />
        </label>
    )
}

export interface DemoControlColorProps {
    label: string
    value: string
    onChange: (value: string) => void
}

function ColorControl({ label, value, onChange }: DemoControlColorProps) {
    return (
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <span style={{ color: 'var(--nextra-secondary-color, #888)' }}>{label}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <input
                    type="color"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    style={{
                        width: 32,
                        height: 32,
                        padding: 0,
                        border: '1px solid var(--nextra-border-color, #333)',
                        borderRadius: 8,
                        background: 'transparent',
                        cursor: 'pointer'
                    }}
                />
                <code style={{ fontSize: 12, color: 'var(--nextra-secondary-color, #888)' }}>{value}</code>
            </div>
        </label>
    )
}

export interface DemoControlSegmentedProps {
    label: string
    value: string
    options: DemoControlSelectOption[]
    onChange: (value: string) => void
}

function SegmentedControl({ label, value, options, onChange }: DemoControlSegmentedProps) {
    return (
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <span style={{ color: 'var(--nextra-secondary-color, #888)' }}>{label}</span>
            <div
                style={{
                    display: 'inline-flex',
                    border: '1px solid var(--nextra-border-color, #333)',
                    borderRadius: 8,
                    overflow: 'hidden'
                }}
            >
                {options.map((option, index) => {
                    const active = option.value === value
                    const isLast = index === options.length - 1
                    return (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange(option.value)}
                            style={{
                                padding: '6px 12px',
                                border: 'none',
                                borderRight: isLast ? 'none' : '1px solid var(--nextra-border-color, #333)',
                                background: active ? 'var(--nextra-primary-color, #0070f3)' : 'transparent',
                                color: active ? '#fff' : 'var(--nextra-color, #fff)',
                                fontSize: 13,
                                cursor: 'pointer',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {option.label}
                        </button>
                    )
                })}
            </div>
        </label>
    )
}

export interface DemoControlSliderProps {
    label: string
    value: number
    min?: number
    max?: number
    step?: number
    onChange: (value: number) => void
}

function SliderControl({ label, value, min = 0, max = 100, step = 1, onChange }: DemoControlSliderProps) {
    return (
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <span style={{ color: 'var(--nextra-secondary-color, #888)' }}>{label}</span>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={e => onChange(Number(e.target.value))}
                style={{ width: 120 }}
            />
            <span style={{ minWidth: 30, fontSize: 12, color: 'var(--nextra-secondary-color, #888)' }}>{value}</span>
        </label>
    )
}

export interface DemoControlRadioGroupProps {
    label: string
    value: string
    options: DemoControlSelectOption[]
    onChange: (value: string) => void
}

function RadioGroupControl({ label, value, options, onChange }: DemoControlRadioGroupProps) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
            <span style={{ color: 'var(--nextra-secondary-color, #888)' }}>{label}</span>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 12px' }}>
                {options.map(option => (
                    <label
                        key={option.value}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            cursor: 'pointer',
                            userSelect: 'none'
                        }}
                    >
                        <input
                            type="radio"
                            name={`radio-${label}`}
                            value={option.value}
                            checked={value === option.value}
                            onChange={() => onChange(option.value)}
                            style={{ cursor: 'pointer' }}
                        />
                        <span style={{ color: 'var(--nextra-color, #fff)' }}>{option.label}</span>
                    </label>
                ))}
            </div>
        </div>
    )
}

export const DemoControl = {
    Select,
    Boolean: BooleanControl,
    Number: NumberControl,
    Text: TextControl,
    Color: ColorControl,
    Segmented: SegmentedControl,
    Slider: SliderControl,
    RadioGroup: RadioGroupControl
}

export interface DemoControlsProps {
    children: React.ReactNode
}

export function DemoControls({ children }: DemoControlsProps) {
    return (
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: '12px 20px',
                padding: '12px 16px',
                borderBottom: '1px solid var(--nextra-border-color, #333)',
                background: 'var(--nextra-bg, #111)'
            }}
        >
            {children}
        </div>
    )
}
