import type { Storage } from './types.mjs';

import { default as sanitizeUrl } from './sanitize.mjs';

const setSection = ( id: string ) =>
{
  chrome.storage.local.get( [ 'isSamsungVisible', 'isIqosVisible' ], ( storage: Storage ) =>
  {
    switch ( id )
    {
      case 'samsung-section':
        const SAMSUNG_SECTION = document.querySelector( `#${ id }` ) as HTMLElement;

        if ( storage.isSamsungVisible === false )
          SAMSUNG_SECTION.classList.add( 'js-invisible' );
        break;
      case 'iqos-section':
        const IQOS_SECTION = document.querySelector( `#${ id }` ) as HTMLElement;

        if ( storage.isIqosVisible === false )
          IQOS_SECTION.classList.add( 'js-invisible' );
        break;
    }
  } );
};

const setAnimations = () =>
{
  chrome.storage.local.get( [ 'isSamsungVisible', 'isIqosVisible' ], ( storage: Storage ) =>
  {
    const SAMSUNG_SECTION = document.querySelector( '#samsung-section' ) as HTMLElement;
    const IQOS_SECTION = document.querySelector( '#iqos-section' ) as HTMLElement;

    if ( storage.isSamsungVisible === true && storage.isIqosVisible === false )
      SAMSUNG_SECTION.classList.add( 'js-animation-1' );
    else
      if ( storage.isSamsungVisible === false && storage.isIqosVisible === true )
        IQOS_SECTION.classList.add( 'js-animation-1' );
      else
      {
        SAMSUNG_SECTION.classList.add( 'js-animation-1' );
        IQOS_SECTION.classList.add( 'js-animation-2' );
      }
  } );
};

const setAutofocus = () =>
{
  chrome.storage.local.get( [ 'isSamsungVisible', 'isIqosVisible' ], ( storage: Storage ) =>
  {
    const SAMSUNG_INPUT = document.querySelector( '#samsung-input-url' ) as HTMLInputElement;
    const IQOS_INPUT = document.querySelector( '#iqos-input-url' ) as HTMLInputElement;

    if ( storage.isSamsungVisible === true && storage.isIqosVisible === false )
      SAMSUNG_INPUT.focus();
    else
      if ( storage.isSamsungVisible === false && storage.isIqosVisible === true )
        IQOS_INPUT.focus();
      else
      {
        // ...
      }
  } );
};

const setInputSwitch = () =>
{
  chrome.storage.local.get( [ 'inNewPage', 'isSamsungVisible', 'isIqosVisible' ], ( storage: Storage ) =>
  {
    const INPUT_SWITCH = document.querySelector( '#input-switch' ) as HTMLInputElement;
    // const LABEL_SWITCH = document.querySelector( '#label-switch' ) as HTMLLabelElement;

    if ( storage.isSamsungVisible === false && storage.isIqosVisible === false )
    {
      INPUT_SWITCH.disabled = true;
      // LABEL_SWITCH.classList.add( 'f-label--disabled' );
    }

    INPUT_SWITCH.checked = storage.inNewPage;
  } );
};

const setSelect = ( id: string ) =>
{
  chrome.storage.local.get( [ 'samsungVersion', 'iqosVersion', 'iqosCatalog' ], ( storage: Storage ) =>
  {
    switch ( id )
    {
      case 'samsung-select-version':
        const SAMSUNG_SELECT_VERSION = document.querySelector( `#${ id }` ) as HTMLSelectElement;
        const SAMSUNG_OPTION_VERSION = SAMSUNG_SELECT_VERSION.namedItem( storage.samsungVersion ) as HTMLOptionElement;

        SAMSUNG_OPTION_VERSION.selected = true;
        break;
      case 'iqos-select-version':
        const IQOS_SELECT_VERSION = document.querySelector( `#${ id }` ) as HTMLSelectElement;
        const IQOS_OPTION_VERSION = IQOS_SELECT_VERSION.namedItem( storage.iqosVersion ) as HTMLOptionElement;

        IQOS_OPTION_VERSION.selected = true;
        break;
      case 'iqos-select-catalog':
        const IQOS_SELECT_CATALOG = document.querySelector( `#${ id }` ) as HTMLSelectElement;
        const IQOS_OPTION_CATALOG = IQOS_SELECT_CATALOG.namedItem( storage.iqosCatalog ) as HTMLOptionElement;

        IQOS_OPTION_CATALOG.selected = true;
        break;
    }
  } );
};

