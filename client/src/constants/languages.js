export const allLanguages = [
    { id: 1, value: 'english', label: 'English' },
    { id: 2, value: 'spanish', label: 'Spanish' },
    { id: 3, value: 'mandarin', label: 'Mandarin' },
    { id: 4, value: 'hindi', label: 'Hindi' },
    { id: 5, value: 'bengali', label: 'Bengali' },
    { id: 6, value: 'portuguese', label: 'Portuguese' },
    { id: 7, value: 'russian', label: 'Russian' },
    { id: 8, value: 'japanese', label: 'Japanese' },
    { id: 9, value: 'western-punjabi', label: 'Western Punjabi' },
    { id: 10, value: 'turkish', label: 'Turkish' },
    { id: 11, value: 'korean', label: 'Korean' },
    { id: 12, value: 'french', label: 'French' },
    { id: 13, value: 'german', label: 'German' },
    { id: 14, value: 'urdu', label: 'Urdu' },
    { id: 15, value: 'italian', label: 'Italian' },
    { id: 16, value: 'arabian', label: 'Arabian' },
    { id: 17, value: 'dutch', label: 'Dutch' },
    { id: 18, value: 'thai', label: 'Thai' },
    { id: 19, value: 'greek', label: 'Greek' },
    { id: 20, value: 'polish', label: 'Polish' },
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
