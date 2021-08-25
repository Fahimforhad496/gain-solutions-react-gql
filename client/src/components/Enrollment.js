// import React, { useState, useEffect } from "react";
// import { Form, Row, Col, Button, Container } from "react-bootstrap";
// import { request, gql } from "graphql-request";

// const Enrollment = () => {
//     const [students, setStudents] = useState([]);
//     const [subjects, setSubjects] = useState([]);
//     const setStudentsField = (field, value) => {
//         setStudents({ ...students, [field]: value });
//     };
//     const setSubjectsField = (field, value) => {
//         setSubjects({ ...subjects, [field]: value });
//     };

//     const [student, setStudent] = useState({});
//     const [subject, setSubject] = useState({});

//     useEffect(() => {
//         const query = gql`
//             {
//                 students {
//                     id
//                     name
//                     email
//                     phone
//                     dateOfBirth
//                 }
//             }
//         `;
//         request("http://localhost:8000/graphql", query).then((data) =>
//             setStudents(data.students)
//         );
//     }, []);
//     useEffect(() => {
//         const query = gql`
//             {
//                 subjects {
//                     id
//                     name
//                 }
//             }
//         `;
//         request("http://localhost:8000/graphql", query).then((data) =>
//             setSubjects(data.subjects)
//         );
//     }, []);
//     const onSubmit = (e) => {
//         e.preventDefault();
//         console.log("onSubmit", students);
//     };
//     return (
//         <Container>
//             <h1>Student Enrollment</h1>
//             <Form name="SubjectEntry" onSubmit={onSubmit}>
//                 <Row>
//                     <Form.Group as={Row} className="mb-3" controlId="text">
//                         <Form.Label column sm="3">
//                             Student Name
//                         </Form.Label>
//                         <Col sm="9">
//                             <Form.Select
//                                 aria-label="Default select example"
//                                 onChange={(e) =>
//                                     setStudentsField("name", e.target.value)
//                                 }
//                             >
//                                 {students.map((student) => {
//                                     return (
//                                         <option
//                                             value={student.id}
//                                             onChange={(c) => {
//                                                 setStudent(
//                                                     "student",
//                                                     c.target.value
//                                                 );
//                                             }}
//                                         >
//                                             {student.name}
//                                         </option>
//                                     );
//                                 })}
//                             </Form.Select>
//                         </Col>
//                         <Form.Label column sm="3">
//                             Subject Name
//                         </Form.Label>
//                         <Col sm="9">
//                             <Form.Select
//                                 aria-label="Default select example"
//                                 onChange={(e) =>
//                                     setSubjectsField("name", e.target.value)
//                                 }
//                             >
//                                 {subjects.map((subject) => {
//                                     return (
//                                         <option
//                                             value={subject.id}
//                                             onChange={(c) =>
//                                                 setSubject(
//                                                     "subject",
//                                                     c.target.value
//                                                 )
//                                             }
//                                         >
//                                             {subject.name}
//                                         </option>
//                                     );
//                                 })}
//                             </Form.Select>
//                         </Col>
//                     </Form.Group>
//                 </Row>
//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>
//             </Form>
//         </Container>
//     );
// };

// export default Enrollment;
