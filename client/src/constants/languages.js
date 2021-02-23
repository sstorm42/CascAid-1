// export const allLanguages = [
//     { id: 1, value: 'english', label: 'English' },
//     { id: 2, value: 'spanish', label: 'Spanish' },
//     { id: 3, value: 'mandarin', label: 'Mandarin' },
//     { id: 4, value: 'hindi', label: 'Hindi' },
//     { id: 5, value: 'bengali', label: 'Bengali' },
//     { id: 6, value: 'portuguese', label: 'Portuguese' },
//     { id: 7, value: 'russian', label: 'Russian' },
//     { id: 8, value: 'japanese', label: 'Japanese' },
//     { id: 9, value: 'western-punjabi', label: 'Western Punjabi' },
//     { id: 10, value: 'turkish', label: 'Turkish' },
//     { id: 11, value: 'korean', label: 'Korean' },
//     { id: 12, value: 'french', label: 'French' },
//     { id: 13, value: 'german', label: 'German' },
//     { id: 14, value: 'urdu', label: 'Urdu' },
//     { id: 15, value: 'italian', label: 'Italian' },
//     { id: 16, value: 'arabian', label: 'Arabian' },
//     { id: 17, value: 'dutch', label: 'Dutch' },
//     { id: 18, value: 'thai', label: 'Thai' },
//     { id: 19, value: 'greek', label: 'Greek' },
//     { id: 20, value: 'polish', label: 'Polish' },
// ];
export const allLanguages = [
    {
        id: 1,
        value: 'english',
        label: 'English',
    },
    {
        id: 2,
        value: 'spanish',
        label: 'Spanish',
    },
    {
        id: 3,
        value: 'mandarin',
        label: 'Mandarin',
    },
    {
        id: 4,
        value: 'cantonese',
        label: 'Cantonese',
    },
    {
        id: 5,
        value: 'vietnamese',
        label: 'Vietnamese',
    },
    {
        id: 6,
        value: 'russian',
        label: 'Russian',
    },
    {
        id: 7,
        value: 'arabic',
        label: 'Arabic',
    },
    {
        id: 8,
        value: 'haitan',
        label: 'Haitan',
    },
    {
        id: 9,
        value: 'french',
        label: 'French',
    },
    {
        id: 10,
        value: 'khmer',
        label: 'Khmer',
    },
    {
        id: 11,
        value: 'malayalam',
        label: 'Malayalam',
    },
    {
        id: 12,
        value: 'kannada',
        label: 'Kannada',
    },
    {
        id: 13,
        value: 'portuguese',
        label: 'Portuguese',
    },
    {
        id: 14,
        value: 'korean',
        label: 'Korean',
    },
    {
        id: 15,
        value: 'italian',
        label: 'Italian',
    },
    {
        id: 16,
        value: 'bengali',
        label: 'Bengali',
    },
    {
        id: 17,
        value: 'ukranian',
        label: 'Ukranian',
    },
    {
        id: 18,
        value: 'tagalog',
        label: 'Tagalog',
    },
    {
        id: 19,
        value: 'gujarati',
        label: 'Gujarati',
    },
    {
        id: 20,
        value: 'amharic',
        label: 'Amharic',
    },
    {
        id: 21,
        value: 'somali',
        label: 'Somali',
    },
    {
        id: 22,
        value: 'hindi',
        label: 'Hindi',
    },
    {
        id: 23,
        value: 'polish',
        label: 'Polish',
    },
    {
        id: 24,
        value: 'urdu',
        label: 'Urdu',
    },
    {
        id: 25,
        value: 'swahili',
        label: 'Swahili',
    },
    {
        id: 26,
        value: 'nepali',
        label: 'Nepali',
    },
    {
        id: 27,
        value: 'martathi',
        label: 'Martathi',
    },
    {
        id: 28,
        value: 'tamil',
        label: 'Tamil',
    },
    {
        id: 29,
        value: 'japanese',
        label: 'Japanese',
    },
    {
        id: 30,
        value: 'hebrew',
        label: 'Hebrew',
    },
    {
        id: 31,
        value: 'telugu',
        label: 'Telugu',
    },
    {
        id: 32,
        value: 'thai',
        label: 'Thai',
    },
    {
        id: 33,
        value: 'lao',
        label: 'Lao',
    },
];

export const getLanguageByValue = (value) => {
    const languages = allLanguages.filter((language) => language.value === value);
    if (languages && languages.length > 0) return languages[0].label;
    else return 'Not Found';
};

export const getLanguagesByValues = (values) => {
    console.log(values);
    return allLanguages.filter((language) => values.includes(language.value));
};
