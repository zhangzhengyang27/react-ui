import { jsx } from 'react/jsx-runtime';
import { forwardRef } from 'react';

function createContextContainer(Component, Provider, providerProps) {
  const Container = forwardRef((props, ref) => /* @__PURE__ */ jsx(Provider, { ...providerProps, children: /* @__PURE__ */ jsx(Component, { ...props, ref }) }));
  Container.displayName = Component.displayName;
  Container.extend = Component.extend;
  Container.classes = Component.classes;
  Container.withProps = Component.withProps;
  return Container;
}

export { createContextContainer };
