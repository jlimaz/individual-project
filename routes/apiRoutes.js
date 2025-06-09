const express = require('express');
const router = express.Router();

const user = require('../controllers/userController');
const category = require('../controllers/categoryController');
const state = require('../controllers/stateController');
const task = require('../controllers/taskController');
const userTask = require('../controllers/userTaskController');

// Users
router.post('/users', user.createUser);
router.get('/users', user.listUsers);
router.put('/users/:id', user.updateUser);
router.delete('/users/:id', user.deleteUser);

// Categories
router.post('/categories', category.createCategory);
router.get('/categories', category.listCategories);
router.put('/categories/:id', category.updateCategory);
router.delete('/categories/:id', category.deleteCategory);

// States
router.post('/states', state.createState);
router.get('/states', state.listStates);
router.put('/states/:id', state.updateState);
router.delete('/states/:id', state.deleteState);

// Tasks
router.post('/tasks', task.criarTarefa);
router.get('/tasks', task.listarTarefas);
router.put('/tasks/:id', task.editarTarefa);
router.delete('/tasks/:id', task.excluirTarefa);

// Update only the state of a task
const taskModel = require('../models/taskModel');
router.post('/tasks/:id/state', async (req, res) => {
  try {
    console.log('Updating task', req.params.id, 'to state', req.body.state_id);
    const { state_id } = req.body;
    const { id } = req.params;
    const updated = await taskModel.updateTaskState(id, state_id);
    if (!updated) return res.status(404).json({ message: 'Tarefa não encontrada' });
    res.json({ success: true });
  } catch (err) {
    console.error('Error updating state:', err);
    res.status(500).json({ error: err.message });
  }
});

// UserTask
router.post('/usertasks', userTask.createUserTask);
router.get('/usertasks', userTask.listUserTasks);
router.delete('/usertasks/:id', userTask.deleteUserTask);

module.exports = router;
