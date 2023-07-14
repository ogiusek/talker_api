import db from "../../db";

function getFileId(file: any, callback: any) {
  db.all(`SELECT id FROM files WHERE value = ?;`, [file], (err: any, rows: any) => {
    if (rows.length > 0)
      return callback(rows[0].id);
    db.all(`INSERT INTO files(value) VALUES(?);`, [file], (e) => {
      getFileId(file, callback);
    })
  });
}

export default getFileId;