import styled from "styled-components";
import { toast } from "react-toastify";
import { useRef, useEffect } from "react";
import { api } from "../../../services/api";

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  text-align: center;
  max-width: 400px;
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
  width: 160px;
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
      const student = ref.current;

      student.matricula.value = onEdit.num_matricula;
      student.nome.value = onEdit.nome;
      student.data_nasc.value = onEdit.data_nascimento;
      student.curso.value = onEdit.curso
      student.instituto.value = onEdit.instituto;
      student.codprojeto.value = onEdit.codprojeto;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const student = ref.current;
    if (
      !student.matricula.value ||
      !student.nome.value ||
      !student.curso.value ||
      !student.data_nasc.value ||
      !student.instituto.value ||
      !student.codprojeto.value
    ) {
      return alert("Preencha todos os campos!");
    }

    if (onEdit) {
      await api
        .put("/bolsistas/" + onEdit.num_matricula, {
          num_matricula: student.matricula.value,
          nome: student.nome.value,
          data_nascimento: student.data_nasc.value,
          curso: student.curso.value,
          instituto: student.instituto.value,
          codprojeto: student.codprojeto.value
        })
        .then(({ data }) => console.log(data))
        .catch(({ data }) => console.log(data));
    } else {
      await api
        .post('/bolsistas', {
          num_matricula: student.matricula.value,
          nome: student.nome.value,
          data_nascimento: student.data_nasc.value,
          curso: student.curso.value,
          instituto: student.instituto.value,
          codprojeto: student.codprojeto.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    student.matricula.value = "";
    student.nome.value = "";
    student.curso.value = "";
    student.data_nasc.value = "";
    student.instituto.value = "";
    student.codprojeto.value = "";

    setOnEdit(null);
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Matrícula</Label>
        <Input name="matricula" />
      </InputArea>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" type="text" />
      </InputArea>
      <InputArea>
        <Label>Curso</Label>
        <Input name="curso" type="text" />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="data_nasc" type="text" />
      </InputArea>
      <InputArea>
        <Label>Instituto</Label>
        <Input name="instituto" type="text" />
      </InputArea>
      <InputArea>
        <Label>Vinculado ao Projeto:</Label>
        <Input name="codprojeto" type="text" placeholder="Digite o ID do Projeto" />
      </InputArea>
      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};


export default Form;