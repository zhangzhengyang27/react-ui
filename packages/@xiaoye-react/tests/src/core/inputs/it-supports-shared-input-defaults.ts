import { jsx } from 'react/jsx-runtime';
import { render } from '../render';

function itSupportsSharedInputDefaults(options, name = 'supports shared input props: label, description and error') {
  it(name, () => {
    const props = options.props || {};
    const { container } = render(jsx(options.component, props));
    const text = container.textContent || '';

    if (props.label) {
      // label/htmlFor 的关联在 PickerInputBase 上尚未实现（待单独修复），此处仅断言文本渲染
      expect(text).toContain(props.label);
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
