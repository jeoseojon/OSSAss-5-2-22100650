import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ViewModal = ({ show, onHide, student }) => {
    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header>
                <Modal.Title>View Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {student && (
                    <>
                        <p><strong>Name:</strong> {student.name}</p>
                        <p><strong>Student Number:</strong> {student.studentNumber}</p>
                        <p><strong>Address:</strong> {student.address}</p>
                        <p><strong>Email:</strong> {student.email}</p>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ViewModal; 