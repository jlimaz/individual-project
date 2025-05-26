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

// UserTask
router.post('/usertasks', userTask.createUserTask);
router.get('/usertasks', userTask.listUserTasks);
router.delete('/usertasks/:id', userTask.deleteUserTask);

module.exports = router;
