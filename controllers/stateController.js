const pool = require('../config/db');

exports.createState = async (req, res) => {
  const { name } = req.body;

  const query = 'INSERT INTO "States" (name) VALUES ($1) RETURNING *';
  const values = [name];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listStates = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "States"');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateState = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const query = 'UPDATE "States" SET name = $1 WHERE id = $2 RETURNING *';
  const values = [name, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Estado não encontrado' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteState = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM "States" WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Estado não encontrado' });
    res.status(200).json({ message: 'Estado excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
