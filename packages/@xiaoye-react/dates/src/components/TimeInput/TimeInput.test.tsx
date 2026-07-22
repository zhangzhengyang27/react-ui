import { __InputStylesNames } from '@xiaoye-react/ui';
import { inputDefaultProps, inputStylesApiSelectors, tests } from '@xiaoye-react/tests';
import { TimeInput, TimeInputProps } from './TimeInput';

const defaultProps: TimeInputProps = {
  ...inputDefaultProps,
};

describe('@xiaoye-react/dates/TimeInput', () => {
  tests.axe([
    <TimeInput aria-label="test-label" key="1" />,
    <TimeInput label="test-label" key="2" />,
    <TimeInput label="test-label" error key="3" />,
    <TimeInput label="test-label" error="test-error" id="test" key="4" />,
    <TimeInput label="test-label" description="test-description" key="5" />,
  ]);

  tests.itSupportsSystemProps<TimeInputProps, __InputStylesNames>({
    component: TimeInput,
    props: defaultProps,
    displayName: '@xiaoye-react/dates/TimeInput',
    stylesApiSelectors: [...inputStylesApiSelectors],
  });

  tests.itSupportsInputProps<TimeInputProps>({
    component: TimeInput,
    props: defaultProps,
    selector: 'input',
  });

  tests.itSupportsSharedInputDefaults<TimeInputProps>({
    component: TimeInput,
    props: defaultProps,
    componentName: 'TimeInput',
  });
});
