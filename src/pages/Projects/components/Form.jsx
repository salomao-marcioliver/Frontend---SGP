import styled from "styled-components";
import { toast } from "react-toastify";
import { useRef, useEffect } from "react";
import { api } from "../../../services/api";

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  text-align: center;
  max-width: 500px;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Select = styled.select`
  width: 150px;
  color: black;
  display: flex;
`;



const Form = ({ onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const project = ref.current;

      project.titulo.value = onEdit.titulo;
      project.data_inicio.value = onEdit.data_inicio;
      project.data_termino.value = onEdit.data_termino;
      project.cod_coord.value = onEdit.codcoord
      project.nome_coord.value = onEdit.nome_coord;
      project.instituto_coord.value = onEdit.instituto_coord;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const project = ref.current;
    if (
      !project.titulo.value ||
      !project.data_inicio.value ||
      !project.data_termino.value ||
      !project.cod_coord.value ||
      !project.nome_coord.value ||
      !project.instituto_coord.value
    ) {
      return alert("Preencha todos os campos!");
    }

    if (onEdit) {
      await api
        .put("/projetos/" + onEdit.codprojeto, {
          titulo: project.titulo.value,
          data_inicio: project.data_inicio.value,
          data_termino: project.data_termino.value,
          codCoord: project.cod_coord.value,
          nome_coord: project.nome_coord.value,
          instituto_coord: project.instituto_coord.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await api
        .post('/projetos', {
          titulo: project.titulo.value,
          data_inicio: project.data_inicio.value,
          data_termino: project.data_termino.value,
          codCoord: project.cod_coord.value,
          nome_coord: project.nome_coord.value,
          instituto_coord: project.instituto_coord.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    project.titulo.value = "";
    project.data_inicio.value = "";
    project.data_termino.value = "";
    project.cod_coord.value = "";
    project.nome_coord.value = "";
    project.instituto_coord.value = "";

    setOnEdit(null);
  };


  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Titulo do Projeto</Label>
        <Input name="titulo" />
      </InputArea>
      <InputArea>
        <Label>Data de Início</Label>
        <Input name="data_inicio" type="text" />
      </InputArea>
      <InputArea>
        <Label>Data de Término</Label>
        <Input name="data_termino" type="text" />
      </InputArea>
      <InputArea>
        <Label>Cod. Identificador</Label>
        <Input name="cod_coord" type="text" />
      </InputArea>
      <InputArea>
        <Label>Nome Coordenador(a)</Label>
        <Input name="nome_coord" type="text" />
      </InputArea>
      <InputArea>
        <Label>Instituto</Label>
        <Input name="instituto_coord" type="text" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};


export default Form;