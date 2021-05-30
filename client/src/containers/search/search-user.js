import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../actions/user-action';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import LoadingAnim from '../../components/form_template/loading-anim';
import Pagination from 'react-js-pagination';
import UserList from '../../components/search/user-list';
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
                    <UserList users={props.getAllUsersResponse.success ? props.getAllUsersResponse.users : []} />
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
