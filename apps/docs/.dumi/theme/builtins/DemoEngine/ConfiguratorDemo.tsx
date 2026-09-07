import { cloneElement, useEffect, useMemo, useState } from 'react';

import { DemoAreaProps } from './DemoArea';
import { DemoColumns } from './DemoColumns';
import { DemoRoot } from './DemoRoot';
import {
  ConfiguratorBooleanControl,
  ConfiguratorBooleanControlOptions,
  ConfiguratorColorControl,
  ConfiguratorColorControlOptions,
  ConfiguratorNumberControl,
  ConfiguratorNumberControlOptions,
  ConfiguratorSegmentedControl,
  ConfiguratorSegmentedControlOptions,
  ConfiguratorSelectControl,
  ConfiguratorSelectControlOptions,
  ConfiguratorSizeControl,
  ConfiguratorSizeControlOptions,
  ConfiguratorStringControl,
  ConfiguratorStringControlOptions,
} from './controls';
import { Code, getCodeArray } from './get-code-array';
import { useCodeExpand } from '../Previewer/CodeExpandContext';

const ControlComponents = {
  boolean: ConfiguratorBooleanControl,
  segmented: ConfiguratorSegmentedControl,
  color: ConfiguratorColorControl,
  string: ConfiguratorStringControl,
  select: ConfiguratorSelectControl,
  size: ConfiguratorSizeControl,
  number: ConfiguratorNumberControl,
};

export type ConfiguratorControlOptions =
  | ConfiguratorBooleanControlOptions
  | ConfiguratorSegmentedControlOptions
  | ConfiguratorColorControlOptions
  | ConfiguratorStringControlOptions
  | ConfiguratorSelectControlOptions
  | ConfiguratorSizeControlOptions
  | ConfiguratorNumberControlOptions;

export interface ConfiguratorDemoProps extends DemoAreaProps {
  code: Code;
  controls: ConfiguratorControlOptions[];
}

export function ConfiguratorDemo({
  code,
  controls,
  children,
  centered,
  maxWidth,
  minHeight,
  withPadding,
  dimmed,
  striped,
  overflow,
}: ConfiguratorDemoProps) {
  const codeExpand = useCodeExpand();
  const registerRealCode = codeExpand?.registerRealCode;
  const unregisterRealCode = codeExpand?.unregisterRealCode;
  const updateRealCode = codeExpand?.updateRealCode;

  const initialState = controls.reduce<Record<string, any>>((acc, control) => {
    acc[control.prop] = control.initialValue;
    return acc;
  }, {});

  const [state, setState] = useState(initialState);
  const setStateField = (field: string, value: any) =>
    setState((current) => ({ ...current, [field]: value }));

  const items = controls.map((control) => {
    const ControlComponent = ControlComponents[control.type] as any;
    const { initialValue, libraryValue, type: _controlType, ...rest } = control;
    return (
      <ControlComponent
        key={control.prop}
        value={state[control.prop]}
        onChange={(value: any) => setStateField(control.prop, value)}
        {...rest}
      />
    );
  });

  const codeArray = useMemo(() => getCodeArray({ code, controls, state }), [code, controls, state]);

  useEffect(() => {
    registerRealCode?.(codeArray);
    return () => {
      unregisterRealCode?.();
    };
    // codeArray 的后续变更由下面的 updateRealCode effect 处理，避免每次状态变化都重新注册/注销
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registerRealCode, unregisterRealCode]);

  useEffect(() => {
    updateRealCode?.(codeArray);
  }, [updateRealCode, codeArray]);

  return (
    <DemoRoot>
      <DemoColumns
        controls={items}
        centered={centered}
        withPadding={withPadding}
        maxWidth={maxWidth}
        minHeight={minHeight}
        dimmed={dimmed}
        striped={striped}
        overflow={overflow}
        withGrid
      >
        {cloneElement(children as React.JSX.Element, state)}
      </DemoColumns>
    </DemoRoot>
  );
}
