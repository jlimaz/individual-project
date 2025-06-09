const pool = require('../config/db');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  const { name, email, password, profile_photo } = req.body;
  const password_hash = await bcrypt.hash(password, 10);

  const query = `
    INSERT INTO "Users" (name, email, password_hash, profile_photo)
    VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [name, email, password_hash, profile_photo];

  try {
    await pool.query(query, values);
    // Se for chamada por API, retorna JSON
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.status(201).json({ message: 'Usuário criado com sucesso' });
    }
    // Se for chamada por formulário, não faz nada (será redirecionado na rota)
  } catch (err) {
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
      return res.status(500).json({ error: err.message });
    }
    return res.redirect('/create-account?error=1');
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

// Login handler
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM "Users" WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      // User not found
      return res.redirect('/login?error=1');
    }
    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      // Password does not match
      return res.redirect('/login?error=1');
    }
    // Login successful, set session or JWT here
    req.session.userId = user.id; // If using express-session
    return res.redirect('/'); // Redirect to dashboard or home
  } catch (err) {
    return res.redirect('/login?error=1');
  }
};
