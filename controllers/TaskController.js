const pool = require('../config/db');

// Criar uma nova tarefa
exports.criarTarefa = async (req, res) => {
  const { title, description, due_date, priority, category_id, state_id, supertask_id } = req.body;

  const query = `
    INSERT INTO "Tasks" (title, description, due_date, priority, category_id, state_id, supertask_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
  const values = [title, description, due_date, priority, category_id, state_id, supertask_id];

  try {
    const result = await pool.query(query, values);
    const task = result.rows[0];
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tarefas
exports.listarTarefas = async (req, res) => {
  const query = 'SELECT * FROM "Tasks" ORDER BY id ASC';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma tarefa
exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, priority, category_id, state_id, supertask_id } = req.body;

  const query = `
    UPDATE "Tasks"
    SET title = $1,
        description = $2,
        due_date = $3,
        priority = $4,
        category_id = $5,
        state_id = $6,
        supertask_id = $7,
        created_at = CURRENT_TIMESTAMP
    WHERE id = $8
    RETURNING *`;
  const values = [title, description, due_date, priority, category_id, state_id, supertask_id, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM "Tasks" WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
