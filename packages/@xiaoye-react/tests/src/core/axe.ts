import { toHaveNoViolations, axe as axe$1 } from 'jest-axe';
import { renderWithAct } from './render';

const config = {
  rules: {
    region: {
      enabled: false
    },
    "autocomplete-valid": {
      enabled: false
    }
  }
};
function axe(elements) {
  expect.extend(toHaveNoViolations);
  it("has no accessibility violations", async () => {
    for (const element of elements) {
      const { container } = await renderWithAct(element);
      const result = await axe$1(container, config);
      expect(result).toHaveNoViolations();
    }
  }, 3e4);
}

export { axe };
