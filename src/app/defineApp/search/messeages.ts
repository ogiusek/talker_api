import { db } from '../../db/index';
import auth_user from '../../utils/utilsCodes/auth_user';


function messeage(app: any) {
  app.get('/search/messeages', (req: any, res: any) => {
    const query = req.query;
    if (typeof query !== 'object' || !('user_id' in query) || !('clientAddress' in query)
      || !('messeage' in query) || !('talker_id' in query))
      return res.sendStatus(400);

    auth_user(query.clientAddress, query, () => {
      db.all(`SELECT * FROM messeages 
              WHERE (content_type LIKE ?) AND (content_type = 'text') AND
              ((from_user = ? AND to_user = ?) OR (to_user = ? AND from_user = ?));`, [
        query.messeage, query.user_id, query.talker_id, query.user_id, query.talker_id], (err, rows) => {
          console.log(rows);
          res.json({ res: rows });
        });
    }, () => {
      res.sendStatus(400);
    });
  });
}

export default messeage;