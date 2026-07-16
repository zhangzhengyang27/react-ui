import { itSupportsFocusEvents } from '../shared/it-supports-focus-events';
import { itSupportsInputSections } from './it-supports-input-sections';
import { itSupportsInputWrapperProps } from './it-supports-input-wrapper-props';

function itSupportsInputProps(options, name = "supports input props") {
  describe(name, () => {
    itSupportsInputWrapperProps(options);
    itSupportsInputSections(options);
    options.focus !== false && itSupportsFocusEvents(options);
  });
}

export { itSupportsInputProps };
