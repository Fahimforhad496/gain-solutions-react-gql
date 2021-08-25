import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { request, gql } from "graphql-request";

const SubjectsWithStudents = () => {
    const [subjectsWithStudents, setSubjectsWithStudents] = useState([]);

    useEffect(() => {
        const query = gql`
            {
                subjectsWithStudents {
                    id
                    name
                    students {
                        studentName
                    }
                }
            }
        `;

        request("http://localhost:8000/graphql", query).then((data) => 
            setSubjectsWithStudents(data.subjectsWithStudents)
        );
    }, []);
    return (
        <Container>
            <div>
                <h1>Subject with Students</h1>
            </div>
            <Table striped bordered hover variant="light">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Students</th>
                    </tr>
                </thead>
                {subjectsWithStudents.map((c) => {
                    console.log(c);
                    const elements = c.students.map((x) => x.studentName);
                    const subs = elements.join();
                    return (
                        <tbody>
                            <tr key={c._id}>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{subs}</td>
                            </tr>
                        </tbody>
                    );
                })}
            </Table>
        </Container>
    );
};

export default SubjectsWithStudents;
