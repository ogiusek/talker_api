import { db } from '../../db/index';
import auth_user from '../../utils/utilsCodes/auth_user';


function users(app: any) {
  app.get('/users', (req: any, res: any) => {
    const query = req.query;
    if (typeof query !== 'object' || !('user_name' in query))
      return res.sendStatus(400);

    auth_user(query.clientAddress, query, () => {

      res.json({});
    }, () => {
      res.sendStatus(400);
    });
  });
}

export default users;