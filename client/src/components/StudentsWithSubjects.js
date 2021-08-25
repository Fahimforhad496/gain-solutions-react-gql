import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { request, gql } from "graphql-request";

const StudentsWithSubjectsList = () => {
    const [studentsWithSubjects, setStudentsWithSubjects] = useState([]);
    const subjects = [studentsWithSubjects.map((s) => s.subjects.map((sub) => sub.subjectName))];
    console.log("subjects", subjects);
    useEffect(() => {
        const query = gql`
            {
                studentsWithSubjects {
                    id
                    name
                    email
                    phone
                    dateOfBirth
                    subjects {
                        subjectName
                    }
                }
            }
        `;
        request("http://localhost:8000/graphql", query).then((data) =>
            setStudentsWithSubjects(data.studentsWithSubjects)
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
                        <th>Subjects</th>
                    </tr>
                </thead>
                {studentsWithSubjects.map((c) => {
                    console.log(c);                                                                                
                    const elements = c.subjects.map(x => x.subjectName);                                        
                    const subs = elements.join();
                    return (
                        <tbody>
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.email}</td>
                                <td>{c.phone}</td>
                                <td>{c.dateOfBirth}</td>
                                <td>
                                    {subs}
                                </td>
                            </tr>
                        </tbody>
                    );
                })}
            </Table>
        </Container>
    );
};

export default StudentsWithSubjectsList;
