// TODO: 1. Popper https://popper.js.org/

import { setColorScheme, updateColorScheme } from './modules/color-scheme.mjs';

import * as UI from './modules/ui-options.mjs';

setColorScheme();

UI.setSelect();

UI.setInputs();
UI.toggleLabel( 'samsung-label-visibility' );
UI.toggleLabel( 'iqos-label-visibility' );

document.body.addEventListener( 'click', ( event: Event ) =>
{
  const ELEMENT = event.target as HTMLButtonElement;

  switch ( ELEMENT.id )
  {
    case 'button-shortcuts':
      chrome.tabs.create( { url: 'chrome://extensions/shortcuts' } );
      break;

    case 'samsung-button-save':
      updateStorage( ELEMENT.id );
      break;
  }
} );

document.body.addEventListener( 'change', ( event: Event ) =>
{
  const ELEMENT = event.target as HTMLSelectElement | HTMLInputElement;

  switch ( ELEMENT.id )
  {
    case 'select-color-scheme':
      updateStorage( ELEMENT.id, ELEMENT.value );
      updateColorScheme();
      break;

    case 'samsung-input-visibility':
      updateStorage( ELEMENT.id );
      UI.toggleLabel( 'samsung-label-visibility' );
      break;
    case 'iqos-input-visibility':
      updateStorage( ELEMENT.id );
      UI.toggleLabel( 'iqos-label-visibility' );
      break;
  }
} );

const updateStorage = ( id: string, value: string = '' ) =>
{
  switch ( id )
  {
    case 'select-color-scheme':
      chrome.storage.local.set( { colorScheme: value } );
      break;

    case 'samsung-input-visibility':
      const SAMSUNG_INPUT_VISIBILITY = document.querySelector( `#${ id }` ) as HTMLInputElement;

      SAMSUNG_INPUT_VISIBILITY.checked === true
        ? chrome.storage.local.set( { isSamsungVisible: true } )
        : chrome.storage.local.set( { isSamsungVisible: false } );
      break;
    case 'iqos-input-visibility':
      const IQOS_INPUT_VISIBILITY = document.querySelector( `#${ id }` ) as HTMLInputElement;

      IQOS_INPUT_VISIBILITY.checked === true
        ? chrome.storage.local.set( { isIqosVisible: true } )
        : chrome.storage.local.set( { isIqosVisible: false } );
      break;

    case 'samsung-button-save':
      const SAMSUNG_INPUT_ID = document.querySelector( '#samsung-input-id' ) as HTMLInputElement;

      chrome.storage.local.set( { samsungId: SAMSUNG_INPUT_ID.value } );

      const SAMSUNG_INPUT_EMAIL = document.querySelector( '#samsung-input-email' ) as HTMLInputElement;

      chrome.storage.local.set( { samsungEmail: SAMSUNG_INPUT_EMAIL.value } );
      break;
  }
};
