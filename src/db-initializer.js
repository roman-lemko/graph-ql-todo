const sqlite3 = require('sqlite3');

async function initialize() {
    let db = new sqlite3.Database('todo.db', (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    console.log('Database connection established.');

    await createNotes(db);
    await createTags(db);
    await createM2MTable(db);

    console.log('Database initialized');
}

async function createNotes(db) {
    return await db.run(`CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            isDone BOOLEAN)`);
}

async function createTags(db) {
    return await db.run(`CREATE TABLE IF NOT EXISTS tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tag TEXT)`);
}

async function createM2MTable(db) {
    return await db.run(`CREATE TABLE IF NOT EXISTS notesTags (
            noteId INTEGER,
            tagId TEXT,
            FOREIGN KEY(noteId) REFERENCES notes(id),
            FOREIGN KEY(tagId) REFERENCES tags(id),
            PRIMARY KEY (noteId, tagId))`);
}

module.exports = initialize;