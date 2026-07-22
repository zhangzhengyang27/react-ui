export interface PatchVersion {
  version: string;
  date: string;
}

export interface Version {
  version: string;
  date: string;
  github: string;
  link: string;
  patches: PatchVersion[];
}

export const allVersions: Version[] = [];
