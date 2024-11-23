import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditModal = ({ show, onHide, student, onSuccess }) => {
    const [formData, setFormData] = useState({
        name: '',
        studentNumber: '',
        address: '',
        email: ''
    });

    useEffect(() => {
        if (student) {
            setFormData({
                name: student.name,
                studentNumber: student.studentNumber,
                address: student.address,
                email: student.email
            });
        }
    }, [student]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://672eddeb229a881691f128ae.mockapi.io/netlify/${student.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Student updated successfully.');
                onSuccess();
                onHide();
            }
        } catch (error) {
            alert('Failed to update student.');
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Form onSubmit={handleSubmit}>
                <Modal.Header>
                    <Modal.Title>Edit Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Student Number</Form.Label>
                        <Form.Control
                            type="text"
                            required
                            value={formData.studentNumber}
                            onChange={(e) => setFormData({ ...formData, studentNumber: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                            as="textarea"
                            required
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Cancel
                    </Button>
                    <Button variant="info" type="submit">
                        Save
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default EditModal; 