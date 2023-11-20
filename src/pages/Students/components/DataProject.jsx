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
  max-width: 1220px;
  margin: 20px auto;
  word-break: break-all;
  text-align: center;
`;

export const Thead = styled.thead`
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
`;

export const Th = styled.th`
  text-align: center;
  border-bottom: inset;
  padding: 0 10px 5px 10px;
  word-break: keep-all;
`;

export const Td = styled.td`
  padding-top: 15px;
  text-align: center;
  word-break: keep-all;
  min-width: 60px;
`;

const StyledTrashIcon = styled(FaTrash)`
  cursor: pointer;
  padding: 0 5px 0 5px;
`;

const StyledEditIcon = styled(FaEdit)`
  cursor: pointer;
  padding: 0 5px 0 5px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  background-color: #FFF;
  margin-bottom: 20px;
  border-radius: 20px;
  padding: 10px;
`;



const Data = ({ students, setStudents, setOnEdit }) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    await api
      .delete("/bolsistas/" + id)
      .then(({ data }) => {
        const newArray = students.filter((p) => p.num_matricula !== id);
        setStudents(newArray);
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
            <Th>Matrícula</Th>
            <Th>Nome</Th>
            <Th>Curso</Th>
            <Th>Instituto</Th>
            <Th>ID - Título do Projeto</Th>
            <Th>Coordenador(a)</Th>
          </Tr>
        </Thead>
        <Tbody>
          {students.map((item, i) => (
            <Tr key={i}>
              <Td>{item.num_matricula}</Td>
              <Td>{item.nome}</Td>
              <Td>{item.curso}</Td>
              <Td>{item.instituto}</Td>
              <Td>{item.codprojeto} - {item.titulo}</Td>
              <Td>{item.nome_coord}</Td>
              <Td>
                <StyledEditIcon onClick={() => handleEdit(item)} />
                <StyledTrashIcon onClick={() => handleDelete(item.num_matricula)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <StyledLink to="/">Ir para Home</StyledLink>
    </>
  )
}

export default Data;