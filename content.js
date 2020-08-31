//content script
var clickedElement;

document.addEventListener("mousedown", function (event) {
    clickedElement = event.target;
}, true);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const { message } = request;

    handleClick(message, clickedElement);
});

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
    const splitName = name.split(', ');

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

    let element = '';

    Array.from(anchors).forEach(a => {
        if (a.href === linkUrl) {
            element = a.parentElement;
        }
    })


    return element;
}

const getPersonPopover = (element) => {
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
    return popover.children[0].children[0].children[2].textContent.trim();
}

const handleClick = (phrase, element) => {
    const query = phrase.selectionText;

    let firstName = '';
    let middleNames = '';
    let surname = '';

    if (window.location.href.includes('search')) {
        let {
            firstName,
            middleNames,
            surname
        } = getSurnameFirstNameParts(query);
    } else {
        let {
            firstName,
            middleNames,
            surname
        } = getNormalNameParts(query);
    }

    console.log(firstName, middleNames, surname);


    // const element = getHtmlElement(phrase.linkUrl);
    const personPopoverElement = getPersonPopover(element);
    const birthDeathString = getBDMString(personPopoverElement);
    const bdSplit = birthDeathString.split(' ');

    const birthYear = bdSplit[0].length === 4 ? bdSplit[0] : '';
    const deathYear = bdSplit[2].length === 4 ? bdSplit[2] : '';

    const http = 'https://www.findagrave.com/memorial/search?';
    const fn = `firstname=${firstName}`;
    const mn = `middlename=${middleNames}`;
    const sn = `lastname=${surname}`;
    const by = `birthyear=${birthYear}&birthyearfilter=`;
    const dy = `deathyear=${deathYear}&deathyearfilter=`;

    const end = 'location=&locationId=&memorialid=&mcid=&linkedToName=&datefilter=&orderby='

    const url = `${http}${fn}&${mn}&${sn}&${by}&${dy}&${end}`

    // chrome.tabs.create({ url });
    window.open(url, 'meaningfulName')
};