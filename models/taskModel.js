const pool = require('../config/db');

exports.createTask = async (taskData) => {
  const { title, description, due_date, priority, category_id, state_id, supertask_id } = taskData;
  const query = `
    INSERT INTO "Tasks" (title, description, due_date, priority, category_id, state_id, supertask_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
  const values = [title, description, due_date, priority, category_id, state_id, supertask_id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.getAllTasks = async () => {
  const query = 'SELECT * FROM "Tasks" ORDER BY id ASC';
  const result = await pool.query(query);
  return result.rows;
};

exports.updateTask = async (id, taskData) => {
  const { title, description, due_date, priority, category_id, state_id, supertask_id } = taskData;
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
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.deleteTask = async (id) => {
  const query = 'DELETE FROM "Tasks" WHERE id = $1 RETURNING *';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

exports.updateTaskState = async (id, state_id) => {
  const query = `
    UPDATE "Tasks"
    SET state_id = $1
    WHERE id = $2
    RETURNING *`;
  const values = [state_id, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};
