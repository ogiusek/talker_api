const { db } = require('../../db');
const { auth_user } = require('../../utils');

const messeagesLimit = 20;

function messeage(app) {
  app.get('/messeages', (req, res) => {
    const query = req.query;
    const from_messeage = 'from_messeage' in query ? 'AND id <= ' + (query.from_messeage) : '';
    if (typeof query !== 'object' || !('user_id' in query) || !('clientAddress' in query) || !('with_id' in query))
      return res.sendStatus(400);

    auth_user(query.clientAddress, query, () => {
      db.all(`SELECT SUM(id) AS total FROM messeages 
      WHERE (from_user = ? AND to_user = ?) OR (to_user = ? AND from_user = ?);`,
        [query.user_id, query.with_id, query.with_id, query.user_id], (err, row) => {

          db.all(`SELECT * FROM messeages 
            WHERE ((from_user = ? AND to_user = ?) OR (to_user = ? AND from_user = ?)) ${from_messeage}
            ORDER BY init_date DESC LIMIT ${messeagesLimit};`,
            [query.user_id, query.with_id, query.with_id, query.user_id], (err, rows) => {

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