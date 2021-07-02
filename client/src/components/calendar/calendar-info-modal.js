import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getColorByPostType, allCalenderPostTypes } from '@Constants/post-types';
const CalendarInfoModal = (props) => {
    const infoModal = props.infoModal;
    const setInfoModal = props.setInfoModal;
    return (
        <Modal
            style={{ zIndex: 10000 }}
            show={infoModal}
            onHide={() => {
                setInfoModal(false);
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title>Calender Information</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>
                    Posts are associated with different colors for different types. Colors and Post types are mentioned here.
                    {allCalenderPostTypes.map((postType, i) => {
                        return (
                            <li key={i} className="calender-help-list-item" style={{ backgroundColor: getColorByPostType(postType.value) }}>
                                {postType.label}
                            </li>
                        );
                    })}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    size="sm"
                    onClick={() => {
                        setInfoModal(false);
                    }}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default CalendarInfoModal;
