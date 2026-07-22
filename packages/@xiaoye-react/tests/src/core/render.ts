import { jsx, Fragment } from 'react/jsx-runtime';
import { render as render$1, act } from '@testing-library/react';
import { UIProvider } from '@xiaoye-react/ui';

function render(ui, themeOverride, providerProps) {
  return render$1(/* @__PURE__ */ jsx(Fragment, { children: ui }), {
    wrapper: ({ children }) => /* @__PURE__ */ jsx(UIProvider, { theme: themeOverride, env: "test", ...providerProps, children })
  });
}
async function renderWithAct(ui) {
  let result = null;
  await act(async () => {
    result = render(ui);
  });
  return result;
}

export { render, renderWithAct };
