export const allMembershipTypes = [
    { id: 1, value: 'board', label: 'Board' },
    { id: 2, value: 'executive', label: 'Executive' },
    { id: 3, value: 'committee', label: 'Committee' },
    { id: 4, value: 'lifetime', label: 'Life-Time' },
];
export const getMembershipByValue = (value) => {
    const memberships = allMembershipTypes.filter((membership) => membership.value === value);
    if (memberships && memberships.length > 0) return memberships[0].label;
    else return 'Not Found';
};
