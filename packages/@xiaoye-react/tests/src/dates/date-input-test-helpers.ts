import userEvent from '@testing-library/user-event';

function getInputValue(container) {
  const element = container.querySelector("[data-dates-input]");
  return element instanceof HTMLButtonElement ? element.textContent : element?.getAttribute("value");
}
function expectValue(container, value) {
  expect(getInputValue(container)).toBe(value);
}
function clickInput(container) {
  return userEvent.click(container.querySelector("[data-dates-input]"));
}
function expectOpenedPopover(container) {
  expect(container.querySelector("[data-dates-dropdown]")).toBeInTheDocument();
}
function expectNoPopover(container) {
  expect(container.querySelectorAll("[data-dates-dropdown]")).toHaveLength(0);
}
function expectOpenedModal(container) {
  expect(container.querySelector(".ui-Modal-content")).toBeInTheDocument();
}
function expectNoModal(container) {
  expect(container.querySelectorAll(".ui-Modal-content")).toHaveLength(0);
}
function clickControl(container, index) {
  return userEvent.click(container.querySelectorAll("table button")[index]);
}

export { clickControl, clickInput, expectNoModal, expectNoPopover, expectOpenedModal, expectOpenedPopover, expectValue, getInputValue };
