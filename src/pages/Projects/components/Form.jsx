import styled from "styled-components";
import { toast } from "react-toastify";
import { useRef } from "react";
import api from "../../../services/api";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
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



const Form = ({ coordinators }) => {
  const ref = useRef()

  const handleSubmit = async (e) => {
    e.preventDefault();


    const select = document.getElementById('Coordinators');
    const value = select.options[select.selectedIndex].value;
    console.log(value)


    const project = ref.current;
    if (!project.titulo.value || !project.data_inicio.value || !project.data_fim.value) {
      return toast.warn("Preencha todos os campos!");
    }

    

    await api
      .post("http://localhost:8800", {
        titulo: project.titulo.value,
        data_inicio: project.data_inicio.value,
        data_fim: project.data_fim.value
      })
      .then(({ data }) => toast.success(data))
      .catch(({ data }) => toast.error(data));

  }


  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Titulo</Label>
        <Input name="titulo" />
      </InputArea>
      <InputArea>
        <Label>Data de Início</Label>
        <Input name="data_inicio" type="date" />
      </InputArea>
      <InputArea>
        <Label>Data de Término</Label>
        <Input name="data_fim" type="date" />
      </InputArea>
      <InputArea>
        <Label>Coodenador(a)</Label>
        <Select id="Coordinators" defaultValue={'Escolha'}>
          {coordinators.map((item, i) => (
            <option key={i} name='' >{item.nome}</option>
          ))}
        </Select>
      </InputArea>


      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};


export default Form;