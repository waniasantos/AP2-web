import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import alunoService from '../services/alunoService';

function AlunoList() {
  const [alunos, setAlunos] = useState([]);
  const [filteredAlunos, setFilteredAlunos] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    const data = await alunoService.getAllAlunos();
    setAlunos(data);
    setFilteredAlunos(data);
  };

  const handleDelete = async (id) => {
    await alunoService.deleteAluno(id);
    fetchAlunos();
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    if (selectedValue === "1") {
      const filteredList = alunos.filter(aluno => aluno.ira > 7);
      setFilteredAlunos(filteredList);
    } else {
      setFilteredAlunos(alunos);
    }
  };

  return (
    <div>
      <h2>Lista de Alunos</h2>
      <select id="aluno-select" value={selectedOption} onChange={handleSelectChange}>
        <option value="">Selecione...</option>
        <option value="1">Média maior que 7</option>
        <option value="2">Todos os alunos</option>
      </select>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Curso</th>
            <th>IRA</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlunos.map((aluno) => (
            <tr key={aluno.id}>
              <td>{aluno.nome}</td>
              <td>{aluno.curso}</td>
              <td>{aluno.ira}</td>
              <td>
                <Link to={`/alunos/editar/${aluno.id}`} className="btn btn-sm btn-primary mr-2">Editar</Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(aluno.id)}>Excluir</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AlunoList;