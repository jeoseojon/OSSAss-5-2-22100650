import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import '../../index.css';

const ShowList = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newStudent, setNewStudent] = useState({
        name: '',
        studentNumber: '',
        address: '',
        email: ''
    });

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await fetch('https://672eddeb229a881691f128ae.mockapi.io/netlify');
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this student?')) {
            try {
                const response = await fetch(`https://672eddeb229a881691f128ae.mockapi.io/netlify/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    fetchStudents();
                }
            } catch (error) {
                console.error('Error deleting student:', error);
            }
        }
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://672eddeb229a881691f128ae.mockapi.io/netlify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newStudent),
            });

            if (response.ok) {
                setShowAddModal(false);
                setNewStudent({
                    name: '',
                    studentNumber: '',
                    address: '',
                    email: ''
                });
                fetchStudents();
                alert('Student added successfully');
            }
        } catch (error) {
            alert('Failed to add student');
        }
    };

    return (
        <div className="container-xl">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-6">
                                <h2><b>Students List</b></h2>
                            </div>
                            <div className="col-sm-6">
                                <button onClick={() => setShowAddModal(true)} className="btn btn-success">
                                    <i className="material-icons">&#xE147;</i>
                                    <span>Add New Student</span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <Table className="table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Student Number</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.studentNumber}</td>
                                    <td>{student.address}</td>
                                    <td>{student.email}</td>
                                    <td>
                                        <a href="#!" onClick={() => navigate(`/view/${student.id}`)} className="view">
                                            <i className="material-icons">&#xE417;</i>
                                        </a>
                                        <a href="#!" onClick={() => navigate(`/edit/${student.id}`)} className="edit">
                                            <i className="material-icons">&#xE254;</i>
                                        </a>
                                        <a href="#!" onClick={() => handleDelete(student.id)} className="delete">
                                            <i className="material-icons">&#xE872;</i>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>

            {/* Add Modal */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Form onSubmit={handleAddSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Student</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={newStudent.name}
                                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Student Number</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={newStudent.studentNumber}
                                onChange={(e) => setNewStudent({ ...newStudent, studentNumber: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                as="textarea"
                                required
                                value={newStudent.address}
                                onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                required
                                value={newStudent.email}
                                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="success" type="submit">
                            Add
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    );
};

export default ShowList; 