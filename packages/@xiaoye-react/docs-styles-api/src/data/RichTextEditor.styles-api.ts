import type { RichTextEditorFactory } from '@xiaoye-react/ui';
import type { StylesApiData } from '../types';

export const RichTextEditorStylesApi: StylesApiData<RichTextEditorFactory> = {
  selectors: {
    root: '根元素',
    toolbar: 'Toolbar 元素',
    content: 'Content area',
    Typography: 'Typography component, wraps content',
    control: 'RichTextEditor.Control root element, used as a base for all controls',
    controlIcon: 'Control icon 元素',
    controlsGroup: 'RichTextEditor.ControlsGroup component root',
    linkEditor: 'Link editor root 元素',
    linkEditorSave: 'Link editor save button',
    linkEditorInput: 'Link editor url input',
    linkEditorExternalControl: 'Link editor external button',
    linkEditorDropdown: 'Link editor popover dropdown 元素',
  },

  vars: {},

  modifiers: [
    {
      modifier: 'data-active',
      selector: 'control',
      condition: 'Control is active',
    },
  ],
};
