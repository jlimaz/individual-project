const pool = require('../config/db');

exports.createComment = async (req, res) => {
  const { task_id, user_id, message } = req.body;

  const query = `
    INSERT INTO "Comments" (task_id, user_id, message) 
    VALUES ($1, $2, $3) RETURNING *`;
  const values = [task_id, user_id, message];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listComments = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Comments"');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM "Comments" WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Comentário não encontrado' });
    res.status(200).json({ message: 'Comentário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
