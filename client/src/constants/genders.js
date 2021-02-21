export const allGenders = [
    { id: 1, value: 'female', label: 'Female' },
    { id: 2, value: 'male', label: 'Male' },
    { id: 3, value: 'transgender-female', label: 'Transgender Female' },
    { id: 4, value: 'transgender-male', label: 'Transgender Male' },
    { id: 3, value: 'transgender-non-conforming', label: 'Gender Non-Conforming' },
    { id: 4, value: 'other', label: 'Other' },
];

export const getGenderByValue = (value) => {
    const genders = allGenders.filter((gender) => gender.value === value);
    if (genders && genders.length > 0) return genders[0].label;
    else return 'Not Found';
};
