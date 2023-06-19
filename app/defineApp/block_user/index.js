const { db } = require('../../db');

function blocked_user(app) {
  app.get('/blocked/users', (req, res) => {
    const body = req.body;
    if (typeof body !== 'object' || !('user_id' in body) || !('clientAddress' in body))
      return res.sendStatus(400);

    db.all(`SELECT * FROM blocked_users WHERE by_user = (SELECT user_id FROM users_addresses WHERE clientAddress = ? AND user_id = ? LIMIT 1);`,
      [body['clientAddress'], body['user_id']], (err, rows) => {
        res.json(rows);
      });
  });
}

module.exports = blocked_user;