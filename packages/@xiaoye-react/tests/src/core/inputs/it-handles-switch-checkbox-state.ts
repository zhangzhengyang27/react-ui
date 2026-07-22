import { jsx } from 'react/jsx-runtime';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../render';

function itHandlesSwitchCheckboxState(options, name = "handles switch checkbox state") {
  describe(name, () => {
    it("correctly handles controlled switch checkbox state", async () => {
      const spy = jest.fn();
      render(/* @__PURE__ */ jsx(options.component, { ...options.props, checked: false, onChange: spy }));
      expect(screen.getByRole("switch")).not.toBeChecked();
      await userEvent.click(screen.getByRole("switch"));
      expect(spy).toHaveBeenCalledTimes(1);
      expect(screen.getByRole("switch")).not.toBeChecked();
    });
    it("correctly handles uncontrolled switch checkbox state", async () => {
      render(/* @__PURE__ */ jsx(options.component, { ...options.props, defaultChecked: false }));
      expect(screen.getByRole("switch")).not.toBeChecked();
      await userEvent.click(screen.getByRole("switch"));
      expect(screen.getByRole("switch")).toBeChecked();
    });
  });
}

export { itHandlesSwitchCheckboxState };
