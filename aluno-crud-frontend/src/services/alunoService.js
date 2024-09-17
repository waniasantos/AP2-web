import axios from 'axios';

const API_URL = 'http://localhost:3000/alunos';

const alunoService = {
  getAllAlunos: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar alunos:', error);
      throw error;
    }
  },

  getAlunoById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar aluno com id ${id}:`, error);
      throw error;
    }
  },

  createAluno: async (aluno) => {
    try {
      const response = await axios.post(API_URL, aluno);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
      throw error;
    }
  },

  updateAluno: async (id, aluno) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, aluno);
      return response.data;
    } catch (error) {
      console.error(`Erro ao atualizar aluno com id ${id}:`, error);
      throw error;
    }
  },

  deleteAluno: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
      console.error(`Erro ao deletar aluno com id ${id}:`, error);
      throw error;
    }
  }
};

export default alunoService;