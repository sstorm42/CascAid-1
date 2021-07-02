import { getAllUsers } from '@Actions/user-action';
import UserList from '@Components/search/user-list';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
const SearchUser = (props) => {
    const [userId, setUserId] = useState();
    const [activePage, setActivePage] = useState(1);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getInitialInfo = () => {
            setLoading(true);
            const user = props.auth.user;
            if (user && user._id) {
                setUserId(user._id);
            }

            setLoading(false);
        };
        getInitialInfo();
    }, []);
    useEffect(() => {
        props.dispatch(getAllUsers({ name: props.match.params.name }));
    }, [props.match.params.name]);

    return (
        <Container className="parent-page">
            {/* <Row>
                <Col>Searching User With {props.match.params.name} Name</Col>
            </Row> */}
            <Row>
                <Col>
                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={activePage}
                        itemsCountPerPage={30}
                        totalItemsCount={props.getAllUsersResponse.success ? props.getAllUsersResponse.users.length : 0}
                        pageRangeDisplayed={5}
                        onChange={(page) => {
                            setActivePage(page);
                        }}
                    />
                </Col>
                <hr />
            </Row>
            <Row>
                <Col>
                    <UserList
                        users={props.getAllUsersResponse.success ? props.getAllUsersResponse.users.slice((activePage - 1) * 30, activePage * 30 - 1) : []}
                    />
                </Col>
            </Row>
        </Container>
    );
};
const mapStateToProps = (state) => {
    const getAllUsersResponse = state.User.getAllUsers;
    return { getAllUsersResponse };
};
export default connect(mapStateToProps, null)(SearchUser);
