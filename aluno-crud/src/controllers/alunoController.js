const alunoService = require('../services/alunoService');

class AlunoController {
  async getAllAlunos(req, res) {
    try {
      const alunos = await alunoService.getAllAlunos();
      res.json(alunos);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar alunos' });
    }
  }

  async getAlunoById(req, res) {
    try {
      const aluno = await alunoService.getAlunoById(req.params.id);
      if (aluno) {
        res.json(aluno);
      } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao buscar aluno' });
    }
  }

  async createAluno(req, res) {
    try {
      const novoAluno = await alunoService.createAluno(req.body);
      res.status(201).json(novoAluno);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar aluno' });
    }
  }

  async updateAluno(req, res) {
    try {
      const alunoAtualizado = await alunoService.updateAluno(req.params.id, req.body);
      if (alunoAtualizado) {
        res.json(alunoAtualizado);
      } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar aluno' });
    }
  }

  async deleteAluno(req, res) {
    try {
      const sucesso = await alunoService.deleteAluno(req.params.id);
      if (sucesso) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Aluno não encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar aluno' });
    }
  }
}

module.exports = new AlunoController();