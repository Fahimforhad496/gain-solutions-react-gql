import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import Home from "./Home";
import StudentEntry from "./StudentEntry";
import StudentList from "./StudentList";
import SubjectEntry from "./SubjectEntry";
import Enrollment from "./EnrollmentList";
import StudentsWithSubjectsList from "./StudentsWithSubjects";
const NavbarComp = () => {
    return (
        <Router>
            <div>
                <Navbar bg="dark" variant={"dark"}>
                    <Container>
                        <Navbar.Brand as={Link} to={"/"}>
                            GQL React App
                        </Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/"}>
                                Home
                            </Nav.Link>
                            <Nav.Link as={Link} to={"/student-entry"}>
                                Student Entry
                            </Nav.Link>
                            <Nav.Link as={Link} to={"/student-list"}>
                                Student List
                            </Nav.Link>
                            <Nav.Link as={Link} to={"/subject-entry"}>
                                Subject Entry
                            </Nav.Link>
                            <Nav.Link as={Link} to={"/enrollment"}>
                                Enrollment
                            </Nav.Link>
                            <Nav.Link as={Link} to={"/enrollment-list"}>
                                Enrollment List
                            </Nav.Link>
                            <Nav.Link as={Link} to={"/students-with-subjects"}>
                                Student With Subjects
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
            </div>
            <div>
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    <Route path="/student-entry">
                        <StudentEntry />
                    </Route>
                    <Route path="/student-list">
                        <StudentList />
                    </Route>
                    <Route path="/subject-entry">
                        <SubjectEntry />
                    </Route>
                    <Route path="/enrollment">
                        <Enrollment />
                    </Route>
                    <Route path="/enrollment-list">
                        <Enrollment />
                    </Route>
                    <Route path="/students-with-subjects">
                        <StudentsWithSubjectsList />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default NavbarComp;
