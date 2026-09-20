import { CodeHighlightDefaultLanguage } from '@xiaoye-react/ui';
import { BasicAppShell } from './BasicAppShell/BasicAppShell';
import BasicAppShellCode from './BasicAppShell/code.json';
import CollapseDesktopCode from './CollapseDesktop/code.json';
import { CollapseDesktop } from './CollapseDesktop/CollapseDesktop';
import FullLayoutCode from './FullLayout/code.json';
import { FullLayout } from './FullLayout/FullLayout';
import MobileNavbarCode from './MobileNavbar/code.json';
import { MobileNavbar } from './MobileNavbar/MobileNavbar';
import ResponsiveSizesCode from './ResponsiveSizes/code.json';
import { ResponsiveSizes } from './ResponsiveSizes/ResponsiveSizes';

interface AppShellExampleComponent {
  component: () => React.JSX.Element;
  code: {
    fileName: string;
    language: CodeHighlightDefaultLanguage;
    code: string;
  }[];
}

export const APP_SHELL_EXAMPLES_COMPONENTS: Record<string, AppShellExampleComponent> = {
  BasicAppShell: {
    component: BasicAppShell,
    code: BasicAppShellCode as AppShellExampleComponent['code'],
  },
  ResponsiveSizes: {
    component: ResponsiveSizes,
    code: ResponsiveSizesCode as AppShellExampleComponent['code'],
  },
  MobileNavbar: {
    component: MobileNavbar,
    code: MobileNavbarCode as AppShellExampleComponent['code'],
  },
  FullLayout: {
    component: FullLayout,
    code: FullLayoutCode as AppShellExampleComponent['code'],
  },
  CollapseDesktop: {
    component: CollapseDesktop,
    code: CollapseDesktopCode as AppShellExampleComponent['code'],
  },
};

export type AppShellExampleId = keyof typeof APP_SHELL_EXAMPLES_COMPONENTS;
