const setSelect = () => {
    chrome.storage.local.get('colorScheme', (storage) => {
        const SELECT_COLOR_SCHEME = document.querySelector('#select-color-scheme');
        const OPTION_COLOR_SCHEME = SELECT_COLOR_SCHEME.namedItem(storage.colorScheme);
        OPTION_COLOR_SCHEME.selected = true;
    });
};
const setInputs = () => {
    chrome.storage.local.get(['isSamsungVisible', 'isIqosVisible', 'samsungId', 'samsungEmail'], (storage) => {
        const SAMSUNG_INPUT_VISIBILITY = document.querySelector('#samsung-input-visibility');
        SAMSUNG_INPUT_VISIBILITY.checked = storage.isSamsungVisible;
        const IQOS_INPUT_VISIBILITY = document.querySelector('#iqos-input-visibility');
        IQOS_INPUT_VISIBILITY.checked = storage.isIqosVisible;
        const SAMSUNG_INPUT_ID = document.querySelector('#samsung-input-id');
        SAMSUNG_INPUT_ID.value = storage.samsungId;
        const SAMSUNG_INPUT_EMAIL = document.querySelector('#samsung-input-email');
        SAMSUNG_INPUT_EMAIL.value = storage.samsungEmail;
    });
};
const toggleLabel = (id) => {
    chrome.storage.local.get(['isSamsungVisible', 'isIqosVisible'], (storage) => {
        switch (id) {
            case 'samsung-label-visibility':
                const SAMSUNG_LABEL_VISIBILITY = document.querySelector(`#${id}`);
                SAMSUNG_LABEL_VISIBILITY.textContent = storage.isSamsungVisible ? 'On' : 'Off';
                break;
            case 'iqos-label-visibility':
                const IQOS_LABEL_VISIBILITY = document.querySelector(`#${id}`);
                IQOS_LABEL_VISIBILITY.textContent = storage.isIqosVisible ? 'On' : 'Off';
                break;
        }
    });
};
export { setSelect, setInputs, toggleLabel };
