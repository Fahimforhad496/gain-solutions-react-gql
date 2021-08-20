import React, { useEffect, useState } from "react";
import { Table, Container, Form, Row, Col, Button } from "react-bootstrap";
import { request, gql } from "graphql-request";

export default function EnrollmentList() {
    const [enrollments, setEnrollments] = useState([]);
    const [form, setForm] = useState({});
    const setField = (field, value) => {
        setForm({ ...form, [field]: value });
    };
    useEffect(() => {
        const query = gql`
            {
                enrollments {
                    id
                    studentId
                    studentName
                    subjectId
                    subjectName
                }
            }
        `;
        request("http://localhost:8000/graphql", query).then((data) =>
            setEnrollments(data.enrollments)
        );
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const query = gql`
            query enrollmentByStudent($studentName: String!) {
                enrollmentByStudent(studentName: $studentName) {
                    id
                    studentId
                    studentName
                    subjectId
                    subjectName
                }
            }
        `;
        request("http://localhost:8000/graphql", query, {
            studentName: `${form.studentName}`,
        }).then((data) => console.log(data));
    };
    return (
        <Container>
            <div>
                <h1>Enrollment List</h1>
            </div>
            <Form name="StudentEntry" onSubmit={handleSubmit}>
                <Form.Group as={Row} className="mb-3" controlId="text">
                    <Col sm="9">
                        <Form.Control
                            type="text"
                            placeholder="Enter Student Name"
                            onChange={(e) => setField("name", e.target.value)}
                        />
                    </Col>
                    <Col sm="3">
                        <Button variant="primary" type="submit">
                            Search
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>Enrollment ID</th>
                        <th>Student ID</th>
                        <th>Student Name</th>
                        <th>Subject ID</th>
                        <th>Subject Name</th>
                    </tr>
                </thead>
                {enrollments.map((c) => {
                    return (
                        <tbody>
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.studentId}</td>
                                <td>{c.studentName}</td>
                                <td>{c.subjectId}</td>
                                <td>{c.subjectName}</td>
                            </tr>
                        </tbody>
                    );
                })}
            </Table>
        </Container>
    );
}
