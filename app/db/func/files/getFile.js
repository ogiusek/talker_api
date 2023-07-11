import db from "../../db.js";

function getFile(id, callback) {
  db.all(`SELECT value FROM files WHERE id = ?;`, [id], (err, rows) => {
    if (rows.length > 0)
      return callback(rows[0]);
    callback(false);
  });
}

export default getFile;