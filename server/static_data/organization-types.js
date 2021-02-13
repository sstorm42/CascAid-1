exports.allOrganizationTypes = [
    { id: 1, value: 'non-profit', label: 'Non Profit' },
    { id: 2, value: 'political-organization', label: 'Political Organization' },
    { id: 3, value: 'community-group', label: 'Community Group' },
    { id: 4, value: 'other', label: 'Other' },
];

exports.getOrganizationTypeByValue = (value) => {
    allOrganizationTypes.forEach((type) => {
        if (type.value === value) return type;
    });
};
