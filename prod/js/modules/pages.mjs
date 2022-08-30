const openPage = (url) => {
    chrome.storage.local.get('inNewPage', (storage) => {
        storage.inNewPage === true
            ? chrome.tabs.create({ url: url })
            : chrome.tabs.update({ url: url }); // <- tabId: Tab.highlighted
        window.close();
    });
};
export default openPage;
