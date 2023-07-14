import db from "../../../db/db";

function username(app: any) {
  app.get('/isUsed/username', (req: any, res: any) => {
    const query = req.query;
    if (typeof query !== 'object' || !('username' in query))
      return res.sendStatus(400);

    db.all(`SELECT CASE WHEN
      (SELECT COUNT(*) FROM users WHERE username = ?) > 0 OR 
      (SELECT COUNT(*) FROM unconfirmed_users WHERE username = ?) > 0
        THEN 1
        ELSE 0
    END AS res;`, [query.username, query.username], (err: any, rows: any) => {
      if (!err) return res.json({ res: rows[0].res });
      res.sendStatus(400);
    });
  });
}

export default username;