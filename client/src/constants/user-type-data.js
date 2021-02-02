const userTypeData = [
    { id: 1, name: 'individual', label: 'Individual' },
    { id: 2, name: 'organization', label: 'Organization' },
    { id: 3, name: 'admin', label: 'Admin' },
];

export const getAllUserTypeData = () => {
    return userTypeData;
};
export const getUserTypeDataById = (id) => {
    return userTypeData[id - 1];
};

const userTypeFilterData = [
    { id: 1, value: 'both', label: 'Both' },
    { id: 2, value: 'individual', label: 'Individual' },
    { id: 3, value: 'organization', label: 'Organization' },
];

export const getAllUserTypeFilterData = () => {
    return userTypeFilterData;
};
export const getUserTypeFilterDataByValue = (value) => {
    for (let type = 0; type < userTypeFilterData.length; type++) {
        if (userTypeFilterData[type].value === value) return userTypeFilterData[type];
    }
    return userTypeFilterData[0]; // default return both
};
const userTypeOptionData = [
    { id: 1, value: 'individual', label: 'Individual' },
    { id: 2, value: 'organization', label: 'Organization' },
];

export const getAllUserTypeOptionData = () => {
    return userTypeOptionData;
};
export const getUserTypeOptionDataByValue = (value) => {
    for (let type = 0; type < userTypeOptionData.length; type++) {
        if (userTypeOptionData[type].value === value) return userTypeOptionData[type];
    }
    return userTypeOptionData[0]; // default return both
};
