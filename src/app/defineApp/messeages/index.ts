import { db } from '../../db/index';
import auth_user from '../../utils/utilsCodes/auth_user';

const messeagesLimit = 20;

function messeage(app: any) {
  app.get('/messeages', (req: any, res: any) => {
    const query = req.query;
    const from_messeage = !isNaN(Number(query['from_messeage'])) ? 'AND messeages.id <= ' + (query.from_messeage) : '';
    if (typeof query !== 'object' || !('user_id' in query) || !('clientAddress' in query) || !('with_id' in query))
      return res.sendStatus(400);

    auth_user(query.clientAddress, query, () => {
      db.all(`SELECT id, (SELECT value FROM FILES WHERE id = messeages.content_id) AS content, content_type, 
            from_user, to_user, 
            readen, notified, init_date
          FROM messeages 
          WHERE ((from_user = ? AND to_user = ?) OR (to_user = ? AND from_user = ?)) ${from_messeage}
          ORDER BY init_date DESC, id DESC LIMIT ${messeagesLimit + 1};`,
        [query.user_id, query.with_id, query.user_id, query.with_id], (err: any, rows: any) => {
          if (err) return res.sendStatus(400);

          res.json({
            messeages: rows.length > messeagesLimit ? rows.slice(0, -1) : rows,
            all: !(rows.length > messeagesLimit)
          });
        });
    }, () => {
      res.sendStatus(400);
    });
  });
}

export default messeage;