const pool = require('../config/db');

exports.createCategory = async (req, res) => {
  const { name } = req.body;

  const query = 'INSERT INTO "Categories" (name) VALUES ($1) RETURNING *';
  const values = [name];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listCategories = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Categories"');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const query = 'UPDATE "Categories" SET name = $1 WHERE id = $2 RETURNING *';
  const values = [name, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Categoria não encontrada' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM "Categories" WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Categoria não encontrada' });
    res.status(200).json({ message: 'Categoria excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
