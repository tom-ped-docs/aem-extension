import { default as openPage } from './pages.mjs';
const URLS = {
    ppAem: 'https://author.pp.iqos.com/',
    ppPublished: 'https://www.pp.iqos.com/',
    ppPublishedClub: 'https://club.pp.iqos.com/',
    ppPublishedVeev: 'https://www.pp.veev-vape.com/',
    ppPublishedSignIn: 'cgi-bin/authorize.cgi',
    ppPublishedSignInClub: 'edgeauth',
    ppPublishedSignInVeev: 'edgeauth',
    ppHybris: 'https://backoffice.pp.iqos.com/backoffice/login.zul',
    pAem: 'https://author.iqos.com/',
    pPublished: 'https://www.iqos.com/',
    pPublishedClub: 'https://www.iqosclub.com/',
    pPublishedVeev: 'https://www.veev-vape.com/',
    pHybris: 'https://backoffice.iqos.com/backoffice/login.zul',
    urlSignIn: 'aem/start.html',
    urlEditor1: 'editor.html/content/',
    urlEditor2: '.html',
    urlPreview1: 'content/',
    urlPreview2: '.html?wcmmode=disabled',
    urlProperties: 'mnt/overlay/wcm/core/content/sites/properties.html?item=/content/',
    urlPublished: '.html?gr=false',
    urlSites: 'sites.html/content/',
    urlAssets: 'assets.html/content/dam/iqos/local',
    urlUnlock: '?gr=false',
    catalogIqos: 'pmisite',
    catalogIqosClub: 'pmiclub',
    catalogIqosVeev: 'veevsite'
};
const START_KEYS = [
    'ppAem',
    'ppPublished',
    'ppPublishedClub',
    'ppPublishedVeev',
    'pAem',
    'pPublished',
    'pPublishedClub',
    'pPublishedVeev',
    'urlEditor1',
    'urlPreview1',
    'urlSites',
    'urlAssets',
    'catalogIqos',
    'catalogIqosClub',
    'catalogIqosVeev'
];
const END_KEYS = [
    'urlEditor2',
    'urlPreview2',
    'urlPublished'
];
const openSignInPage = () => {
    chrome.storage.local.get('iqosVersion', (storage) => {
        openPage(URLS[storage.iqosVersion] + URLS.urlSignIn);
    });
};
const openEditorPage = () => {
    chrome.storage.local.get(['iqosVersion', 'iqosCatalog', 'iqosUrl'], (storage) => {
        openPage(URLS[storage.iqosVersion] + URLS.urlEditor1 + URLS[storage.iqosCatalog] + '/' + storage.iqosUrl + URLS.urlEditor2);
    });
};
const openPreviewPage = () => {
    chrome.storage.local.get(['iqosVersion', 'iqosCatalog', 'iqosUrl'], (storage) => {
        openPage(URLS[storage.iqosVersion] + URLS.urlPreview1 + URLS[storage.iqosCatalog] + '/' + storage.iqosUrl + URLS.urlPreview2);
    });
};
const openPropertiesPage = () => {
    chrome.storage.local.get(['iqosVersion', 'iqosCatalog', 'iqosUrl'], (storage) => {
        openPage(URLS[storage.iqosVersion] + URLS.urlProperties + URLS[storage.iqosCatalog] + '/' + storage.iqosUrl);
    });
};
// ui-popup.mts -> toggleButton
const openPublishedSignInPage = () => {
    chrome.storage.local.get('iqosCatalog', (storage) => {
        switch (storage.iqosCatalog) {
            case 'catalogIqos':
                openPage(URLS.ppPublished + URLS.ppPublishedSignIn);
                break;
            case 'catalogIqosClub':
                openPage(URLS.ppPublishedClub + URLS.ppPublishedSignInClub);
                break;
            case 'catalogIqosVeev':
                openPage(URLS.ppPublishedVeev + URLS.ppPublishedSignInVeev);
                break;
        }
    });
};
const openPublishedPage = () => {
    chrome.storage.local.get(['iqosVersion', 'iqosCatalog', 'iqosUrl'], (storage) => {
        if (storage.iqosVersion === 'ppAem') {
            switch (storage.iqosCatalog) {
                case 'catalogIqos':
                    openPage(URLS.ppPublished + storage.iqosUrl + URLS.urlPublished);
                    break;
                case 'catalogIqosClub':
                    openPage(URLS.ppPublishedClub + storage.iqosUrl + URLS.urlPublished);
                    break;
                case 'catalogIqosVeev':
                    openPage(URLS.ppPublishedVeev + storage.iqosUrl + URLS.urlPublished);
                    break;
            }
        }
        else {
            switch (storage.iqosCatalog) {
                case 'catalogIqos':
                    openPage(URLS.pPublished + storage.iqosUrl + URLS.urlPublished);
                    break;
                case 'catalogIqosClub':
                    openPage(URLS.pPublishedClub + storage.iqosUrl + URLS.urlPublished);
                    break;
                case 'catalogIqosVeev':
                    openPage(URLS.pPublishedVeev + storage.iqosUrl + URLS.urlPublished);
                    break;
            }
        }
    });
};
const openSitesPage = () => {
    chrome.storage.local.get(['iqosVersion', 'iqosCatalog', 'iqosUrl'], (storage) => {
        openPage(URLS[storage.iqosVersion] + URLS.urlSites + URLS[storage.iqosCatalog] + '/' + storage.iqosUrl);
    });
};
const CODES = {
    cr: 'costa-rica',
    cz: 'czech-republic',
    eg: 'egypt',
    fi: 'finland',
    fr: 'france',
    de: 'germany',
    id: 'indonesia',
    jp: 'japan',
    kg: 'kyrgyzstan',
    mv: 'maldives',
    ma: 'morocco',
    mx: 'mx',
    ph: 'philippines',
    pl: 'poland',
    pt: 'portugal',
    sk: 'slovakia',
    tw: 'taiwan',
    tn: 'tunisia',
    gb: 'uk',
    ae: 'united-arab-emirates',
    vu: 'vanuatu',
    vn: 'vietnam'
};
const openAssetsPage = () => {
    chrome.storage.local.get(['iqosVersion', 'iqosUrl'], (storage) => {
        const CODE = storage.iqosUrl.slice(0, 2);
        CODES[CODE] !== undefined
            ? openPage(URLS[storage.iqosVersion] + URLS.urlAssets + '/' + CODES[CODE])
            : openPage(URLS[storage.iqosVersion] + URLS.urlAssets);
    });
};
const unlockRegion = () => {
    const f = async () => {
        let [tab] = await chrome.tabs.query({ active: true });
        chrome.tabs.update({ url: tab.url + URLS.urlUnlock });
    };
    f();
};
const unlockAgeGate = () => {
    const f = async () => {
        let [tab] = await chrome.tabs.query({ active: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: unlockAgeGate1,
        });
    };
    f();
};
const unlockAgeGate1 = () => {
    // ------------------------- catalogIqos, catalogIqosClub -------------------------
    const SELECT_MONTH = document.querySelector('#months-select');
    const SELECT_YEAR = document.querySelector('#years-select');
    const SPAN_MONTH = document.querySelector('span.label-placeholder--month');
    const SPAN_YEAR = document.querySelector('span.label-placeholder--year');
    if (SELECT_MONTH !== null && SELECT_YEAR !== null) {
        Array.from(SELECT_MONTH.options, (option) => {
            if (option.value === '07') {
                option.selected = true;
                SPAN_MONTH.textContent = option.label;
            }
        });
        Array.from(SELECT_YEAR.options, (option) => {
            if (option.value === '1992') {
                option.selected = true;
                SPAN_YEAR.textContent = option.label;
            }
        });
    }
    const EVENT_CLICK = new MouseEvent('click', {
        bubbles: true,
        cancelable: true
    });
    const BUTTON_SUBMIT = document.querySelector('#nbw-agegate-submit');
    if (BUTTON_SUBMIT !== null)
        BUTTON_SUBMIT.dispatchEvent(EVENT_CLICK);
    // ------------------------- catalogIqosVeev -------------------------
    const SELECT_MONTH_VEEV = document.querySelector('select.birth-month');
    const SELECT_YEAR_VEEV = document.querySelector('select.birth-year');
    if (SELECT_MONTH_VEEV !== null && SELECT_YEAR_VEEV !== null) {
        Array.from(SELECT_MONTH_VEEV.options, (option) => {
            if (option.value === '07')
                option.selected = true;
        });
        Array.from(SELECT_YEAR_VEEV.options, (option) => {
            if (option.value === '1992')
                option.selected = true;
        });
    }
    const BUTTON_SUBMIT_VEEV = document.querySelector('#agegate-submit');
    if (BUTTON_SUBMIT_VEEV !== null)
        BUTTON_SUBMIT_VEEV.dispatchEvent(EVENT_CLICK);
    // ------------------------- catalogIqos, catalogIqosClub, catalogIqosVeev -------------------------
    const BUTTON_COOKIES = document.querySelector('#cookies-yes');
    if (BUTTON_COOKIES !== null)
        // BUTTON_COOKIES.dispatchEvent( EVENT_CLICK );
        BUTTON_COOKIES.click();
};
const openHybrisPage = () => {
    chrome.storage.local.get('iqosVersion', (storage) => {
        storage.iqosVersion === 'ppAem'
            ? openPage(URLS.ppHybris)
            : openPage(URLS.pHybris);
    });
};
export { URLS, START_KEYS, END_KEYS, openSignInPage, openEditorPage, openPreviewPage, openPropertiesPage, openPublishedSignInPage, openPublishedPage, openSitesPage, openAssetsPage, unlockRegion, unlockAgeGate, openHybrisPage, };
