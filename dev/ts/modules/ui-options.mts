import type { Storage } from './types.mjs';

const setSelect = () =>
{
  chrome.storage.local.get( 'colorScheme', ( storage: Storage ) =>
  {
    const SELECT_COLOR_SCHEME = document.querySelector( '#select-color-scheme' ) as HTMLSelectElement;
    const OPTION_COLOR_SCHEME = SELECT_COLOR_SCHEME.namedItem( storage.colorScheme ) as HTMLOptionElement;

    OPTION_COLOR_SCHEME.selected = true;
  } );
};

const setInputs = () =>
{
  chrome.storage.local.get( [ 'isSamsungVisible', 'isIqosVisible', 'samsungId', 'samsungEmail' ], ( storage: Storage ) =>
  {
    const SAMSUNG_INPUT_VISIBILITY = document.querySelector( '#samsung-input-visibility' ) as HTMLInputElement;

    SAMSUNG_INPUT_VISIBILITY.checked = storage.isSamsungVisible;

    const IQOS_INPUT_VISIBILITY = document.querySelector( '#iqos-input-visibility' ) as HTMLInputElement;

    IQOS_INPUT_VISIBILITY.checked = storage.isIqosVisible;

    const SAMSUNG_INPUT_ID = document.querySelector( '#samsung-input-id' ) as HTMLInputElement;

    SAMSUNG_INPUT_ID.value = storage.samsungId;

    const SAMSUNG_INPUT_EMAIL = document.querySelector( '#samsung-input-email' ) as HTMLInputElement;

    SAMSUNG_INPUT_EMAIL.value = storage.samsungEmail;
  } );
};

const toggleLabel = ( id: string ) =>
{
  chrome.storage.local.get( [ 'isSamsungVisible', 'isIqosVisible' ], ( storage: Storage ) =>
  {
    switch ( id )
    {
      case 'samsung-label-visibility':
        const SAMSUNG_LABEL_VISIBILITY = document.querySelector( `#${ id }` ) as HTMLLabelElement;

        SAMSUNG_LABEL_VISIBILITY.textContent = storage.isSamsungVisible ? 'On' : 'Off';
        break;
      case 'iqos-label-visibility':
        const IQOS_LABEL_VISIBILITY = document.querySelector( `#${ id }` ) as HTMLLabelElement;

        IQOS_LABEL_VISIBILITY.textContent = storage.isIqosVisible ? 'On' : 'Off';
        break;
    }
  } );
};

export
{
  setSelect,
  setInputs,
  toggleLabel
};
