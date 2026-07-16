import { itSupportsInputAsterisk } from './it-supports-input-asterisk';
import { itSupportsInputContainer } from './it-supports-input-container';
import { itSupportsInputWrapperElements } from './it-supports-input-wrapper-elements';
import { itSupportsInputWrapperOrder } from './it-supports-input-wrapper-order';

function itSupportsInputWrapperProps(options, name = "supports InputWrapper props") {
  describe(name, () => {
    itSupportsInputAsterisk(options);
    itSupportsInputContainer(options);
    itSupportsInputWrapperElements(options);
    itSupportsInputWrapperOrder(options);
  });
}

export { itSupportsInputWrapperProps };
