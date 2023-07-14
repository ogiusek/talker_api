import { db } from "../../../db/index";

function email(app: any) {
  app.get('/isUsed/email', (req: any, res: any) => {
    const query = req.query;
    if (typeof query !== 'object' || !('email' in query))
      return res.sendStatus(400);

    db.all(`SELECT CASE WHEN
      (SELECT COUNT(*) FROM users WHERE email = ?) > 0 OR 
      (SELECT COUNT(*) FROM unconfirmed_users WHERE email = ?) > 0
        THEN 1
        ELSE 0
    END AS res;`, [query.email, query.email], (err: any, rows: any) => {
      if (!err) return res.json({ res: rows[0].res });
      res.sendStatus(400);
    });
  });
}

export default email;