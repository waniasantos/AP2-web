const fs = require('fs').promises;
const path = require('path');
const Aluno = require('../models/aluno');

const dataPath = path.join(__dirname, '../data/alunos.json');

class AlunoService {
  async getAllAlunos() {
    const data = await fs.readFile(dataPath, 'utf8');
    return JSON.parse(data);
  }

  async getAlunoById(id) {
    const alunos = await this.getAllAlunos();
    return alunos.find(aluno => aluno.id === id);
  }

  async createAluno(alunoData) {
    const alunos = await this.getAllAlunos();
    const novoAluno = new Aluno(
      Date.now().toString(),
      alunoData.nome,
      alunoData.curso,
      alunoData.ira
    );
    alunos.push(novoAluno);
    await fs.writeFile(dataPath, JSON.stringify(alunos, null, 2));
    return novoAluno;
  }

  async updateAluno(id, alunoData) {
    const alunos = await this.getAllAlunos();
    const index = alunos.findIndex(aluno => aluno.id === id);
    if (index !== -1) {
      alunos[index] = { ...alunos[index], ...alunoData };
      await fs.writeFile(dataPath, JSON.stringify(alunos, null, 2));
      return alunos[index];
    }
    return null;
  }

  async deleteAluno(id) {
    const alunos = await this.getAllAlunos();
    const filteredAlunos = alunos.filter(aluno => aluno.id !== id);
    if (filteredAlunos.length !== alunos.length) {
      await fs.writeFile(dataPath, JSON.stringify(filteredAlunos, null, 2));
      return true;
    }
    return false;
  }
}

module.exports = new AlunoService();