import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Container } from "react-bootstrap";
import { request, gql } from "graphql-request";

const Home = () => {
    const [subjects, setSubjects] = useState([]);
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
            setSubjects(data.subjectsWithStudents)
        );
    }, []);
    const label = subjects.map((x) => x.name);
    const countStudent = subjects.map((x) => {
        return x.students.length;
    });

    const data = {
        labels: label,
        datasets: [
            {
                label: "Number of students in each subject",
                data: countStudent,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 2,
            },
        ],
    };
    return (
        <>
            <div className="header">
                <h1 className="title">📊 Bar Chart</h1>
                <div className="links"></div>
            </div>
            <Container>
                <Bar data={data} height={150} />
            </Container>
        </>
    );
};

export default Home;
