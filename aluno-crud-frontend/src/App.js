import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import AlunoList from './components/AlunoList';
import AlunoForm from './components/AlunoForm';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<h1>Bem-vindo ao Sistema de Alunos</h1>} />
          <Route path="/alunos" element={<AlunoList />} />
          <Route path="/alunos/novo" element={<AlunoForm />} />
          <Route path="/alunos/editar/:id" element={<AlunoForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;