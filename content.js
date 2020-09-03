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
    const splitName = name.split(' ');

    const firstName = splitName[0];
    const surname = splitName[splitName.length - 1];

    splitName.shift();
    splitName.pop();

    const middleNames = splitName.join(' ');

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
    if (popover) {
        if (popover.children[0]) {
            if (popover.children[0].children[0]) {
                if (popover.children[0].children[0].children[2]) {
                    return popover.children[0].children[0].children[2].textContent.trim()
                }
            }
        }
    }

    return false;
}

const handleClick = (phrase) => {
    const query = phrase.selectionText;

    let firstName = '';
    let middleNames = '';
    let surname = '';

    if (window.location.href.includes('search')) {
        const name = getSurnameFirstNameParts(query);

        firstName = name.firstName;
        middleNames = name.middleNames;
        surname = name.surname;

    } else {
        const name = getNormalNameParts(query);

        firstName = name.firstName;
        middleNames = name.middleNames;
        surname = name.surname;
    }

    let bdSplit = '';
    let birthYear = '';
    let deathYear = '';

    if (window.location.href.includes('search')) {
        const element = getHtmlElement(phrase.linkUrl);
        const personPopoverElement = getPersonPopover(element);
        const birthDeathString = getBDMString(personPopoverElement);
        if (birthDeathString) {
            bdSplit = birthDeathString.split(' ');
            birthYear = bdSplit[0].length === 4 ? bdSplit[0] : '';
            deathYear = bdSplit[2].length === 4 ? bdSplit[2] : '';
        }
    } else {
        const spans = document.getElementsByClassName('normal');
        const birthDeathString = spans[1].textContent.trim();
        bdSplit = birthDeathString.split(' ');

        birthYear = bdSplit[0].length === 4 ? bdSplit[0] : '';
        deathYear = bdSplit[2].length === 4 ? bdSplit[2] : '';
    }

    const http = 'https://www.findagrave.com/memorial/search?';
    const fn = `firstname=${firstName}`;
    const mn = `middlename=${middleNames}`;
    const sn = `lastname=${surname}`;
    const by = `birthyear=${birthYear}&birthyearfilter=`;
    const dy = `deathyear=${deathYear}&deathyearfilter=`;

    const end = 'location=&locationId=&memorialid=&mcid=&linkedToName=&datefilter=&orderby='

    const url = `${http}${fn}&${mn}&${sn}&${by}&${dy}&${end}`

    window.open(url, 'meaningfulName')
};