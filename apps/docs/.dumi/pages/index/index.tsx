import React, { useState } from 'react';

import useLocale from '../../hooks/useLocale';
import PromptDrawer from '../../theme/common/ThemeSwitch/PromptDrawer';
import SiteContext from '../../theme/slots/SiteContext';
import type { SiteContextProps } from '../../theme/slots/SiteContext';
import ComponentShowcase from './components/ComponentShowcase';
import { DarkColorScheme } from './components/DarkColorScheme';
import EcosystemSection from './components/EcosystemSection';
import { Extensions } from './components/Extensions';
import FeaturesSection from './components/FeaturesSection';
import { FormSection } from './components/FormSection';
import FooterCTA from './components/FooterCTA';
import HeroSection from './components/HeroSection';
import { HooksSection } from './components/HooksSection';
import { Stats } from './components/Stats';
import { StylesSection } from './components/StylesSection';

const locales = {
  cn: {},
  en: {},
};

const Homepage: React.FC = () => {
  useLocale(locales);
  const [promptDrawerOpen, setPromptDrawerOpen] = useState(false);
  const siteContext = React.use(SiteContext);

  const handlePromptDrawerOpen = () => setPromptDrawerOpen(true);
  const handlePromptDrawerClose = () => setPromptDrawerOpen(false);
  const handleThemeChange = (themeConfig: SiteContextProps['dynamicTheme']) => {
    if (siteContext?.updateSiteConfig) {
      siteContext.updateSiteConfig({ dynamicTheme: themeConfig });
    }
  };

  return (
    <section>
      <HeroSection onOpenPromptDrawer={handlePromptDrawerOpen} />

      <FeaturesSection />

      <ComponentShowcase />

      <DarkColorScheme />

      <FormSection />

      <HooksSection />

      <StylesSection />

      <Extensions />

      <Stats />

      <EcosystemSection />

      <FooterCTA />

      <PromptDrawer
        open={promptDrawerOpen}
        onClose={handlePromptDrawerClose}
        onThemeChange={handleThemeChange}
      />
    </section>
  );
};

export default Homepage;
