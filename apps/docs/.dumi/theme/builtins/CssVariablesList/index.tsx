import React from 'react';
import { Code, ColorSwatch, DEFAULT_THEME, defaultCssVariablesResolver, keys } from '@xiaoye-react/ui';
import DataTable from '../DataTable';

function ColorPreview({ value }: { value: string }) {
  if (!value || !value.match(/^(var\(--ui-color[\w-]+\)|#\w+|rgba?\([\w,. ]+\))$/gm)) {
    return null;
  }

  return <ColorSwatch size={20} color={value} />;
}

const CssVariablesList: React.FC = () => {
  const resolvedVariables = defaultCssVariablesResolver(DEFAULT_THEME);

  const variables = keys(resolvedVariables.variables).map((key) => [
    <Code style={{ whiteSpace: 'nowrap' }} key="code">
      {key}
    </Code>,
    resolvedVariables.variables[key],
    <ColorPreview value={resolvedVariables.variables[key]} key="swatch" />,
  ]);

  const lightVariables = keys(resolvedVariables.light).map((key) => [
    <Code style={{ whiteSpace: 'nowrap' }} key="code">
      {key}
    </Code>,
    resolvedVariables.light[key],
    <ColorPreview value={resolvedVariables.light[key]} key="swatch" />,
  ]);

  const darkVariables = keys(resolvedVariables.dark).map((key) => [
    <Code style={{ whiteSpace: 'nowrap' }} key="code">
      {key}
    </Code>,
    resolvedVariables.dark[key],
    <ColorPreview value={resolvedVariables.dark[key]} key="swatch" />,
  ]);

  return (
    <>
      <h2 id="no-dependency">CSS variables not depending on color scheme</h2>
      <DataTable data={variables} head={['变量', '值', '预览']} />

      <h2 id="light-only">Light color scheme only variables</h2>
      <DataTable data={lightVariables} head={['变量', '值', '预览']} />

      <h2 id="dark-only">Dark color scheme only variables</h2>
      <DataTable data={darkVariables} head={['变量', '值', '预览']} />
    </>
  );
};

export default CssVariablesList;
