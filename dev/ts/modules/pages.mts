import type { Storage } from './types.mjs';

const openPage = ( url: string ) =>
{
  chrome.storage.local.get( 'inNewPage', ( storage: Storage ) =>
  {
    storage.inNewPage === true
      ? chrome.tabs.create( { url: url } )
      : chrome.tabs.update( { url: url } ); // <- tabId: Tab.highlighted

    window.close();
  } );
};

export default openPage;
