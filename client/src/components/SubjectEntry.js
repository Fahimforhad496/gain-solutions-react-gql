import React from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
const SubjectEntry = () => {
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('onSubmit',e);
    }
    return (
        <Container>
            <h1>Subject Entry</h1>
            <Form onSubmit={onSubmit}>
                <Row>
                    <Form.Group as={Row} className="mb-3" controlId="text">
                        <Form.Label column sm="3">
                            Subject Name
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control
                                type="text"
                                placeholder="Subject Name"
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

export default SubjectEntry;
