const pool = require('../config/db');

exports.createUserTask = async (req, res) => {
  const { task_id, user_id } = req.body;

  const query = `
    INSERT INTO "UserTask" (task_id, user_id) 
    VALUES ($1, $2) RETURNING *`;
  const values = [task_id, user_id];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listUserTasks = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "UserTask"');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUserTask = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM "UserTask" WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Associação não encontrada' });
    res.status(200).json({ message: 'Associação excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
