// TODO: 1. https://popper.js.org/docs/v2/performance

import { setColorScheme } from './modules/color-scheme.mjs';

import { default as sanitizeUrl } from './modules/sanitize.mjs';

import * as UI from './modules/ui-popup.mjs';
import * as Samsung from './modules/module-samsung.mjs';
import * as Iqos from './modules/module-iqos.mjs';

// import { createPopper } from '../../node_modules/@popperjs/core/dist/esm/popper.js';

setColorScheme();

UI.setSection( 'samsung-section' );
UI.setSection( 'iqos-section' );
UI.setAnimations();
UI.setAutofocus();

UI.setInputSwitch();

UI.setSelect( 'samsung-select-version' );
UI.setSelect( 'iqos-select-version' );
UI.setSelect( 'iqos-select-catalog' );

UI.updateInput( 'samsung-input-url' );
UI.updateInput( 'iqos-input-url' );

UI.toggleLabelSwitch();

UI.toggleCritical();

UI.toggleButton( 'samsung-button-signin' );
UI.toggleButton( 'samsung-button-tasks' );
UI.toggleButton( 'iqos-button-published-signin' );

document.body.addEventListener( 'click', ( event: Event ) =>
{
  const ELEMENT = event.target as HTMLButtonElement;

  switch ( ELEMENT.id )
  {
    case 'button-options':
      chrome.runtime.openOptionsPage();
      break;

    case 'samsung-button-signin':
      Samsung.openSignInPage();
      break;
    case 'samsung-button-editor':
      Samsung.openEditorPage();
      break;
    case 'samsung-button-preview':
      Samsung.openPreviewPage();
      break;
    case 'samsung-button-qa':
      Samsung.openQaPage();
      break;
    case 'samsung-button-published':
      Samsung.openPublishedPage();
      break;
    case 'samsung-button-sites':
      Samsung.openSitesPage();
      break;
    case 'samsung-button-assets':
      Samsung.openAssetsPage();
      break;
    case 'samsung-button-tasks':
      Samsung.openTasksPage();
      break;
    case 'samsung-button-workflows':
      Samsung.openWorkflowsPage();
      break;
    case 'samsung-button-purging':
      Samsung.openPurgingPage();
      break;
    case 'samsung-button-pim-b2c':
      Samsung.openPimB2cPage();
      break;
    case 'samsung-button-pim-b2b':
      Samsung.openPimB2bPage();
      break;
    case 'samsung-button-clipboard':
      UI.updateInputClipboard( 'samsung-input-url' );
      // -> updateInput
      break;

    case 'iqos-button-signin':
      Iqos.openSignInPage();
      break;
    case 'iqos-button-editor':
      Iqos.openEditorPage();
      break;
    case 'iqos-button-preview':
      Iqos.openPreviewPage();
      break;
    case 'iqos-button-properties':
      Iqos.openPropertiesPage();
      break;
    case 'iqos-button-published-signin':
      Iqos.openPublishedSignInPage();
      break;
    case 'iqos-button-published':
      Iqos.openPublishedPage();
      break;
    case 'iqos-button-sites':
      Iqos.openSitesPage();
      break;
    case 'iqos-button-assets':
      Iqos.openAssetsPage();
      break;
    case 'iqos-button-region':
      Iqos.unlockRegion();
      window.close;
      break;
    case 'iqos-button-password':
      Iqos.unlockPassword();
      window.close;
      break;
    case 'iqos-button-agegate':
      Iqos.unlockAgeGate();
      window.close;
      break;
    case 'iqos-button-hybris':
      Iqos.openHybrisPage();
      break;
    case 'iqos-button-clipboard':
      UI.updateInputClipboard( 'iqos-input-url' );
      // -> updateInput
      break;
    case 'iqos-button-home':
      UI.updateInputHome( 'iqos-input-url' );
      // -> updateInput
      break;
    case 'iqos-button-conditions':
      Iqos.addConditions();
      break;
    case 'iqos-button-actions':
      Iqos.addActions();
      break;

    // default:
    //   console.debug( `event: click ${ event }, event.target: ${ ELEMENT }` );
    //   break;
  }

  event.stopPropagation();
} );

