import { useState, useEffect } from "react"
import DataProject from './components/DataProject'
import { api } from '../../services/api'
import styled from "styled-components"
import Form from "./components/Form"

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto 0 auto;
  gap: 10px;
`;

const Title = styled.h2``;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [onEdit, setOnEdit] = useState(null)

  useEffect(() => {
    api
      .get('/projetos')
      .then((response) => setProjects(response.data))
      .catch((err) => {
        console.log(api.defaults.headers.Authorization)
        console.log(err)
      })
  }, [projects])

  return (
    <Container>
      <Title>Projetos</Title>
      <Form onEdit={onEdit} setOnEdit={setOnEdit}/>
      <DataProject projects={projects} setProjects={setProjects} setOnEdit={setOnEdit}/>
    </Container>
  )

}

export default Projects

