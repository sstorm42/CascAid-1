import React from 'react';
import { Container, Row, Col, Modal, Table, Button } from 'react-bootstrap';
import { AddButtonRender } from '../form_template/buttons-render';
const TitleRender = (title) => {
    if (title) {
        if (title.length > 50) return title.substr(0, 50) + '...';
        else return title;
    } else return '';
};
const CultivationListModal = (props) => {
    const cultivationModal = props.cultivationModal;
    const setCultivationModal = props.setCultivationModal;
    const allCultivations = props.allCultivations;
    const handleAddUserToCultivationList = props.handleAddUserToCultivationList;
    const createNewCultivation = props.createNewCultivation;
    const setCreateNewCultivation = props.setCreateNewCultivation;
    const newCultivation = props.newCultivation;
    const handleSetNewCultivation = props.handleSetNewCultivation;
    const handleCreateNewCultivation = props.handleCreateNewCultivation;
    return (
        <Modal
            style={{ zIndex: 10000 }}
            show={cultivationModal}
            onHide={() => {
                setCultivationModal(false);
            }}
        >
            <Modal.Header closeButton>Cultivate List</Modal.Header>
            <Modal.Body>
                {!createNewCultivation && (
                    <Table striped bordered hover size="sm">
                        <tbody>
                            {allCultivations.map((cultivation, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{TitleRender(cultivation.title)}</td>
                                        <td>
                                            <AddButtonRender
                                                onClick={() => {
                                                    handleAddUserToCultivationList(cultivation._id);
                                                }}
                                            />
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                )}

                {createNewCultivation ? (
                    <>
                        <h6>Create New Cultivate List</h6>
                        <label>Title</label>
                        <input
                            type="text"
                            value={newCultivation.title}
                            onChange={(e) => {
                                handleSetNewCultivation('title', e.target.value);
                            }}
                            className="form-control"
                        />
                        <br />
                        <label>Description</label>
                        <textarea
                            rows="5"
                            value={newCultivation.description}
                            onChange={(e) => {
                                handleSetNewCultivation('description', e.target.value);
                            }}
                            className="form-control"
                        />
                        <br />
                        <Button
                            size="sm"
                            variant="outline-warning"
                            onClick={() => {
                                setCreateNewCultivation(false);
                            }}
                        >
                            Cancel
                        </Button>
                        &nbsp;
                        <Button
                            size="sm"
                            variant="outline-primary"
                            onClick={() => {
                                handleCreateNewCultivation();
                            }}
                        >
                            Create
                        </Button>
                    </>
                ) : (
                    <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => {
                            setCreateNewCultivation(true);
                        }}
                    >
                        Create New Cultivate List
                    </Button>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => {
                        setCultivationModal(false);
                    }}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default CultivationListModal;
