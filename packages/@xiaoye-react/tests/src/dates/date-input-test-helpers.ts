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
// 下拉/弹窗经 Portal 渲染到 body：保留 container 形参兼容既有调用，内部改查 document
function expectOpenedPopover(_container?: unknown) {
  expect(document.querySelector("[data-dates-dropdown]")).toBeInTheDocument();
}
function expectNoPopover(_container?: unknown) {
  expect(document.querySelectorAll("[data-dates-dropdown]")).toHaveLength(0);
}
function expectOpenedModal(_container?: unknown) {
  expect(document.querySelector(".ui-Modal-content")).toBeInTheDocument();
}
function expectNoModal(_container?: unknown) {
  expect(document.querySelectorAll(".ui-Modal-content")).toHaveLength(0);
}
function clickControl(_container: unknown, index: number) {
  return userEvent.click(document.querySelectorAll("table button")[index]);
}

export { clickControl, clickInput, expectNoModal, expectNoPopover, expectOpenedModal, expectOpenedPopover, expectValue, getInputValue };
