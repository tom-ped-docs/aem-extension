// web.dev / ... / ES modules in service workers https://web.dev/es-modules-in-sw
// import type { Changes } from './modules/types.mjs';
import { unlockPassword, unlockRegion, unlockAgeGate } from './modules/module-iqos.mjs';
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({
        colorScheme: 'automatic',
        inNewPage: true,
        isSamsungVisible: true,
        isIqosVisible: true,
        samsungId: '',
        samsungEmail: '',
        samsungVersion: 'v5AemEuShop',
        samsungUrl: 'pl',
        iqosVersion: 'ppAem',
        iqosCatalog: 'catalogIqos',
        iqosUrl: 'de/en/home'
    });
});
// chrome.storage.onChanged.addListener( ( changes: Changes, areaName: string ) =>
// {
//   console.group( 'chrome.storage.onChanged' );
//   console.dir( changes );
//   console.dir( areaName );
//   console.groupEnd();
// } );
chrome.commands.onCommand.addListener((command) => {
    switch (command) {
        case 'unlock_password':
            unlockPassword();
            break;
        case 'unlock_region':
            unlockRegion();
            break;
        case 'unlock_age_gate':
            unlockAgeGate();
            break;
    }
});
