import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
const StudentEntry = () => {
    const [form, setForm] = useState({});
    const setField = (field, value) => {
        setForm({ ...form, [field]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // const { name, email, phone } = e;
        // const student = {
        //     name,
        //     email,
        //     phone
        // };
        console.log(form);
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
                                onChange={(e) => setField('name',e.target.value)}
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
                                onChange={(e) => setField('email',e.target.value)}
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
                                onChange={(e) => setField('phone',e.target.value)}
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
