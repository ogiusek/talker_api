const db = require("../../db");

function getFile(id, callback) {
  db.all(`SELECT value FROM files WHERE id = ?;`, [id], (err, rows) => {
    if (rows.length > 0)
      return callback(rows[0]);
    callback(false);
  });
}

module.exports = getFile;