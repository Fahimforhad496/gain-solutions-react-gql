import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { request, gql } from "graphql-request";

const Enrollment = () => {
    
    const [students, setStudent] = useState([]);
    const setField = (field, value) => {
        setStudent({ ...students, [field]: value });
    };

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
            setStudent(data.students)
        );
    }, []);
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("onSubmit", students);
    };
    return (
        <Container>
            <h1>Student Enrollment</h1>
            <Form name="SubjectEntry" onSubmit={onSubmit}>
                <Row>
                    <Form.Group as={Row} className="mb-3" controlId="text">
                        <Form.Label column sm="3">
                            Subject Name
                        </Form.Label>
                        <Col sm="9">
                            <Form.Select
                                aria-label="Default select example"
                                onChange={(e) =>
                                    setField("name", e.target.value)
                                }
                            >
                                {
                                    students.map((student) => {
                                        return (
                                            <option value={student.id}>
                                                {student.name}
                                            </option>
                                        );
                                    })
                                }
                            </Form.Select>
                        </Col>
                    </Form.Group>
                </Row>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default Enrollment;
