import React from 'react';
import { DeleteButtonRender, EditButtonRender, AcceptButtonRender, RejectButtonRender } from '../form_template/buttons-render';
import { getMembershipByValue } from '../../constants/membership-types';
import { defaultOrganizationProfilePicture, defaultIndividualProfilePicture } from '../../constants/default-images';
import { getMembershipStatusByValue } from '../../constants/membership-types';
import { Table, Image, Badge } from 'react-bootstrap';
const TimeRender = (time) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[time.month]}-${time.year}`;
};
const MembershipList = (props) => {
    const memberships = props.memberships;
    const userType = props.userType;
    console.log('🚀 ~ file: membership-list.js ~ line 12 ~ MembershipList ~ memberships', memberships);
    return (
        <Table>
            <thead></thead>
            <tbody>
                {memberships.map((member, i) => {
                    let name = '';
                    let profilePicture = '';
                    if (userType === 'individual') {
                        name = member.organizationName;
                        profilePicture = member.organizationProfilePicture ? member.organizationProfilePicture : defaultOrganizationProfilePicture;
                    } else if (userType === 'organization') {
                        name = member.individualFirstName + ' ' + member.individualLastName;
                        profilePicture = member.individualProfilePicture ? member.individualProfilePicture : defaultIndividualProfilePicture;
                    }
                    return (
                        <tr key={i}>
                            <td>
                                <Image src={profilePicture} style={{ height: 32, width: 32 }} thumbnail />
                            </td>
                            <td>{name}</td>
                            <td>{getMembershipStatusByValue(member.status)}</td>
                            <td>{getMembershipByValue(member.membershipType)}</td>
                            <td>{TimeRender(member.startTime)}</td>
                            <td>{member.isCurrent}</td>
                            {member.isCurrent ? (
                                <td>
                                    <Badge variant="primary">Current Member</Badge>
                                </td>
                            ) : (
                                <td>{TimeRender(member.endTime)}</td>
                            )}
                            <td>
                                {member.status === 'pending' && member.requestedBy !== userType ? (
                                    <>
                                        <AcceptButtonRender
                                            onClick={() => {
                                                props.handleAcceptMembership(member._id);
                                            }}
                                        />
                                        &nbsp;
                                        <RejectButtonRender
                                            onClick={() => {
                                                props.handleRejectMembership(member._id);
                                            }}
                                        />
                                    </>
                                ) : (
                                    <></>
                                )}
                            </td>
                            <td>
                                {/* <EditButtonRender />
                                &nbsp; */}
                                <DeleteButtonRender
                                    onClick={() => {
                                        props.handleDeleteMembership(member._id);
                                    }}
                                />
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};
export default MembershipList;
