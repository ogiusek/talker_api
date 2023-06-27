const { db } = require('../../db');
const { auth_user } = require('../../utils');

function contacts(app) {
  app.get('/contacts', (req, res) => {
    const body = req.query;
    if (typeof body !== 'object' || !('user_id' in body) || !('clientAddress' in body))
      return res.sendStatus(400);

    auth_user(body.clientAddress, body, () => {
      db.all(`SELECT DISTINCT (CASE WHEN m.from_user > m.to_user THEN
        m.from_user || ',' || m.to_user ELSE
        m.to_user || ',' || m.from_user END) AS bab,

          u.id, u.avatar, u.username, m.content_type, m.content, m.from_user
        FROM messeages AS m 
        INNER JOIN users AS u ON m.from_user = u.id OR m.to_user = u.id 
        WHERE u.id != ? AND (m.from_user = ? OR m.to_user = ?) ORDER BY m.id DESC;`,
        [body.user_id, body.user_id, body.user_id], (err, rows) => {

          if (err) return console.log(err) || res.sendStatus(400);
          const dRows = Object.values(rows.reduce((acc, obj) => {
            if (!acc[obj.bab]) {
              acc[obj.bab] = { ...obj };
              delete acc[obj.bab].bab;
            }
            return acc;
          }, {}));

          res.json(dRows);
          res.end();
        });
    }, () => { res.sendStatus(400); });
  });
}
module.exports = contacts;