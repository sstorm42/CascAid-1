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
    return (
        <Modal
            style={{ zIndex: 10000 }}
            show={cultivationModal}
            onHide={() => {
                setCultivationModal(false);
            }}
        >
            <Modal.Header closeButton>Save To</Modal.Header>
            <Modal.Body>
                <Table>
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
