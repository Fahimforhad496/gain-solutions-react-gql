import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { request, gql } from "graphql-request";

export default function EnrollmentList() {
    const [enrollments, setEnrollments] = useState([]);

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

    return (
        <Container>
            <div>
                <h1>Enrollment List</h1>
            </div>
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
                            <tr key={c._id}>
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
