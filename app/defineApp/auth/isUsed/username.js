import db from "../../../db/db.js";

function username(app) {
  app.get('/isUsed/username', (req, res) => {
    const query = req.query;
    if (typeof query !== 'object' || !('username' in query))
      return res.sendStatus(400);

    db.all(`SELECT CASE WHEN
      (SELECT COUNT(*) FROM users WHERE username = ?) > 0 OR 
      (SELECT COUNT(*) FROM unconfirmed_users WHERE username = ?) > 0
        THEN 1
        ELSE 0
    END AS res;`, [query.username, query.username], (err, rows) => {
      if (!err) return res.json({ res: rows[0].res });
      res.sendStatus(400);
    });
  });
}

export default username;