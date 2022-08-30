import type { Storage } from './types.mjs';

const setColorScheme = () =>
{
  chrome.storage.local.get( 'colorScheme', ( storage: Storage ) =>
  {
    switch ( storage.colorScheme )
    {
      case 'light':
        document.documentElement.dataset.colorScheme = storage.colorScheme;
        break;
      case 'dark':
        document.documentElement.dataset.colorScheme = storage.colorScheme;
        break;
      default:
        if ( 'colorScheme' in document.documentElement.dataset )
          delete document.documentElement.dataset.colorScheme;
        break;
    }
  } );
};

const updateColorScheme = () =>
{
  document.documentElement.classList.add( 'js-color-scheme' );

  setColorScheme();

  window.setTimeout( () =>
  {
    document.documentElement.classList.remove( 'js-color-scheme' );
  }, 501 );
};

export { setColorScheme, updateColorScheme };
