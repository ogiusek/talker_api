const { db } = require('../../db');
const { auth_user } = require('../../utils');

const messeagesLimit = 20;

function messeage(app) {
  app.get('/messeages', (req, res) => {
    const body = req.body;
    const from_messeage = 'from_messeage' in body ? 'AND id <= ' + (body.from_messeage) : '';
    if (typeof body !== 'object' || !('user_id' in body) || !('clientAddress' in body) || !('with_id' in body))
      return res.sendStatus(400);

    auth_user(body.clientAddress, body, () => {
      db.all(`SELECT SUM(id) AS total FROM messeages 
      WHERE (from_user = ? AND to_user = ?) OR (to_user = ? AND from_user = ?);`,
        [body.user_id, body.with_id, body.with_id, body.user_id], (err, row) => {

          db.all(`SELECT * FROM messeages 
            WHERE ((from_user = ? AND to_user = ?) OR (to_user = ? AND from_user = ?)) ${from_messeage}
            ORDER BY init_date DESC LIMIT ${messeagesLimit};`,
            [body.user_id, body.with_id, body.with_id, body.user_id], (err, rows) => {

              if (err) return;
              res.json({
                messeages: rows,
                all: row.total <= messeagesLimit
              });
            });
        });
    });
  });
}

module.exports = messeage;