import React from 'react';
import { DeleteButtonRender, EditButtonRender } from '../form_template/buttons-render';
import { getMembershipByValue } from '../../constants/membership-types';
import { defaultOrganizationProfilePicture } from '../../constants/default-images';
import { Table, Image } from 'react-bootstrap';
const TimeRender = (time) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return `${months[time.month]}-${time.year}`;
};
const MembershipList = (props) => {
    const memberships = props.memberships;
    return (
        <Table>
            <thead></thead>
            <tbody>
                {memberships.map((member, i) => {
                    return (
                        <tr key={i}>
                            <td>
                                <Image
                                    src={member.organizationProfilePicture ? member.organizationProfilePicture : defaultOrganizationProfilePicture}
                                    style={{ height: 32, width: 32 }}
                                    thumbnail
                                />
                            </td>
                            <td>{member.organizationName}</td>
                            <td>{member.status}</td>
                            <td>{getMembershipByValue(member.membershipType)}</td>
                            <td>{TimeRender(member.startTime)}</td>
                            <td>{TimeRender(member.endTime)}</td>
                            {/* <td>
                                <EditButtonRender />
                                &nbsp;
                                <DeleteButtonRender />
                            </td> */}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};
export default MembershipList;
