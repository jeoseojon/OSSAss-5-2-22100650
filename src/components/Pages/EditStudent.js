import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const EditStudent = () => {
    const [formData, setFormData] = useState({
        name: '',
        studentNumber: '',
        address: '',
        email: ''
    });
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`https://672eddeb229a881691f128ae.mockapi.io/netlify/${id}`);
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        };
        fetchStudent();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://672eddeb229a881691f128ae.mockapi.io/netlify/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Student updated successfully.');
                navigate('/');
            }
        } catch (error) {
            alert('Failed to update student.');
        }
    };

    return (
        <div className="container mt-4">
            <h2>Edit Student</h2>
            <Form onSubmit={handleSubmit}>
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
                <Button variant="secondary" onClick={() => navigate('/')} className="me-2">
                    Cancel
                </Button>
                <Button variant="info" type="submit">
                    Save
                </Button>
            </Form>
        </div>
    );
};

export default EditStudent; 