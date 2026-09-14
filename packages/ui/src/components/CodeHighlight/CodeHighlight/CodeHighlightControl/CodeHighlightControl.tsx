import { BoxProps } from '../../../../core/Box/Box';
import { useProps } from '../../../../core/UIProvider/index';
import { PolymorphicFactory } from '../../../../core/factory/create-factory';
import { UIPolymorphicComponent, polymorphicFactory } from '../../../../core/factory/index';
import { StylesApiProps } from '../../../../core/styles-api/styles-api.types';
import { ActionIcon } from '../../../ActionIcon/index';
import { Tooltip } from '../../../Tooltip/Tooltip';
import { useCodeHighlightContext } from '../CodeHighlight.context';

export interface CodeHighlightControlProps
  extends BoxProps, StylesApiProps<CodeHighlightControlFactory> {
  /** Control icon */
  children?: React.ReactNode;

  /** Label displayed in the tooltip when the control is hovered */
  tooltipLabel?: string;
}

export type CodeHighlightControlFactory = PolymorphicFactory<{
  props: CodeHighlightControlProps;
  defaultRef: HTMLButtonElement;
  defaultComponent: 'button';
}>;

export const CodeHighlightControl: UIPolymorphicComponent<CodeHighlightControlFactory> =
  polymorphicFactory<CodeHighlightControlFactory>((_props) => {
    const props = useProps('CodeHighlightControl', null, _props);
    const { children, vars, tooltipLabel, ...others } = props;
    const ctx = useCodeHighlightContext();
    const tooltipStyles = ctx.getStyles('controlTooltip');

    const control = (
      <ActionIcon
        {...ctx.getStyles('control')}
        {...others}
        variant="none"
        data-code-color-scheme={ctx.codeColorScheme}
      >
        {children}
      </ActionIcon>
    );

    if (tooltipLabel) {
      return (
        <Tooltip
          label={tooltipLabel}
          fz="sm"
          position="bottom"
          classNames={{ tooltip: tooltipStyles.className }}
          styles={{ tooltip: tooltipStyles.style }}
          data-code-color-scheme={ctx.codeColorScheme}
          transitionProps={{ duration: 0 }}
        >
          {control}
        </Tooltip>
      );
    }

    return control;
  });

CodeHighlightControl.displayName = '@xiaoye-react/code-highlight/CodeHighlightControl';
