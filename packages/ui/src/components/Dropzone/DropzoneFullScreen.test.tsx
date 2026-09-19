import { tests } from '@xiaoye-react/tests';
import {
  DropzoneFullScreen,
  DropzoneFullScreenProps,
  DropzoneFullScreenStylesNames,
} from './DropzoneFullScreen';

const defaultProps: DropzoneFullScreenProps = {
  onDrop: () => {},
  withinPortal: false,
};

describe('@xiaoye-react/dropzone/DropzoneFullScreen', () => {
  tests.itSupportsSystemProps<DropzoneFullScreenProps, DropzoneFullScreenStylesNames>({
    component: DropzoneFullScreen,
    props: defaultProps,
    children: true,
    styleProps: false,
    size: false,
    variant: false,
    mod: false,
    displayName: '@xiaoye-react/ui/DropzoneFullScreen',
    stylesApiSelectors: ['fullScreen'],
    selector: '.ui-DropzoneFullScreen-fullScreen',
  });
});
