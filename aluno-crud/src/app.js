const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const alunoRoutes = require('./routes/alunoRoutes');

const app = express();

app.use(cors());  
app.use(bodyParser.json());
app.use('/alunos', alunoRoutes);

module.exports = app;