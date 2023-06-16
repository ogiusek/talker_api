const init = (db) => {
    db.run(`CREATE TABLE IF NOT EXISTS unconfirmed_users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        uuid VARCHAR(31) NOT NULL,

        email VARCHAR(255) UNIQUE,
        username VARCHAR(31) UNIQUE,
        hash VARCHAR(255) NOT NULL,

        init_date DATE DEFAULT CURRENT_TIMESTAMP
    );`);


    db.run(`CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        
        avatar VARCHAR(8191) NOT NULL,
        email VARCHAR(255) UNIQUE,
        username VARCHAR(31) UNIQUE,
        hash VARCHAR(255) NOT NULL,
        
        clientAddress VARCHAR(255),
        nightMode BOOLEAN DEFAULT 0,
        
        init_date DATE DEFAULT CURRENT_TIMESTAMP
    );`);

    db.run(`CREATE TABLE IF NOT EXISTS users_addresses(
        user_id INTEGER NOT NULL,
        clientAddress VARCHAR(255) UNIQUE NOT NULL,

        FOREIGN KEY(user_id) REFERENCES users(id)
    );`);


    db.run(`CREATE TABLE IF NOT EXISTS messeages(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        
        messeage VARCHAR(8191) NOT NULL,
        type VARCHAR(1) DEFAULT 'm',
        from_user INTEGER NOT NULL,
        to_user INTEGER NOT NULL,
        readen BOOLEAN DEFAULT 0,
        notified BOOLEAN DEFAULT 0,
        
        init_date DATE DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY(from_user) REFERENCES users(id),
        FOREIGN KEY(to_user) REFERENCES users(id)
    );`);


    db.run(`CREATE TABLE IF NOT EXISTS blocked_users(
        by_user INTEGER NOT NULL,
        blocked_user INTEGER NOT NULL,
        FOREIGN KEY(by_user) REFERENCES users(id),
        FOREIGN KEY(blocked_user) REFERENCES users(id)
    );`);
}

module.exports = init;
