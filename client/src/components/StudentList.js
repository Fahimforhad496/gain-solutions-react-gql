import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { request, gql } from "graphql-request";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    useEffect(() => {
        const query = gql`
            {
                students {
                    id
                    name
                    email
                    phone
                    dateOfBirth
                }
            }
        `;
        request("http://localhost:8000/graphql", query).then((data) =>
            setStudents(data.students)
        );
    }, []);

    return (
        <Container>
            <div>
                <h1>Student List</h1>
            </div>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date of Birth</th>
                    </tr>
                </thead>
                {students.map((c) => {
                    return (
                        <tbody>
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.email}</td>
                                <td>{c.phone}</td>
                                <td>{c.dateOfBirth}</td>
                            </tr>
                        </tbody>
                    );
                })}
            </Table>
        </Container>
    );
};

export default StudentList;
