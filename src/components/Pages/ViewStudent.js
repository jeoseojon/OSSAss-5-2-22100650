import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const ViewStudent = () => {
    const [student, setStudent] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await fetch(`https://672eddeb229a881691f128ae.mockapi.io/netlify/${id}`);
                const data = await response.json();
                setStudent(data);
            } catch (error) {
                console.error('Error fetching student:', error);
            }
        };
        fetchStudent();
    }, [id]);

    return (
        <div className="container mt-4">
            <h2>View Student</h2>
            {student && (
                <div className="card p-4">
                    <p><strong>Name:</strong> {student.name}</p>
                    <p><strong>Student Number:</strong> {student.studentNumber}</p>
                    <p><strong>Address:</strong> {student.address}</p>
                    <p><strong>Email:</strong> {student.email}</p>
                    <Button variant="secondary" onClick={() => navigate('/')}>
                        Back
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ViewStudent; 