import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import alunoService from '../services/alunoService';

function AlunoForm() {
  const [aluno, setAluno] = useState({ nome: '', curso: '', ira: '' });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchAluno();
    }
  }, [id]);

  const fetchAluno = async () => {
    const data = await alunoService.getAlunoById(id);
    setAluno(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAluno({ ...aluno, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await alunoService.updateAluno(id, aluno);
    } else {
      await alunoService.createAluno(aluno);
    }
    navigate('/alunos');
  };

  return (
    <div>
      <h2>{id ? 'Editar Aluno' : 'Cadastrar Aluno'}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nome">
          <Form.Label>Nome</Form.Label>
          <Form.Control type="text" name="nome" value={aluno.nome} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="curso">
          <Form.Label>Curso</Form.Label>
          <Form.Control type="text" name="curso" value={aluno.curso} onChange={handleChange} required />
        </Form.Group>
        <Form.Group controlId="ira">
          <Form.Label>IRA</Form.Label>
          <Form.Control type="number" step="0.01" name="ira" value={aluno.ira} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">
          {id ? 'Atualizar' : 'Cadastrar'}
        </Button>
      </Form>
    </div>
  );
}

export default AlunoForm;