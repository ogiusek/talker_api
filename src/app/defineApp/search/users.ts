import { db } from '../../db/index';

function users(app: any) {
  app.get('/search/users', (req: any, res: any) => {
    const query = req.query;
    if (typeof query !== 'object' || !('user_name' in query))
      return res.sendStatus(400);

    db.all('SELECT * FROM users WHERE (email LIKE ? OR username LIKE ?);',
      [`${query['user_name']}%`, `${query['user_name']}%`], (err, rows) => {
        res.json(rows);
      });
  });
}

export default users;