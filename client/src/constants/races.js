export const allRaces = [
    { id: 1, value: 'american-indian-alaska-native', label: 'American Indian/Alaska Native' },
    { id: 2, value: 'asian', label: 'Asian' },
    { id: 3, value: 'black', label: 'black' },
    { id: 4, value: 'hispanic', label: 'Hispanic' },
    { id: 5, value: 'middle-eastern-north-african', label: 'middle Eastern/North African' },
    { id: 6, value: 'native-hawaiian-other-pacific-islander', label: 'Native Hawaiian/Other Pacific Islander' },
    { id: 7, value: 'white', label: 'White' },
    { id: 8, value: 'other', label: 'Other' },
];
export const getRaceByValue = (value) => {
    const name = 'Name not found!';
    for (let race = 0; race < allRaces.length; race++) {
        if (allRaces[race].value === value) return allRaces[race].name;
    }
    return name;
};

export const getRacesByValues = (values) => {
    return allRaces.filter((race) => values.includes(race.value));
};
