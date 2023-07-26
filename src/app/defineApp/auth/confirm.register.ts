import db from "../../db/db";

function confirm_register(app: any) {
  app.get('/register/confirm', (req: any, res: any) => {
    const query = req.query;
    if (typeof query !== 'object' || !('id' in query) || !('uuid' in query))
      return res.sendStatus(400);

    db.all(`SELECT email, username, hash FROM unconfirmed_users WHERE id = ? AND uuid = ?;`, [query['id'], query['uuid']], (err, rows: any) => {
      if (err) return res.sendStatus('error', 422);
      if (rows.length !== 1) return res.json({ res: 'Wrong or out dated link' });
      const user = rows[0];

      db.run(`INSERT INTO users(email, username, hash) VALUES(?, ?, ?);`, [user.email, user.username, user.hash], () => { });
      db.run(`DELETE FROM unconfirmed_users WHERE email = ?;`, [user.email], () => { });

      res.json({ res: 'Success you can login' });
    });
  });
}

export default confirm_register;