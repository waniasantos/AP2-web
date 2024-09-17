import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import alunoService from '../services/alunoService';

function AlunoListPorCurso() {
  const [alunos, setAlunos] = useState({});
  const [colorirLinhas, setColorirLinhas] = useState(false);

  useEffect(() => {
    fetchAlunos();
  }, []);

  const fetchAlunos = async () => {
    const data = await alunoService.getAllAlunos();
    const groupedByCurso = data.reduce((acc, aluno) => {
      const curso = aluno.curso;
      if (!acc[curso]) acc[curso] = [];
      acc[curso].push(aluno);
      return acc;
    }, {});
    setAlunos(groupedByCurso);
  };

  const toggleColorirLinhas = () => {
    setColorirLinhas(!colorirLinhas);
  };

  const getRowClass = (ira) => {
    if (!colorirLinhas) return '';
    return parseFloat(ira) >= parseFloat(7)
      ? 'table-primary'
      : 'table-light';
  };

  return (
    <div>
      <h2>Alunos Agrupados por Curso</h2>
      <button onClick={toggleColorirLinhas} className="btn btn-info mb-3">
        {colorirLinhas ? 'Remover Cores' : 'Colorir por IRA'}
      </button>
      {Object.keys(alunos).map(curso => (
        <div key={curso} className="mb-4">
          <h3>{curso}</h3>
          <Table bordered hover className={colorirLinhas ? '' : 'table-striped'}>
            <thead className="table-light">
              <tr>
                <th colSpan="2"><strong>Nome</strong></th>
                <th colSpan="2"><strong>IRA</strong></th>
              </tr>
            </thead>
            <tbody>
              {alunos[curso].map(aluno => (
                <tr key={aluno.id} className={getRowClass(aluno.ira)}>
                  <td colSpan="2">{aluno.nome}</td>
                  <td colSpan="2">{aluno.ira}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ))}
    </div>
  );
}

export default AlunoListPorCurso;
