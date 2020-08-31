// const getSurnameFirstNameParts = (name) => {
//     const splitName = name.split(', ');

//     const surname = splitName[0];

//     const remainingNames = splitName[1].split(' ');

//     const firstName = remainingNames[0];

//     const middleNames = remainingNames.slice(1).join(' ');

//     return {
//         firstName,
//         middleNames,
//         surname,
//     }
// }

// const getNormalNameParts = (name) => {
//     const splitName = query.split(', ');

//     const firstName = splitName[0];

//     splitName.shift();
//     splitName.pop();

//     const middleNames = splitName.join(' ');

//     const surname = splitName[-1];

//     return {
//         firstName,
//         middleNames,
//         surname,
//     }
// }

// const getHtmlElement = (linkUrl) => {
//     const anchors = document.querySelectorAll('a');

//     let element = '';

//     Array.from(anchors).forEach(a => {
//         if (a.href === linkUrl) {
//             element = a.parentElement;
//         }
//     })


//     return element;
// }

// const getPersonPopover = (element) => {
//     const children = element.children;

//     let popover = null;
//     Array.from(children).forEach(c => {
//         if (c.classList.value === 'person-img') {
//             popover = c
//         }
//     })

//     return popover;
// }

// const getBDMString = (popover) => {
//     return popover.children[0].children[0].children.textContent.trim();
// }

// const searchFG = (phrase, tab) => {

//     chrome.contextMenus.onClicked.addListener(function (info, tab) {
//         if (tab) {
//             /* Inject the code into the current tab */
//             /* chrome.tabs.executeScript(tab.id, { code: code }); */
//             chrome.tabs.executeScript(tab.id, { file: "test.js" });
//         }
//     });

//     let el = '';

//     console.log(tab);

//     chrome.tabs.sendMessage(tab.id, "getClickedEl", function (clickedEl) {
//         console.log("CLICKEROO", clickedEl);
//         el = clickedEl;
//     });

//     console.log("ELEMENT", el);


//     const query = phrase.selectionText;

//     const {
//         firstName,
//         middleNames,
//         surname
//     } = getSurnameFirstNameParts(query);

//     const element = getHtmlElement(phrase.linkUrl);
//     const personPopoverElement = getPersonPopover(element);
//     const birthDeathString = getBDMSTring(personPopoverElement);

//     console.log(birthDeathString);

//     const http = 'https://www.findagrave.com/memorial/search?';
//     const fn = `firstname=${firstName}`;
//     const mn = `middlename=${middleNames}`;
//     const sn = `lastname=${surname}`;

//     const end = 'birthyear=&birthyearfilter=&deathyear=&deathyearfilter=&location=&locationId=&memorialid=&mcid=&linkedToName=&datefilter=&orderby='

//     const url = `${http}${fn}&${mn}&${sn}&${end}`

//     chrome.tabs.create({ url });
// };

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

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    // chrome.tabs.sendMessage(tab.id, { from: 'script3' });
})

// var tab2id;
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//     if (message.from == "script1") {
//         console.log("JAMES!", message);
//         chrome.tabs.sendMessage(tab2id, message);
//     }
// });