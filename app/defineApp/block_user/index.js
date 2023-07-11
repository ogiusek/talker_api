import db from '../../db/db.js';

function blocked_user(app) {
  app.get('/blocked/users', (req, res) => {
    const query = req.query;
    if (typeof query !== 'object' || !('user_id' in query) || !('clientAddress' in query))
      return res.sendStatus(400);

    db.all(`SELECT * FROM blocked_users WHERE by_user = (SELECT user_id FROM users_addresses WHERE clientAddress = ? AND user_id = ? LIMIT 1);`,
      [query['clientAddress'], query['user_id']], (err, rows) => {
        res.json(rows);
      });
  });
}

export default blocked_user;