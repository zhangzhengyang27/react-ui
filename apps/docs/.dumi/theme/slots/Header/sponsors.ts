export interface Sponsor {
  name: string;
  logo: string;
  url: string | { cn: string; en: string };
  opencollective: string;
  description: {
    cn: string;
    en: string;
  };
}

export const getSponsorUrl = (url: Sponsor['url'], lang: 'cn' | 'en'): string =>
  typeof url === 'string' ? url : (url[lang] ?? url.en);

export const getSponsorDescription = (desc: Sponsor['description'], lang: 'cn' | 'en'): string =>
  desc[lang] ?? desc.en;

export const sponsors: Sponsor[] = [];
