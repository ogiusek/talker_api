import { db } from '../../db/index';

function users(app: any) {
  app.get('/search/users', (req: any, res: any) => {
    const query = req.query;
    const since = isNaN(Number(query['from_user'])) ? 0 : Number(query['from_user']);
    if (typeof query !== 'object' || !('user_name' in query))
      return res.sendStatus(400);

    db.all(`SELECT users.id, (SELECT files.value FROM files WHERE files.id = users.avatar_id) AS avatar, users.username FROM users 
    WHERE (email LIKE ? OR username LIKE ?) 
    LIMIT 20;`,
      [`${query['user_name']}%`, `${query['user_name']}%`], (err, rows) => {
        res.json(rows);
      });
  });
}

export default users;