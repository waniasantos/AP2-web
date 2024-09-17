const express = require('express');
const alunoController = require('../controllers/alunoController');

const router = express.Router();

router.get('/', alunoController.getAllAlunos);
router.get('/:id', alunoController.getAlunoById);
router.post('/', alunoController.createAluno);
router.put('/:id', alunoController.updateAluno);
router.delete('/:id', alunoController.deleteAluno);

module.exports = router;