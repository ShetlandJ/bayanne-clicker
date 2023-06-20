const getSurnameFirstNameParts = (name) => {
  const splitName = name.split(' ');

  const surname = splitName[splitName.length - 1];
  const firstName = splitName[0];
  const middleNames = splitName.slice(1, splitName.length - 1).join(' ');

  return {
    firstName,
    middleNames,
    surname,
  };
};

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
    contexts: ["selection"],
    onclick: searchFG
});