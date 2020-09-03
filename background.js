const searchFG = (query) => {
        chrome.contextMenus.onClicked.addListener(function (info, tab) {
        chrome.tabs.sendMessage(tab.id, { from: 'script3', message: query });
    })
}

chrome.contextMenus.create({
    title: "Search Find A Grave",
    contexts: ["selection"],
    onclick: (query, tab) => searchFG(query, tab)
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {})
