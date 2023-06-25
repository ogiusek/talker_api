const { db } = require('../../db');
const { clients } = require('../../defineSocket');
const { auth_user } = require('../../utils');

function messeage(app) {
  app.get('/messeages', (req, res) => {
    const body = req.body;
    if (typeof body !== 'object' || !('user_id' in body) || !('clientAddress' in body) || !('with_id' in body))
      return res.sendStatus(400);

    auth_user(body.clientAddress, body, () => {
      db.all(`SELECT * FROM messeages 
        WHERE (from_user = ? AND to_user = ?) OR (to_user = ? AND from_user = ?);`,
        [body.user_id, body.with_id, body.with_id, body.user_id], (err, rows) => {
          if (err) return;
          res.json(rows);
        });
    });
  });
}

module.exports = messeage;