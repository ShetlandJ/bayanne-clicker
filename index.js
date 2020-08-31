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

const searchFG = (phrase, withBirthAndDeathDate = false) => {
    const query = phrase.selectionText;

    const {
        firstName,
        middleNames,
        surname
    } = getSurnameFirstNameParts(query);


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
    contexts: ["selection"],  // ContextType
    onclick: searchFG // A callback function
});