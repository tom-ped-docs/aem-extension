type Storage = {
  colorScheme: 'light' | 'dark' | 'automatic';

  inNewPage: boolean;

  isSamsungVisible: boolean;
  isIqosVisible: boolean;

  samsungId: string;
  samsungEmail: string;
  samsungVersion: 'v5Aem' | 'v5AemEu' | 'v5AemEuShop' | 'v6AemAp' | 'v6AemEu' | 'v6AemUs';
  samsungUrl: string;

  iqosVersion: 'ppAem' | 'pAem';
  iqosCatalog: 'catalogIqos' | 'catalogIqosClub' | 'catalogIqosVeev';
  iqosUrl: string;
};

type Changes = {
  key: {
    newValue: string;
    oldValue: string;
  };
};

type SamsungUrls = {
  v5Aem: string;
  v5AemEu: string;
  v5AemEuShop: string;
  v5SignIn: string;
  v5Qa: string;
  v5QaShop: string;
  v5Tasks: string;
  v5Workflows: string;
  v5Purging: string;
  v5PimB2c: string;
  v5PimB2b: string;

  v6AemAp: string;
  v6AemEu: string;
  v6AemUs: string;
  v6SignIn: string;
  v6Qa: string;
  v6Workflows: string;
  v6Purging: string;
  v6PimB2c: string;
  v6PimB2b: string;

  urlEditor1: string;
  urlEditor2: string;
  urlPreview1: string;
  urlPreview2: string;
  urlPublished: string;
  urlSites: string;
  urlAssets: string;
};

type IqosUrls = {
  ppAem: string;
  ppPublished: string;
  ppPublishedClub: string;
  ppPublishedVeev: string;
  ppPublishedSignIn: string;
  ppPublishedSignInClub: string;
  ppPublishedSignInVeev: string;
  ppHybris: string;

  pAem: string;
  pPublished: string;
  pPublishedClub: string;
  pPublishedVeev: string;
  pHybris: string;

  urlSignIn: string;
  urlEditor1: string;
  urlEditor2: string;
  urlPreview1: string;
  urlPreview2: string;
  urlPublished: string;
  urlSites: string;
  urlAssets: string;
  urlUnlock: string;

  catalogIqos: string;
  catalogIqosClub: string;
  catalogIqosVeev: string;
};

export { Storage, Changes, SamsungUrls, IqosUrls };
