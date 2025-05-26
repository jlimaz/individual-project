const pool = require('../config/db');

exports.createUser = async (req, res) => {
  const { name, email, password_hash, profile_photo } = req.body;

  const query = `
    INSERT INTO "Users" (name, email, password_hash, profile_photo)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [name, email, password_hash, profile_photo];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.listUsers = async (req, res) => {
  const query = 'SELECT * FROM "Users"';

  try {
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password_hash, profile_photo } = req.body;

  const query = `
    UPDATE "Users"
    SET name = $1, email = $2, password_hash = $3, profile_photo = $4
    WHERE id = $5 RETURNING *`;
  const values = [name, email, password_hash, profile_photo, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM "Users" WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
