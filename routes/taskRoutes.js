const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/TaskController');

// Criar uma nova tarefa
router.post('/', TaskController.criarTarefa);

// Listar todas as tarefas
router.get('/', TaskController.listarTarefas);

// Editar uma tarefa pelo ID
router.put('/:id', TaskController.editarTarefa);

// Excluir uma tarefa pelo ID
router.delete('/:id', TaskController.excluirTarefa);

module.exports = router;
