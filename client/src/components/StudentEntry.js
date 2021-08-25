import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { request, gql } from "graphql-request";

const StudentEntry = () => {
    const [form, setForm] = useState({});
    const setField = (field, value) => {
        setForm({ ...form, [field]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const mutation = gql`
            mutation addStudent (
                $name: String!
                $email: String!
                $phone: String!
                $dateOfBirth: String!
            ) {
                addStudent(
                    name: $name
                    email: $email
                    phone: $phone
                    dateOfBirth: $dateOfBirth
                ) {
                    _id
                }
            }
        `;
        request(
            "http://localhost:8000/graphql",
            mutation, {
                "name": `${form.name}`, "email": `${form.email}`, "phone": `${form.phone}`, "dateOfBirth": `${form.dateOfBirth}`
            }            
        ).then((data) => console.log(data));
        
    };
    return (
        <Container>
            <h1>Student Entry</h1>
            <Form name="StudentEntry" onSubmit={handleSubmit}>
                <Row>
                    <Form.Group as={Row} className="mb-3" controlId="text">
                        <Form.Label column sm="3">
                            Name
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                placeholder="Full Name"
                                onChange={(e) =>
                                    setField("name", e.target.value)
                                }
                            />
                        </Col>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Row} className="mb-3" controlId="text">
                        <Form.Label column sm="3">
                            Email
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="email"
                                placeholder="Enter Email Address"
                                onChange={(e) =>
                                    setField("email", e.target.value)
                                }
                            />
                        </Col>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Row} className="mb-3" controlId="text">
                        <Form.Label column sm="3">
                            Phone
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                placeholder="Enter Phone Number"
                                onChange={(e) =>
                                    setField("phone", e.target.value)
                                }
                            />
                        </Col>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group as={Row} className="mb-3" controlId="text">
                        <Form.Label column sm="3">
                            Date of Birth
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="date"
                                placeholder="Date of Birth"
                                onChange={(e) =>
                                    setField("dateOfBirth", e.target.value)
                                }
                            />
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

export default StudentEntry;
