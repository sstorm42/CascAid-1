import React from 'react';
import { Card, CardColumns } from 'react-bootstrap';
import { defaultProjectPicture } from '../../constants/default-images';
import moment from 'moment';
const ProjectListView = (props) => {
    const allProjects = props.allProjects;
    const descriptionRender = (description) => {
        if (description) {
            if (description.length < 101) return description;
            else return description.substr(0, 100) + '...';
        } else return 'No description available';
    };
    if (allProjects && allProjects.length > 0) {
        return (
            <CardColumns md="6">
                {allProjects.map((project, i) => {
                    if (project && project._id) {
                        return (
                            <Card
                                className="special-btn special-card"
                                key={i}
                                onClick={() => {
                                    props.gotoProjectDetails(project._id);
                                }}
                            >
                                <Card.Img variant="top" src={project.defaultImage ? project.defaultImage : defaultProjectPicture} alt="No Image Found" />
                                <Card.Body>
                                    <Card.Title className="center-aligned">{project.title}</Card.Title>
                                    <Card.Text className="justify-text">
                                        <small>{descriptionRender(project.description)}</small>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small>On {moment(project.startDateTime).format('LL')}</small>
                                </Card.Footer>
                            </Card>
                        );
                    } else return <></>;
                })}
            </CardColumns>
        );
    } else return <h4>No Projects Found</h4>;
};
export default ProjectListView;
