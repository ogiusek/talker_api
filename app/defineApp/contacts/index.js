const { db } = require('../../db');
const { clients } = require('../../defineSocket');

function contacts(app) {
  app.get('/contacts', (req, res) => {
    const body = req.body;
    if (typeof body !== 'object' || !('user_id' in body) || !('clientAddress' in body))
      return res.sendStatus(400);



    // res.json(rows);
  });
}

module.exports = contacts;