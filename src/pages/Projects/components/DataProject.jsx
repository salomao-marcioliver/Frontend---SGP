import { Link } from "react-router-dom";
import styled from 'styled-components'
import { FaTrash, FaEdit } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { api } from "../../../services/api";

const Table = styled.table`
  width: 100%;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  max-width: 1120px;
  margin: 20px auto;
  word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;

export const Tr = styled.tr``;

export const Th = styled.th`
  text-align: start;
  border-bottom: inset;
  padding-bottom: 5px;
`;

export const Td = styled.td`
  padding-top: 15px;
`;

const Data = ({ projects, setProjects, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await api
      .delete("/projetos/" + id)
      .then(({ data }) => {
        const newArray = projects.filter((p) => p.codprojeto !== id);
        setProjects(newArray);
        toast.success(data)
      }).catch(({ data }) => {
        toast.error(data)
      });
    setOnEdit(null)
  }

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Titulo</Th>
            <Th>Data de Início</Th>
            <Th>Data de Término</Th>
            <Th>Coordenador(a)</Th>
            <Th>Instituto(a)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.map((item, i) => (
            <Tr key={i}>
              <Td>{item.codprojeto}</Td>
              <Td>{item.titulo}</Td>
              <Td>{item.data_inicio}</Td>
              <Td>{item.data_termino}</Td>
              <Td>{item.nome_coord}</Td>
              <Td>{item.instituto_coord}</Td>
              <Td>
                <FaTrash onClick={() => handleDelete(item.codprojeto)} />
                <FaEdit onClick={() => handleEdit(item)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Link to="/">Ir para Home</Link>
    </>
  )
}

export default Data;