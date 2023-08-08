import default_avatar from "../../../utils/utilsData/defaultAvatar";

const init = (db: any) => {
  db.run(`CREATE TABLE IF NOT EXISTS files(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    value BLOB UNIQUE NOT NULL
  );`, () => db.run(`INSERT INTO files(id, value) VALUES(0, ?);`, [default_avatar], (err: any) => 0));


  db.run(`CREATE TABLE IF NOT EXISTS unconfirmed_users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT NOT NULL,

    email VARCHAR(255) UNIQUE,
    username VARCHAR(31) UNIQUE,
    hash VARCHAR(255) NOT NULL,

    init_date DATE DEFAULT CURRENT_TIMESTAMP
  );`);
  db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    avatar_id INTEGER NOT NULL DEFAULT 0,
    email VARCHAR(255) UNIQUE,
    username VARCHAR(31) UNIQUE,
    hash VARCHAR(255) NOT NULL,

    nightMode BOOLEAN DEFAULT 0,

    init_date DATE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(avatar_id) REFERENCES files(id)
  );`, () => {
    db.run(`INSERT INTO users(email, username, hash) VALUES("kowalewski.olgierd@gmail.com", "user", "123456");`, () => 0);
    db.run(`INSERT INTO users(email, username, hash) VALUES("ogius06@wp.pl", "talker", "123456");`, () => 0);
  });
  db.run(`CREATE TABLE IF NOT EXISTS users_addresses(
    user_id INTEGER NOT NULL,
    clientAddress TEXT UNIQUE NOT NULL,

    FOREIGN KEY(user_id) REFERENCES users(id)
  );`, [], () => db.run(`DELETE FROM users_addresses;`));
  db.run(`CREATE TABLE IF NOT EXISTS blocked_users(
    by_user INTEGER NOT NULL,
    blocked_user INTEGER NOT NULL,
    FOREIGN KEY(by_user) REFERENCES users(id),
    FOREIGN KEY(blocked_user) REFERENCES users(id)
  );`);


  db.run(`CREATE TABLE IF NOT EXISTS typing(
    user INTEGER NOT NULL,
    to_user INTEGER NOT NULL,
    FOREIGN KEY(user) REFERENCES users(id),
    FOREIGN KEY(to_user) REFERENCES users(id)
  );`, [], () => db.run(`DELETE FROM typing;`));


  db.run(`CREATE TABLE IF NOT EXISTS messeages(
    id INTEGER PRIMARY KEY AUTOINCREMENT,

    content_id INTEGER NOT NULL,
    content_type VARCHAR(7) CHECK(content_type IN ('text', 'video', 'photo', 'audio', 'file')) DEFAULT 'text' NOT NULL,

    from_user INTEGER NOT NULL,
    to_user INTEGER NOT NULL,

    readen DATE DEFAULT NULL,
    notified BOOLEAN DEFAULT 0 NOT NULL,

    init_date DATE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(content_id) REFERENCES files(id),
    FOREIGN KEY(from_user) REFERENCES users(id),
    FOREIGN KEY(to_user) REFERENCES users(id)
  );`);
}

export default init;