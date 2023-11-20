import { useState, useEffect } from "react"
import DataProject from './components/DataProject'
import { api } from '../../services/api'
import styled from "styled-components"
import Form from "./components/Form"

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 0 auto;
  gap: 10px;
`;

const Title = styled.h2`
  color: #FFF;
`;

const Students = () => {
  const [students, setStudents] = useState([]);
  const [onEdit, setOnEdit] = useState(null)

  useEffect(() => {
    api
      .get('/bolsistas')
      .then((response) => setStudents(response.data))
      .catch((err) => {
        console.log(api.defaults.headers.Authorization)
        console.log(err)
      })
  }, [students])

  return (
    <Container>
      <Title>Bolsistas</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit} students={students}/>
      <DataProject students={students} setStudents={setStudents} setOnEdit={setOnEdit}/>
    </Container>
  )
}

export default Students