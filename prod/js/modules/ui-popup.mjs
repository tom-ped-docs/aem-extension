import { default as sanitizeUrl } from './sanitize.mjs';
import { URLS as IQOS_URLS } from './module-iqos.mjs';
const setSection = (id) => {
    chrome.storage.local.get(['isSamsungVisible', 'isIqosVisible'], (storage) => {
        switch (id) {
            case 'samsung-section':
                const SAMSUNG_SECTION = document.querySelector(`#${id}`);
                if (!storage.isSamsungVisible)
                    SAMSUNG_SECTION.classList.add('js-invisible');
                break;
            case 'iqos-section':
                const IQOS_SECTION = document.querySelector(`#${id}`);
                if (!storage.isIqosVisible)
                    IQOS_SECTION.classList.add('js-invisible');
                break;
        }
    });
};
const setAnimations = () => {
    chrome.storage.local.get(['isSamsungVisible', 'isIqosVisible'], (storage) => {
        const SAMSUNG_SECTION = document.querySelector('#samsung-section');
        const IQOS_SECTION = document.querySelector('#iqos-section');
        if (storage.isSamsungVisible && !storage.isIqosVisible)
            SAMSUNG_SECTION.classList.add('js-animation-1');
        else if (!storage.isSamsungVisible && storage.isIqosVisible)
            IQOS_SECTION.classList.add('js-animation-1');
        else {
            SAMSUNG_SECTION.classList.add('js-animation-1');
            IQOS_SECTION.classList.add('js-animation-2');
        }
    });
};
const setAutofocus = () => {
    chrome.storage.local.get(['isSamsungVisible', 'isIqosVisible'], (storage) => {
        const SAMSUNG_INPUT = document.querySelector('#samsung-input-url');
        const IQOS_INPUT = document.querySelector('#iqos-input-url');
        if (storage.isSamsungVisible && !storage.isIqosVisible)
            SAMSUNG_INPUT.focus();
        else if (!storage.isSamsungVisible && storage.isIqosVisible)
            IQOS_INPUT.focus();
        else {
            // ...
        }
    });
};
const setInputSwitch = () => {
    chrome.storage.local.get(['inNewPage', 'isSamsungVisible', 'isIqosVisible'], (storage) => {
        const INPUT_SWITCH = document.querySelector('#input-switch');
        // const LABEL_SWITCH = document.querySelector( '#label-switch' ) as HTMLLabelElement;
        if (!storage.isSamsungVisible && !storage.isIqosVisible) {
            INPUT_SWITCH.disabled = true;
            // LABEL_SWITCH.classList.add( 'f-label--disabled' );
        }
        INPUT_SWITCH.checked = storage.inNewPage;
    });
};
const setSelect = (id) => {
    chrome.storage.local.get(['samsungVersion', 'iqosVersion', 'iqosCatalog'], (storage) => {
        switch (id) {
            case 'samsung-select-version':
                const SAMSUNG_SELECT_VERSION = document.querySelector(`#${id}`);
                const SAMSUNG_OPTION_VERSION = SAMSUNG_SELECT_VERSION.namedItem(storage.samsungVersion);
                SAMSUNG_OPTION_VERSION.selected = true;
                break;
            case 'iqos-select-version':
                const IQOS_SELECT_VERSION = document.querySelector(`#${id}`);
                const IQOS_OPTION_VERSION = IQOS_SELECT_VERSION.namedItem(storage.iqosVersion);
                IQOS_OPTION_VERSION.selected = true;
                break;
            case 'iqos-select-catalog':
                const IQOS_SELECT_CATALOG = document.querySelector(`#${id}`);
                const IQOS_OPTION_CATALOG = IQOS_SELECT_CATALOG.namedItem(storage.iqosCatalog);
                IQOS_OPTION_CATALOG.selected = true;
                break;
        }
    });
};
const updateInput = (id) => {
    chrome.storage.local.get(['samsungUrl', 'iqosUrl'], (storage) => {
        const INPUT = document.querySelector(`#${id}`);
        if (id === 'samsung-input-url')
            INPUT.value = storage.samsungUrl;
        else
            INPUT.value = storage.iqosUrl;
    });
};
const updateInputClipboard = (id) => {
    const f = async () => {
        let [tab] = await chrome.tabs.query({ active: true });
        const SANITIZED_URL = sanitizeUrl(tab.url);
        if (id === 'samsung-input-url')
            chrome.storage.local.set({ samsungUrl: SANITIZED_URL });
        else {
            chrome.storage.local.set({ iqosUrl: SANITIZED_URL });
            if (tab.url.includes(IQOS_URLS.ppPublished) || tab.url.includes(IQOS_URLS.pPublished) || tab.url.includes(IQOS_URLS.catalogIqos)) {
                chrome.storage.local.set({ iqosCatalog: 'catalogIqos' });
                setSelect('iqos-select-catalog');
            }
            else if (tab.url.includes(IQOS_URLS.ppPublishedClub) || tab.url.includes(IQOS_URLS.pPublishedClub) || tab.url.includes(IQOS_URLS.catalogIqosClub)) {
                chrome.storage.local.set({ iqosCatalog: 'catalogIqosClub' });
                setSelect('iqos-select-catalog');
            }
            else if (tab.url.includes(IQOS_URLS.ppPublishedVeev) || tab.url.includes(IQOS_URLS.pPublishedVeev) || tab.url.includes(IQOS_URLS.catalogIqosVeev)) {
                chrome.storage.local.set({ iqosCatalog: 'catalogIqosVeev' });
                setSelect('iqos-select-catalog');
            }
        }
        updateInput(id);
    };
    f();
};
const updateInputHome = (id) => {
    chrome.storage.local.get('iqosUrl', (storage) => {
        let url = storage.iqosUrl;
        url = url.slice(0, 5) + '/home' + url.slice(5);
        chrome.storage.local.set({ iqosUrl: url });
        updateInput(id);
    });
};
const toggleLabelSwitch = () => {
    chrome.storage.local.get('inNewPage', (storage) => {
        const LABEL_SWITCH = document.querySelector('#label-switch');
        if (storage.inNewPage) {
            LABEL_SWITCH.classList.add('js-fi--new-tab');
            if (LABEL_SWITCH.classList.contains('js-fi--current-tab'))
                LABEL_SWITCH.classList.remove('js-fi--current-tab');
        }
        else {
            LABEL_SWITCH.classList.add('js-fi--current-tab');
            if (LABEL_SWITCH.classList.contains('js-fi--new-tab'))
                LABEL_SWITCH.classList.remove('js-fi--new-tab');
        }
    });
};
const toggleCritical = () => {
    chrome.storage.local.get('iqosVersion', (storage) => {
        const IQOS_SECTION = document.querySelector('#iqos-section');
        if (storage.iqosVersion === 'pAem')
            IQOS_SECTION.classList.add('js-critical');
        else if (IQOS_SECTION.classList.contains('js-critical'))
            IQOS_SECTION.classList.remove('js-critical');
    });
};
const toggleButton = (id) => {
    chrome.storage.local.get(['samsungId', 'samsungEmail', 'samsungVersion', 'iqosVersion'], (storage) => {
        switch (id) {
            case 'samsung-button-signin':
                const SAMSUNG_BUTTON_SIGNIN = document.querySelector(`#${id}`);
                if (storage.samsungVersion === 'v5Aem' || storage.samsungVersion === 'v5AemEu' || storage.samsungVersion === 'v5AemEuShop')
                    storage.samsungId === ''
                        ? SAMSUNG_BUTTON_SIGNIN.disabled = true
                        : SAMSUNG_BUTTON_SIGNIN.disabled = false;
                else
                    storage.samsungEmail === ''
                        ? SAMSUNG_BUTTON_SIGNIN.disabled = true
                        : SAMSUNG_BUTTON_SIGNIN.disabled = false;
                break;
            case 'samsung-button-tasks':
                const SAMSUNG_BUTTON_TASKS = document.querySelector(`#${id}`);
                storage.samsungVersion === 'v6AemAp' || storage.samsungVersion === 'v6AemEu' || storage.samsungVersion === 'v6AemUs'
                    ? SAMSUNG_BUTTON_TASKS.disabled = true
                    : SAMSUNG_BUTTON_TASKS.disabled = false;
                break;
            case 'iqos-button-published-signin':
                const IQOS_BUTTON_PUBLISHED_SIGNIN = document.querySelector(`#${id}`);
                storage.iqosVersion === 'pAem'
                    ? IQOS_BUTTON_PUBLISHED_SIGNIN.disabled = true
                    : IQOS_BUTTON_PUBLISHED_SIGNIN.disabled = false;
                break;
        }
    });
};
export { setSection, setAnimations, setAutofocus, setInputSwitch, setSelect, updateInput, updateInputClipboard, updateInputHome, toggleLabelSwitch, toggleCritical, toggleButton };
