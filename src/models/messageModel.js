const pool = require('../db/pool.js');

exports.updateStatus = async (id, status) => {
  const result = await pool.query(
    'UPDATE sms_messages SET status = $1 WHERE id = $2 RETURNING *',
    [status, id]
  );
  return result.rows[0];
};

exports.getMessagesByStatus = async (status) => {
  const result = await pool.query(
    'SELECT * FROM sms_messages WHERE status = $1 AND created_at >= NOW() - INTERVAL \'24 HOURS\'',
    [status]
  );
  return result.rows;
};
