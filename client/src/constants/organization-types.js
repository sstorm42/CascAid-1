export const allOrganizationTypes = [
    { id: 1, value: 'non-profit', label: 'Non Profit' },
    { id: 2, value: 'political-organization', label: 'Political Organization' },
    { id: 3, value: 'community-group', label: 'Community Group' },
    { id: 4, value: 'other', label: 'Other' },
];

export const getOrganizationTypeByValue = (value) => {
    const types = allOrganizationTypes.filter((type) => type.value === value);
    if (types && types.length > 0) return types[0].label;
    else return '';
};
