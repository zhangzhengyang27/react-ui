import { jsx } from 'react/jsx-runtime';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../core';

function itSupportsHeaderProps(options, name = "supports header props") {
  it(`${name}: supports nextIcon and previousIcon props`, () => {
    render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          nextIcon: "test-next-icon",
          previousIcon: "test-previous-icon"
        }
      )
    );
    expect(screen.getByLabelText("next").textContent).toBe("test-next-icon");
    expect(screen.getByLabelText("prev").textContent).toBe("test-previous-icon");
  });
  it(`${name}: supports nextLabel and previousLabel props`, () => {
    const { container } = render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          nextLabel: "test-next-label",
          previousLabel: "test-previous-label"
        }
      )
    );
    expect(container.querySelector('button[data-direction="next"]')).toHaveAttribute(
      "aria-label",
      "test-next-label"
    );
    expect(container.querySelector('button[data-direction="previous"]')).toHaveAttribute(
      "aria-label",
      "test-previous-label"
    );
  });
  it(`${name}: supports onNext and onPrevious props`, async () => {
    const onNext = jest.fn();
    const onPrevious = jest.fn();
    render(/* @__PURE__ */ jsx(options.component, { ...options.props, onNext, onPrevious }));
    await userEvent.click(screen.getByLabelText("next"));
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrevious).toHaveBeenCalledTimes(0);
    await userEvent.click(screen.getByLabelText("prev"));
    expect(onNext).toHaveBeenCalledTimes(1);
    expect(onPrevious).toHaveBeenCalledTimes(1);
  });
  it(`${name}: calls onLevelClick when level control is clicked`, async () => {
    const spy = jest.fn();
    render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, levelControlAriaLabel: "click me", onLevelClick: spy })
    );
    await userEvent.click(screen.getByLabelText("click me"));
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it(`${name}: supports nextDisabled prop`, () => {
    const { rerender } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, nextDisabled: true }));
    expect(screen.getByLabelText("next")).toHaveAttribute("data-disabled");
    expect(screen.getByLabelText("next")).toHaveAttribute("disabled");
    rerender(/* @__PURE__ */ jsx(options.component, { ...options.props, nextDisabled: false }));
    expect(screen.getByLabelText("next")).not.toHaveAttribute("data-disabled");
    expect(screen.getByLabelText("next")).not.toHaveAttribute("disabled");
  });
  it(`${name}: supports previousDisabled prop`, () => {
    const { rerender } = render(/* @__PURE__ */ jsx(options.component, { ...options.props, previousDisabled: true }));
    expect(screen.getByLabelText("prev")).toHaveAttribute("data-disabled");
    expect(screen.getByLabelText("prev")).toHaveAttribute("disabled");
    rerender(/* @__PURE__ */ jsx(options.component, { ...options.props, previousDisabled: false }));
    expect(screen.getByLabelText("prev")).not.toHaveAttribute("data-disabled");
    expect(screen.getByLabelText("prev")).not.toHaveAttribute("disabled");
  });
  it(`${name}: supports hasNextLevel prop`, () => {
    const { rerender } = render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, levelControlAriaLabel: "test-level", hasNextLevel: true })
    );
    expect(screen.getByLabelText("test-level")).not.toHaveAttribute("data-static");
    rerender(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          levelControlAriaLabel: "test-level",
          hasNextLevel: false
        }
      )
    );
    expect(screen.getByLabelText("test-level")).toHaveAttribute("data-static");
  });
  it(`${name}: does not call onLevelClick when level is clicked and hasNextLevel is false`, async () => {
    const spy = jest.fn();
    const { rerender } = render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          levelControlAriaLabel: "test-level",
          hasNextLevel: true,
          onLevelClick: spy
        }
      )
    );
    await userEvent.click(screen.getByLabelText("test-level"));
    expect(spy).toHaveBeenCalledTimes(1);
    rerender(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          levelControlAriaLabel: "test-level",
          hasNextLevel: false,
          onLevelClick: spy
        }
      )
    );
    await userEvent.click(screen.getByLabelText("test-level"));
    expect(spy).toHaveBeenCalledTimes(1);
  });
  it(`${name}: handles focus as usual when __preventFocus is set to false`, async () => {
    render(
      /* @__PURE__ */ jsx(
        options.component,
        {
          ...options.props,
          __preventFocus: false,
          levelControlAriaLabel: "test-level"
        }
      )
    );
    await userEvent.click(screen.getByLabelText("next"));
    expect(screen.getByLabelText("next")).toHaveFocus();
    await userEvent.click(screen.getByLabelText("test-level"));
    expect(screen.getByLabelText("test-level")).toHaveFocus();
    await userEvent.click(screen.getByLabelText("prev"));
    expect(screen.getByLabelText("prev")).toHaveFocus();
  });
  it(`${name}: does not focus controls on click when __preventFocus is set to true`, async () => {
    render(
      /* @__PURE__ */ jsx(options.component, { ...options.props, __preventFocus: true, levelControlAriaLabel: "test-level" })
    );
    await userEvent.click(screen.getByLabelText("next"));
    expect(document.body).toHaveFocus();
    await userEvent.click(screen.getByLabelText("test-level"));
    expect(document.body).toHaveFocus();
    await userEvent.click(screen.getByLabelText("prev"));
    expect(document.body).toHaveFocus();
  });
}

export { itSupportsHeaderProps };
