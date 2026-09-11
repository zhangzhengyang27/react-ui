import React from 'react';
import { Code, DataTable, STYLE_PROPS_DATA } from '@xiaoye-react/ui';

const THEME_KEYS: Record<string, string> = {
    color: 'theme.colors',
    fontSize: 'theme.fontSizes',
    spacing: 'theme.spacing',
    lineHeight: 'theme.lineHeights',
};

/**
 * style-props 文档表格：列出全部短样式属性及其对应的 CSS 属性与主题键。
 * 数据源为 ui 包的 STYLE_PROPS_DATA（Box style-props 运行时使用同一份定义）。
 */
const StylePropsTable: React.FC = () => {
    const data = Object.entries(STYLE_PROPS_DATA).map(([propName, propData]) => {
        const prop = propData as { type?: string; property: string | string[] };
        const themeKey = THEME_KEYS[prop.type];
        return [
            <Code key="prop">{propName}</Code>,
            Array.isArray(prop.property) ? (
                <span key="css">
                    {prop.property.map((p, i) => (
                        <React.Fragment key={p}>
                            {i > 0 && ', '}
                            <Code>{p}</Code>
                        </React.Fragment>
                    ))}
                </span>
            ) : (
                <Code key="css">{prop.property}</Code>
            ),
            themeKey ? <Code key="theme">{themeKey}</Code> : '–',
        ];
    });

    return <DataTable head={['Prop', 'CSS Property', 'Theme key']} data={data} />;
};

export default StylePropsTable;