document.body.addEventListener( 'change', ( event: Event ) =>
{
  const ELEMENT = event.target as HTMLInputElement | HTMLSelectElement;

  switch ( ELEMENT.id )
  {
    case 'input-switch':
      updateStorage( ELEMENT.id );
      UI.toggleLabelSwitch();
      break;

    case 'samsung-select-version':
      updateStorage( ELEMENT.id, ELEMENT.value );
      UI.toggleButton( 'samsung-button-signin' );
      UI.toggleButton( 'samsung-button-tasks' );
      break;
    case 'samsung-input-url':
      const SAMSUNG_SANITIZED_URL: string = sanitizeUrl( ELEMENT.value );

      updateStorage( ELEMENT.id, SAMSUNG_SANITIZED_URL );
      UI.updateInput( ELEMENT.id );
      break;

    case 'iqos-select-version':
      updateStorage( ELEMENT.id, ELEMENT.value );
      UI.toggleCritical();
      UI.toggleButton( 'iqos-button-published-signin' );
      break;
    case 'iqos-select-catalog':
      updateStorage( ELEMENT.id, ELEMENT.value );
      break;
    case 'iqos-input-url':
      const IQOS_SANITIZED_URL: string = sanitizeUrl( ELEMENT.value );

      updateStorage( ELEMENT.id, IQOS_SANITIZED_URL );
      UI.updateInput( ELEMENT.id );
      break;

    // default:
    //   console.debug( `event: change ${ event }, event.target: ${ ELEMENT }` );
    //   break;
  }

  event.stopPropagation();
} );

const updateStorage = ( id: string, value: string = '' ) =>
{
  switch ( id )
  {
    case 'input-switch':
      const INPUT_SWITCH = document.querySelector( `#${ id }` ) as HTMLInputElement;

      INPUT_SWITCH.checked === true
        ? chrome.storage.local.set( { inNewPage: true } )
        : chrome.storage.local.set( { inNewPage: false } );
      break;

    case 'samsung-select-version':
      chrome.storage.local.set( { samsungVersion: value } );
      break;
    case 'samsung-input-url':
      chrome.storage.local.set( { samsungUrl: value } );
      break;

    case 'iqos-select-version':
      chrome.storage.local.set( { iqosVersion: value } );
      break;
    case 'iqos-select-catalog':
      chrome.storage.local.set( { iqosCatalog: value } );
      break;
    case 'iqos-input-url':
      chrome.storage.local.set( { iqosUrl: value } );
      break;
  }
};

// const BUTTON_OPTIONS = document.querySelector( `#button-options` ) as HTMLButtonElement;
// const TOOLTIP_OPTIONS = document.querySelector( `#tooltip-options` ) as HTMLDivElement;

// const POPPER_OPTIONS = createPopper( BUTTON_OPTIONS, TOOLTIP_OPTIONS, {
//   placement: 'auto',
//   modifiers: [
//     {
//       name: 'offset',
//       options: {
//         offset: [ 0, 4 ]
//       }
//     }
//   ],
//   strategy: 'fixed'
// } );

// const EVENTS_1 = [ 'mouseenter', 'focus' ];
// const EVENTS_2 = [ 'mouseleave', 'blur' ];

// EVENTS_1.forEach( ( event ) =>
// {
//   BUTTON_OPTIONS.addEventListener( event, () =>
//   {
//     TOOLTIP_OPTIONS.classList.add( 'js-visible' );

//     POPPER_OPTIONS.setOptions( ( options ) => ( {
//       ...options,
//       modifiers: [
//         ...options.modifiers,
//         { name: 'eventListeners', enabled: true },
//       ],
//     } ) );

//     POPPER_OPTIONS.update();
//   } );
// } );

// EVENTS_2.forEach( ( event ) =>
// {
//   BUTTON_OPTIONS.addEventListener( event, () =>
//   {
//     TOOLTIP_OPTIONS.classList.remove( 'js-visible' );

//     POPPER_OPTIONS.setOptions( ( options ) => ( {
//       ...options,
//       modifiers: [
//         ...options.modifiers,
//         { name: 'eventListeners', enabled: false },
//       ],
//     } ) );
//   } );
// } );
