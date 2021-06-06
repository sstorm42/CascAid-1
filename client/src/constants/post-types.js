export const allPostTypes = [
    { id: 1, value: 'event', label: 'Event' },
    { id: 2, value: 'project', label: 'Project' },
    { id: 3, value: 'general', label: 'General Post' },
    { id: 4, value: 'volunteering', label: 'Volunteering' },
    { id: 5, value: 'in-kind', label: 'In-Kind' },
    { id: 6, value: 'advocacy', label: 'Advocacy' },
    { id: 7, value: '', label: '' },
];
export const allSearchablePostTypes = [
    { id: 1, value: 'event', label: 'Event' },
    { id: 2, value: 'project', label: 'Project' },
    { id: 3, value: 'general', label: 'General Post' },
    { id: 4, value: 'volunteering', label: 'Volunteering' },
    { id: 5, value: 'advocacy', label: 'Advocacy' },
];
export const getPostTypeByValue = (value) => {
    return allPostTypes.filter((type) => type.value === value);
};
const fields = {
    title: 'title',
    description: 'description',
    images: 'images',
    impactAreas: 'impactAreas',
    skills: 'skills',
    startDateTime: 'startDateTime',
    endDateTime: 'endDateTime',
    address: 'address',
    expectedRequiredHours: 'expectedRequiredHours',
    topNeed: 'topNeed',
    petitionLink: 'petitionLink',
    isActive: 'isActive',
    requiredItems: 'requiredItems',
    keywords: 'keywords',
};
export const postTypeFields = {
    event: { title: 1, description: 1, images: 1, impactAreas: 1, startDateTime: 1, endDateTime: 1, address: 1, isActive: 1, keywords: 1 },
    project: {
        title: 1,
        description: 1,
        images: 1,
        impactAreas: 1,
        skills: 1,
        expectedRequiredHours: 1,
        startDateTime: 1,
        endDateTime: 1,
        address: 1,
        isActive: 1,
        topNeed: 1,
        keywords: 1,
    },
    general: { title: 1, description: 1, images: 1, impactAreas: 1, isActive: 1, keywords: 1 },
    volunteering: {
        title: 1,
        description: 1,
        images: 1,
        impactAreas: 1,
        skills: 1,
        startDateTime: 1,
        endDateTime: 1,
        address: 1,
        isActive: 1,
        topNeed: 1,
        keywords: 1,
    },
    'in-kind': { title: 1, description: 1, images: 1, impactAreas: 1, requiredItems: 1, isActive: 1, topNeed: 1, keywords: 1 },
    advocacy: {
        title: 1,
        description: 1,
        images: 1,
        petitionLink: 1,
        impactAreas: 1,
        topNeed: 1,
        startDateTime: 1,
        endDateTime: 1,
        address: 1,
        isActive: 1,
        keywords: 1,
    },
};
export const allPostTypeValues = ['event', 'project', 'general', 'volunteering', 'in-kind', 'advocacy'];
export const allPostTypeLabels = ['Event', 'Project', 'General', 'Volunteering', 'In-Kind', 'Advocacy'];
export const getColorByPostType = (postType) => {
    const colors = {
        event: '#274e13',
        project: '#0c343d',
        general: '#1c4587',
        volunteering: '#073763',
        'in-kind': '#20124d',
        advocacy: '#4c1130',
    };
    return colors[postType] ? colors[postType] : 'gray';
};
export const getPostTypeName = (value) => {
    const postTypes = {
        event: 'Event',
        project: 'Project',
        general: 'General Post',
        volunteering: 'Volunteering',
        'in-kind': 'In-Kind',
        advocacy: 'Advocacy',
    };
    const name = postTypes[value] ? postTypes[value] : '';
    return name;
};