const updateInput = ( id: 'samsung-input-url' | 'iqos-input-url' ) =>
{
  chrome.storage.local.get( [ 'samsungUrl', 'iqosUrl' ], ( storage: Storage ) =>
  {
    const INPUT = document.querySelector( `#${ id }` ) as HTMLInputElement;

    if ( id === 'samsung-input-url' )
      INPUT.value = storage.samsungUrl;
    else
      INPUT.value = storage.iqosUrl;
  } );
};

const updateInputClipboard = ( id: 'samsung-input-url' | 'iqos-input-url' ) =>
{
  const f = async () =>
  {
    let [ tab ] = await chrome.tabs.query( { active: true } );

    const SANITIZED_URL: string = sanitizeUrl( tab.url );

    if ( id === 'samsung-input-url' )
      chrome.storage.local.set( { samsungUrl: SANITIZED_URL } );
    else
      chrome.storage.local.set( { iqosUrl: SANITIZED_URL } );

    updateInput( id );
  };

  f();
};

const toggleLabelSwitch = () =>
{
  chrome.storage.local.get( 'inNewPage', ( storage: Storage ) =>
  {
    const LABEL_SWITCH = document.querySelector( '#label-switch' ) as HTMLLabelElement;

    if ( storage.inNewPage )
    {
      LABEL_SWITCH.classList.add( 'js-fi--new-tab' );

      if ( LABEL_SWITCH.classList.contains( 'js-fi--current-tab' ) )
        LABEL_SWITCH.classList.remove( 'js-fi--current-tab' );
    } else
    {
      LABEL_SWITCH.classList.add( 'js-fi--current-tab' );

      if ( LABEL_SWITCH.classList.contains( 'js-fi--new-tab' ) )
        LABEL_SWITCH.classList.remove( 'js-fi--new-tab' );
    }
  } );
};

const toggleCritical = () =>
{
  chrome.storage.local.get( 'iqosVersion', ( storage: Storage ) =>
  {
    const IQOS_SECTION = document.querySelector( '#iqos-section' ) as HTMLElement;

    if ( storage.iqosVersion === 'pAem' )
      IQOS_SECTION.classList.add( 'js-critical' );
    else
      if ( IQOS_SECTION.classList.contains( 'js-critical' ) )
        IQOS_SECTION.classList.remove( 'js-critical' );
  } );
};

const toggleButton = ( id: string ) =>
{
  chrome.storage.local.get( [ 'samsungId', 'samsungEmail', 'samsungVersion', 'iqosVersion' ], ( storage: Storage ) =>
  {
    switch ( id )
    {
      case 'samsung-button-signin':
        const SAMSUNG_BUTTON_SIGNIN = document.querySelector( `#${ id }` ) as HTMLButtonElement;

        if ( storage.samsungVersion === 'v5Aem' || storage.samsungVersion === 'v5AemEu' || storage.samsungVersion === 'v5AemEuShop' )
          storage.samsungId === ''
            ? SAMSUNG_BUTTON_SIGNIN.disabled = true
            : SAMSUNG_BUTTON_SIGNIN.disabled = false;
        else
          storage.samsungEmail === ''
            ? SAMSUNG_BUTTON_SIGNIN.disabled = true
            : SAMSUNG_BUTTON_SIGNIN.disabled = false;
        break;

      case 'samsung-button-tasks':
        const SAMSUNG_BUTTON_TASKS = document.querySelector( `#${ id }` ) as HTMLButtonElement;

        storage.samsungVersion === 'v6AemAp' || storage.samsungVersion === 'v6AemEu' || storage.samsungVersion === 'v6AemUs'
          ? SAMSUNG_BUTTON_TASKS.disabled = true
          : SAMSUNG_BUTTON_TASKS.disabled = false;
        break;

      case 'iqos-button-published-signin':
        const IQOS_BUTTON_PUBLISHED_SIGNIN = document.querySelector( `#${ id }` ) as HTMLButtonElement;

        storage.iqosVersion === 'pAem'
          ? IQOS_BUTTON_PUBLISHED_SIGNIN.disabled = true
          : IQOS_BUTTON_PUBLISHED_SIGNIN.disabled = false;
        break;
    }
  } );
};

export
{
  setSection,
  setAnimations,
  setAutofocus,
  setInputSwitch,
  setSelect,
  updateInput,
  updateInputClipboard,
  toggleLabelSwitch,
  toggleCritical,
  toggleButton
};
