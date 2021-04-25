export const allMembershipTypes = [
    { id: 1, value: 'board', label: 'Board' },
    { id: 2, value: 'committee', label: 'Committee' },
    { id: 3, value: 'volunteer', label: 'Volunteer' },
    { id: 4, value: 'employee', label: 'Employee' },
];
export const getMembershipByValue = (value) => {
    const memberships = allMembershipTypes.filter((membership) => membership.value === value);
    if (memberships && memberships.length > 0) return memberships[0].label;
    else return 'Not Found';
};

export const allMembershipStatus = [
    { id: 1, value: 'pending', label: 'Pending' },
    { id: 2, value: 'accepted', label: 'Accepted' },
    { id: 3, value: 'rejected', label: 'Rejected' },
];
export const getMembershipStatusByValue = (value) => {
    const statues = allMembershipStatus.filter((status) => status.value === value);
    if (statues && statues.length > 0) return statues[0].label;
    else return 'Not Found';
};
