const getSurnameFirstNameParts = (name) => {
    const splitName = name.split(', ');

    const surname = splitName[0];

    const remainingNames = splitName[1].split(' ');

    const firstName = remainingNames[0];

    const middleNames = remainingNames.slice(1).join(' ');

    return {
        firstName,
        middleNames,
        surname,
    }
}

const getNormalNameParts = (name) => {
    const splitName = query.split(', ');

    const firstName = splitName[0];

    splitName.shift();
    splitName.pop();

    const middleNames = splitName.join(' ');

    const surname = splitName[-1];

    return {
        firstName,
        middleNames,
        surname,
    }
}

const getHtmlElement = (linkUrl) => {
    const anchors = document.querySelectorAll('a');

    console.log(anchors);

    let element = '';

    Array.from(anchors).forEach(a => {
        console.log(a.href, linkUrl);
        if (a.href === linkUrl) {
            element = a.parentElement;
        }
    })


    return element;
}

const getPersonPopover = (element) => {
    console.log(element);
    const children = element.children;

    let popover = null;
    Array.from(children).forEach(c => {
        if (c.classList.value === 'person-img') {
            popover = c
        }
    })

    return popover;
}

const getBDMString = (popover) => {
    return popover.children[0].children[0].children.textContent.trim();
}

const searchFG = (phrase) => {
    const query = phrase.selectionText;

    const {
        firstName,
        middleNames,
        surname
    } = getSurnameFirstNameParts(query);

    const element = getHtmlElement(phrase.linkUrl);
    const personPopoverElement = getPersonPopover(element);
    const birthDeathString = getBDMSTring(personPopoverElement);

    console.log(birthDeathString);

    const http = 'https://www.findagrave.com/memorial/search?';
    const fn = `firstname=${firstName}`;
    const mn = `middlename=${middleNames}`;
    const sn = `lastname=${surname}`;

    const end = 'birthyear=&birthyearfilter=&deathyear=&deathyearfilter=&location=&locationId=&memorialid=&mcid=&linkedToName=&datefilter=&orderby='

    const url = `${http}${fn}&${mn}&${sn}&${end}`

    chrome.tabs.create({ url });
};

chrome.contextMenus.create({
    title: "Search Find A Grave",
    contexts: ["selection"],
    onclick: (a, b, c) => searchFG(a, b, c)
});