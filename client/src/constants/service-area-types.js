export const allServiceAreaTypes = [
    { id: 1, value: 'neighborhood', label: 'Neighborhood' },
    { id: 2, value: 'zip-code', label: 'Zip Code' },
    { id: 3, value: 'city', label: 'City' },
    { id: 4, value: 'county', label: 'County' },
    { id: 5, value: 'state', label: 'State' },
    { id: 6, value: 'country', label: 'Country' },
];

export const getServiceAreaTypeByValue = (value) => {
    allServiceAreaTypes.forEach((type) => {
        if (type.value === value) return type;
    });
};
