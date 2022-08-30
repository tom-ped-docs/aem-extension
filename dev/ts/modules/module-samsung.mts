// TODO: 1. openPropertiesPage

import type { Storage } from './types.mjs';

import { default as openPage } from './pages.mjs';

const URLS = {
  v5Aem: 'https://aem.samsung.com/',
  v5AemEu: 'https://aem-eu.samsung.com/',
  v5AemEuShop: 'https://aem-eu-shop.samsung.com/',
  v5SignIn: 'aemapi/user/login_sso?s_user_id=',
  v5Qa: 'https://qaweb.samsung.com/',
  v5QaShop: 'https://qaweb-shop.samsung.com/',
  v5Tasks: 'aem/taskmanagement',
  v5Workflows: 'notifications.html',
  v5Purging: 'aem/pim/setting/cdnpurge/forwardCDNpurgReq',
  v5PimB2c: 'aem/pim/b2c/product/main/forwardProductFamilyList',
  v5PimB2b: 'aem/bim/b2b/product/main/forwardProductFamilyList',

  v6AemAp: 'https://p6-ap-author.samsung.com/',
  v6AemEu: 'https://p6-eu-author.samsung.com/',
  v6AemUs: 'https://p6-us-author.samsung.com/',
  v6SignIn: 'aemapi/user/login_sso?s_user_email=',
  v6Qa: 'https://p6-qa.samsung.com/',
  v6Workflows: 'aem/inbox',
  v6Purging: 'aem/pim/global/setting/cdnpurging/page/purgerequest/info',
  v6PimB2c: 'aem/pim/b2c/product/detail/main/page/list',
  v6PimB2b: 'aem/bim/b2b/product/detail/main/page/list',

  urlEditor1: 'editor.html/content/samsung/',
  urlEditor2: '.html',
  urlPreview1: 'content/samsung/',
  urlPreview2: '.html?wcmmode=disabled',
  // urlProperties: '', <- TODO: 1.
  urlPublished: 'https://www.samsung.com/',
  urlSites: 'sites.html/content/samsung/',
  urlAssets: 'assets.html/content/dam/samsung/'
};

const START_KEYS = [
  'v5Aem',
  'v5AemEu',
  'v5AemEuShop',
  'v5Qa',
  'v5QaShop',
  'v6AemAp',
  'v6AemEu',
  'v6AemUs',
  'v6Qa',
  'urlEditor1',
  'urlPreview1',
  'urlPublished',
  'urlSites',
  'urlAssets'
];

const END_KEYS = [
  'urlEditor2',
  'urlPreview2'
];

// ui-popup.mts -> toggleButton
const openSignInPage = () =>
{
  chrome.storage.local.get( [ 'samsungId', 'samsungEmail', 'samsungVersion' ], ( storage: Storage ) =>
  {
    storage.samsungVersion === 'v5Aem' || storage.samsungVersion === 'v5AemEu' || storage.samsungVersion === 'v5AemEuShop'
      ? openPage( URLS[ storage.samsungVersion ] + URLS.v5SignIn + storage.samsungId )
      : openPage( URLS[ storage.samsungVersion ] + URLS.v6SignIn + storage.samsungEmail );
  } );
};

const openEditorPage = () =>
{
  chrome.storage.local.get( [ 'samsungVersion', 'samsungUrl' ], ( storage: Storage ) =>
  {
    openPage( URLS[ storage.samsungVersion ] + URLS.urlEditor1 + storage.samsungUrl + URLS.urlEditor2 );
  } );
};

const openPreviewPage = () =>
{
  chrome.storage.local.get( [ 'samsungVersion', 'samsungUrl' ], ( storage: Storage ) =>
  {
    openPage( URLS[ storage.samsungVersion ] + URLS.urlPreview1 + storage.samsungUrl + URLS.urlPreview2 );
  } );
};

