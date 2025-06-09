const express = require('express');
const router = express.Router();
const path = require('path');
const taskModel = require('../models/taskModel');
const pool = require('../config/db');

// Roteamento para páginas dinâmicas
router.get('/login', (req, res) => {
  res.render(path.join(__dirname, '../views/pages/login'), {
    pageTitle: 'Página Inicial',
  });
});

router.get('/', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }

  // Busca as tasks do usuário logado
  const userId = req.session.userId;
  // Busca as tasks associadas ao usuário
  const userTasksQuery = `
    SELECT t.*
    FROM "Tasks" t
    INNER JOIN "UserTask" ut ON ut.task_id = t.id
    WHERE ut.user_id = $1
    ORDER BY t.id ASC
  `;
  const { rows: tasks } = await pool.query(userTasksQuery, [userId]);

  // Separe as tasks por estado (A FAZER, FAZENDO, FEITO)
  const columns = {
    'A FAZER': [],
    'FAZENDO': [],
    'FEITO': []
  };
  tasks.forEach(task => {
    if (task.state_id === 1) columns['A FAZER'].push(task);
    else if (task.state_id === 2) columns['FAZENDO'].push(task);
    else if (task.state_id === 3) columns['FEITO'].push(task);
  });

  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Página Inicial',
    content: path.join(__dirname, '../views/pages/home'),
    activePage: 'home',
    columns // passa as tasks separadas por coluna
  });
});

router.get('/about', (req, res) => {
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Página Inicial',
    content: path.join(__dirname, '../views/pages/page2')
  });
});

router.get('/create-account', (req, res) => {
  res.render(path.join(__dirname, '../views/pages/create-account'));
});

router.get('/create-task', (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  res.render(path.join(__dirname, '../views/layout/main'), {
    pageTitle: 'Criar Tasky',
    content: path.join(__dirname, '../views/pages/create-task'),
    activePage: 'create-task'
  });
});

router.post('/create-task', async (req, res) => {
  if (!req.session.userId) {
    return res.redirect('/login');
  }
  try {
    const { title, description, due_date, priority } = req.body;
    // Ajuste os valores padrão conforme necessário
    const category_id = 1; // ou outro valor padrão
    const state_id = 1; // "A FAZER"
    const supertask_id = null;

    // Cria a task
    const task = await taskModel.createTask({
      title,
      description,
      due_date,
      priority,
      category_id,
      state_id,
      supertask_id
    });

    // Associa a task ao usuário
    await pool.query(
      'INSERT INTO "UserTask" (user_id, task_id) VALUES ($1, $2)',
      [req.session.userId, task.id]
    );

    res.redirect('/');
  } catch (err) {
    res.status(500).send('Erro ao criar task: ' + err.message);
  }
});

// Adicione outras rotas conforme necessário

module.exports = router;
