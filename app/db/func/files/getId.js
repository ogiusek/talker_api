const db = require("../../db");

function getFileId(file, callback) {
  db.all(`SELECT id FROM files WHERE value = ?;`, [file], (err, rows) => {
    if (rows.length > 0)
      return callback(rows[0].id);
    db.all(`INSERT INTO files(value) VALUES(?);`, [file], (e) => {
      getFileId(file, callback);
    })
  });
}

module.exports = getFileId;