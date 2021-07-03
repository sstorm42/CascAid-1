import { DeleteButtonRender, DetailsButtonRender, EditButtonRender, ListButtonRender } from '@Components/form_template/buttons-render';
import moment from 'moment';
import { getPostTypeByValue } from '@Constants/post-types';
import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { CheckIconRender, CrossIconRender } from '@Components/form_template/icon-render';
const UpcomingActivities = (props) => {
    const allPosts = props.allPosts;
    if (allPosts && allPosts.length > 0) {
        return (
            <>
                <Row>
                    <Col>
                        <h5>UPCOMING ACTIVITIES</h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table striped bordered hover responsive size="sm">
                            <thead>
                                <tr className="table-active">
                                    <th>#</th>
                                    <th>Post Type</th>
                                    <th>Title</th>
                                    <th>Created On</th>
                                    <th>Start Date</th>
                                    <th>Published</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allPosts.map((post, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{getPostTypeByValue(post.postType)[0].label}</td>
                                            <td>{post.title}</td>
                                            <td>{moment(post.createdAt).format('LLL')}</td>
                                            <td>{moment(post.startDateTime).format('LLL')}</td>
                                            <td>{post.isActive ? <CheckIconRender /> : <CrossIconRender />}</td>
                                            <td>
                                                <DetailsButtonRender
                                                    onClick={() => {
                                                        props.handleGoToPostDetails(post.postType, post._id);
                                                    }}
                                                />{' '}
                                                &nbsp;
                                                <EditButtonRender
                                                    onClick={() => {
                                                        props.handleGoToPostEdit(post.postType, post._id);
                                                    }}
                                                />{' '}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </>
        );
    } else return <></>;
};
export default UpcomingActivities;
