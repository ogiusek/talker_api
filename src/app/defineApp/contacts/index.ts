import db from '../../db/db';
import auth_user from '../../utils/utilsCodes/auth_user';

function contacts(app: any) {
  app.get('/contacts', (req: any, res: any) => {
    const query = req.query;
    if (typeof query !== 'object' || !('user_id' in query) || !('clientAddress' in query))
      return res.sendStatus(400);

    auth_user(query.clientAddress, query, () => {
      db.all(`SELECT DISTINCT (CASE WHEN m.from_user > m.to_user THEN
        m.from_user || ',' || m.to_user ELSE
        m.to_user || ',' || m.from_user END) AS bab,

          u.id, (SELECT value FROM files WHERE files.id = u.avatar_id) AS avatar, u.username, 
          m.content_type, (SELECT value FROM files WHERE files.id = m.content_id) AS content, m.from_user,
          m.readen 
        FROM messeages AS m 
        INNER JOIN users AS u ON m.from_user = u.id OR m.to_user = u.id 
        WHERE u.id != ? AND (m.from_user = ? OR m.to_user = ?) ORDER BY m.id DESC;`,
        [query.user_id, query.user_id, query.user_id], (err: any, rows: any) => {

          if (err) return res.sendStatus(400);
          const dRows = Object.values(rows.reduce((acc: any, obj: any) => {
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

export default contacts;