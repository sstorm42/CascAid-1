import React from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { defaultPostPicture } from '../../constants/default-images';
import moment from 'moment';
const PostListView = (props) => {
    const allPosts = props.allPosts;
    const descriptionRender = (description) => {
        if (description) {
            if (description.length < 101) return description;
            else return description.substr(0, 100) + '...';
        } else return 'No description available';
    };
    if (allPosts && allPosts.length > 0) {
        return (
            <CardColumns md="6">
                {allPosts.map((post, i) => {
                    if (post && post._id) {
                        return (
                            <Card
                                className="special-btn special-card"
                                key={i}
                                onClick={() => {
                                    props.gotoPostDetails(post._id);
                                }}
                            >
                                <Card.Img variant="top" src={post.defaultImage ? post.defaultImage : defaultPostPicture} alt="No Image Found" />
                                <Card.Body>
                                    <Card.Title className="center-aligned">{post.title}</Card.Title>
                                    <Card.Text className="justify-text">
                                        <small>{descriptionRender(post.description)}</small>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small>On {moment(post.startDateTime).format('LL')}</small>
                                </Card.Footer>
                            </Card>
                        );
                    } else return <></>;
                })}
            </CardColumns>
        );
    } else return <h4>No Posts Found</h4>;
};
export default PostListView;
