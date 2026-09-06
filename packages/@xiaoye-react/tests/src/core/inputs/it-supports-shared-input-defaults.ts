import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsSharedInputDefaults(options, name = 'supports shared input props: label, description and error') {
  it(name, () => {
    const props = options.props || {};
    const { container } = render(jsx(options.component, props));
    const text = container.textContent || '';

    if (props.label) {
      expect(text).toContain(props.label);
      const label = container.querySelector('label');
      const input = container.querySelector('input');
      if (label && input) {
        // label 的 for 与 input 的 id 关联（可访问性契约）
        expect(label.getAttribute('for') || '').toBe(input.getAttribute('id') || '');
      }
    }

    if (props.description) {
      expect(text).toContain(props.description);
    }

    if (props.error) {
      expect(text).toContain(props.error);
    }
  });
}

export { itSupportsSharedInputDefaults };
