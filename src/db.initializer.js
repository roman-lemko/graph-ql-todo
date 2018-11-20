const sqlite3 = require('sqlite3');

async function initialize() {
    let db = new sqlite3.Database(':memory:', (err) => {
        if (err) {
            return console.error(err.message);
        }
    });
    console.log('Database connection established.');

    createNotes(db);
    createTags(db);
    createM2MTable(db);

    console.log('Database initialized');

}

function createNotes(db) {
    db.run(`CREATE TABLE IF NOT EXISTS notes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            description TEXT,
            isDone BOOLEAN)`);
}

function createTags(db) {
    db.run(`CREATE TABLE IF NOT EXISTS tags (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            tag TEXT)`);
}

function createM2MTable(db) {
    db.run(`CREATE TABLE IF NOT EXISTS notesTags (
            noteId INTEGER,
            tagId TEXT,
            FOREIGN KEY(noteId) REFERENCES notes(id),
            FOREIGN KEY(tagId) REFERENCES tags(id),
            PRIMARY KEY (noteId, tagId))`);
}

module.exports = {
    initialize: initialize
}