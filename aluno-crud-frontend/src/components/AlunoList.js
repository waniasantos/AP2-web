import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import alunoService from '../services/alunoService';

function AlunoList() {
  const [filteredAlunos, setFilteredAlunos] = useState([]);
  const [mediaIRA, setMediaIRA] = useState(0);
  const [colorirLinhas, setColorirLinhas] = useState(false);

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    const data = await alunoService.getAllAlunos();
    setFilteredAlunos(data);
    calcularMediaIRA(data);
  };

  const calcularMediaIRA = (alunosData) => {
    let soma = 0;
    for (let aluno of alunosData){
      console.log(aluno + " - " + soma)
      soma += Number(aluno.ira)
    }
    const media = soma / alunosData.length;
    setMediaIRA(media.toFixed(2));
  };

  const handleDelete = async (id) => {
    await alunoService.deleteAluno(id);
    fetchAlunos();
  };


  const toggleColorirLinhas = () => {
    setColorirLinhas(!colorirLinhas);
  };

  const getRowClass = (ira) => {
    if (!colorirLinhas) return '';
    return parseFloat(ira) >= parseFloat(7)
      ? 'table-primary'
      : 'table-danger';
  };

  return (
    <div>
      <h2>Lista de Alunos</h2>
      <div className="mb-3">
        <Button variant="info" onClick={toggleColorirLinhas} className="mt-2">
          {colorirLinhas ? 'Remover Cores' : 'Colorir por Média'}
        </Button>
      </div>
      <Table bordered hover className={colorirLinhas ? '' : 'table-striped'}>
        <thead className="table-light">
          <tr>
            <th>Nome</th>
            <th>Curso</th>
            <th>IRA</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAlunos.map((aluno) => (
            <tr key={aluno.id} className={getRowClass(aluno.ira)}>
              <td>{aluno.nome}</td>
              <td>{aluno.curso}</td>
              <td>{aluno.ira}</td>
              <td>
                <Link to={`/alunos/editar/${aluno.id}`} className="btn btn-sm btn-primary me-2">Editar</Link>
                <Button variant="danger" size="sm" onClick={() => handleDelete(aluno.id)}>Excluir</Button>
              </td>
            </tr>
          ))}
          <tr className="table-dark">
            <td colSpan="2"><strong>Média IRA</strong></td>
            <td colSpan="2"><strong>{mediaIRA}</strong></td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default AlunoList;