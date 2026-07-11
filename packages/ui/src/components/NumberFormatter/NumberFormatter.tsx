import { NumericFormat } from 'react-number-format';
import { ExtendComponent, Factory, MantineThemeComponent, useProps } from '../../core';

export interface NumberFormatterProps extends React.ComponentProps<'span'> {
  value?: number | string;
  allowNegative?: boolean;
  decimalScale?: number;
  decimalSeparator?: string;
  fixedDecimalScale?: boolean;
  prefix?: string;
  suffix?: string;
  thousandsGroupStyle?: 'thousand' | 'lakh' | 'wan' | 'none';
  thousandSeparator?: string | boolean;
}

export type NumberFormatterFactory = Factory<{
  props: NumberFormatterProps;
  ref: HTMLSpanElement;
}>;

export const NumberFormatter = (
  _props: NumberFormatterProps & React.RefAttributes<HTMLSpanElement>
) => {
  const { value, ref, defaultValue, ...others } = useProps('NumberFormatter', null, _props);

  if (value === undefined) {
    return null;
  }

  return <NumericFormat displayType="text" value={value} {...others} getInputRef={ref as any} />;
};

const extendNumberFormatter = (c: ExtendComponent<NumberFormatterFactory>): MantineThemeComponent =>
  c;

NumberFormatter.extend = extendNumberFormatter;
NumberFormatter.displayName = '@react-ui/ui/NumberFormatter';

export namespace NumberFormatter {
  export type Props = NumberFormatterProps;
  export type Factory = NumberFormatterFactory;
}