const openQaPage = () =>
{
  chrome.storage.local.get( [ 'samsungVersion', 'samsungUrl' ], ( storage: Storage ) =>
  {
    if ( storage.samsungVersion === 'v5Aem' || storage.samsungVersion === 'v5AemEu' )
      openPage( URLS.v5Qa + storage.samsungUrl );
    else
      if ( storage.samsungVersion === 'v5AemEuShop' )
        openPage( URLS.v5QaShop + storage.samsungUrl );
      else
        openPage( URLS.v6Qa + storage.samsungUrl );
  } );
};

const openPublishedPage = () =>
{
  chrome.storage.local.get( 'samsungUrl', ( storage: Storage ) =>
  {
    openPage( URLS.urlPublished + storage.samsungUrl );
  } );
};

const openSitesPage = () =>
{
  chrome.storage.local.get( [ 'samsungVersion', 'samsungUrl' ], ( storage: Storage ) =>
  {
    openPage( URLS[ storage.samsungVersion ] + URLS.urlSites + storage.samsungUrl );
  } );
};

const openAssetsPage = () =>
{
  chrome.storage.local.get( [ 'samsungVersion', 'samsungUrl' ], ( storage: Storage ) =>
  {
    openPage( URLS[ storage.samsungVersion ] + URLS.urlAssets + storage.samsungUrl );
  } );
};

// ui-popup.mts -> toggleButton
const openTasksPage = () =>
{
  chrome.storage.local.get( 'samsungVersion', ( storage: Storage ) =>
  {
    openPage( URLS[ storage.samsungVersion ] + URLS.v5Tasks );
  } );
};

const openWorkflowsPage = () =>
{
  chrome.storage.local.get( 'samsungVersion', ( storage: Storage ) =>
  {
    storage.samsungVersion === 'v5Aem' || storage.samsungVersion === 'v5AemEu' || storage.samsungVersion === 'v5AemEuShop'
      ? openPage( URLS[ storage.samsungVersion ] + URLS.v5Workflows )
      : openPage( URLS[ storage.samsungVersion ] + URLS.v6Workflows );
  } );
};

const openPurgingPage = () =>
{
  chrome.storage.local.get( 'samsungVersion', ( storage: Storage ) =>
  {
    storage.samsungVersion === 'v5Aem' || storage.samsungVersion === 'v5AemEu' || storage.samsungVersion === 'v5AemEuShop'
      ? openPage( URLS[ storage.samsungVersion ] + URLS.v5Purging )
      : openPage( URLS[ storage.samsungVersion ] + URLS.v6Purging );
  } );
};

const openPimB2cPage = () =>
{
  chrome.storage.local.get( 'samsungVersion', ( storage: Storage ) =>
  {
    storage.samsungVersion === 'v5Aem' || storage.samsungVersion === 'v5AemEu' || storage.samsungVersion === 'v5AemEuShop'
      ? openPage( URLS[ storage.samsungVersion ] + URLS.v5PimB2c )
      : openPage( URLS[ storage.samsungVersion ] + URLS.v6PimB2c );
  } );
};

const openPimB2bPage = () =>
{
  chrome.storage.local.get( 'samsungVersion', ( storage: Storage ) =>
  {
    storage.samsungVersion === 'v5Aem' || storage.samsungVersion === 'v5AemEu' || storage.samsungVersion === 'v5AemEuShop'
      ? openPage( URLS[ storage.samsungVersion ] + URLS.v5PimB2b )
      : openPage( URLS[ storage.samsungVersion ] + URLS.v6PimB2b );
  } );
};

export
{
  URLS,
  START_KEYS,
  END_KEYS,

  openSignInPage,
  openEditorPage,
  openPreviewPage,
  openQaPage,
  openPublishedPage,
  openSitesPage,
  openAssetsPage,
  openTasksPage,
  openWorkflowsPage,
  openPurgingPage,
  openPimB2cPage,
  openPimB2bPage,
};
