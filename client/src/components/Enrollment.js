import React, { useState } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";

const Enrollment = () => {
    const [subject, setSubject] = useState({});
    const setField = (field, value) => {
        setSubject({ ...subject, [field]: value });
    };
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("onSubmit", subject);
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
                                <option>Select Student</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
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
