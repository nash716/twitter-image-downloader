'use strict';

const CONSTANTS = {
    ORIGINAL_IMAGE: 'originalImage',
    OPEN_ORIGINAL: 'openOriginal',
    DOWNLOAD: 'download',
    DOWNLOAD_AS: 'downloadAs'
};

chrome.contextMenus.create({
    type: 'normal',
    id: CONSTANTS.ORIGINAL_IMAGE,
    title: chrome.i18n.getMessage(CONSTANTS.ORIGINAL_IMAGE),
    contexts: [ 'image' ],
    documentUrlPatterns: [ 'https://twitter.com/*' ],
    targetUrlPatterns: [ 'https://pbs.twimg.com/media/*' ]
});

chrome.contextMenus.create({
    type: 'normal',
    parentId: CONSTANTS.ORIGINAL_IMAGE,
    id: CONSTANTS.OPEN_ORIGINAL,
    title: chrome.i18n.getMessage(CONSTANTS.OPEN_ORIGINAL),
    contexts: [ 'image' ],
    documentUrlPatterns: [ 'https://twitter.com/*' ],
    targetUrlPatterns: [ 'https://pbs.twimg.com/media/*' ]
});

chrome.contextMenus.create({
    type: 'separator',
    parentId: CONSTANTS.ORIGINAL_IMAGE,
    contexts: [ 'image' ],
    documentUrlPatterns: [ 'https://twitter.com/*' ],
    targetUrlPatterns: [ 'https://pbs.twimg.com/media/*' ]
});

chrome.contextMenus.create({
    type: 'normal',
    parentId: CONSTANTS.ORIGINAL_IMAGE,
    id: CONSTANTS.DOWNLOAD,
    title: chrome.i18n.getMessage(CONSTANTS.DOWNLOAD),
    contexts: [ 'image' ],
    documentUrlPatterns: [ 'https://twitter.com/*' ],
    targetUrlPatterns: [ 'https://pbs.twimg.com/media/*' ]
});

chrome.contextMenus.create({
    type: 'normal',
    parentId: CONSTANTS.ORIGINAL_IMAGE,
    id: CONSTANTS.DOWNLOAD_AS,
    title: chrome.i18n.getMessage(CONSTANTS.DOWNLOAD_AS),
    contexts: [ 'image' ],
    documentUrlPatterns: [ 'https://twitter.com/*' ],
    targetUrlPatterns: [ 'https://pbs.twimg.com/media/*' ]
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    const src = info.srcUrl.replace(/(:[A-Za-z]+)?$/, ':orig');

    switch (info.menuItemId) {
    case CONSTANTS.OPEN_ORIGINAL:
        chrome.tabs.create({
            url: src
        });

        break;

    case CONSTANTS.DOWNLOAD_AS:
    case CONSTANTS.DOWNLOAD:
        let screenName = info.pageUrl.replace(/^https:\/\/twitter.com\/([A-Za-z0-9_]+)\/?.*$/, ($0, $1) => $1);
        const randomName = info.srcUrl.replace(/^https:\/\/pbs.twimg.com\/media\/([A-Za-z0-9_\-]+\.[A-Za-z0-9_]+).*$/, ($0, $1) => $1);

        if (screenName === 'i' || screenName.startsWith('https:')) screenName = undefined;

        const fileName = `${screenName ? screenName + '-' : ''}${randomName}`;

        chrome.downloads.download({
            url: src,
            saveAs: info.menuItemId === CONSTANTS.DOWNLOAD_AS,
            filename: fileName,
            conflictAction: 'prompt'
        });

        break;

    default:
        break;
    }
});