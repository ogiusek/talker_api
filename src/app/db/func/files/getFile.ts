import db from "../../db";

function getFile(id: any, callback: any) {
  db.all(`SELECT value FROM files WHERE id = ?;`, [id], (err: any, rows: any) => {
    if (rows.length > 0)
      return callback(rows[0]);
    callback(false);
  });
}

export default getFile;