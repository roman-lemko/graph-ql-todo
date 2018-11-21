const sqlite3 = require('sqlite3');

const root = {
    notes: notesResolver,
    note: noteResolver
};

function openDbConnection() {
    return new sqlite3.Database('./todo.db');
}

async function notesResolver() {
    return await new Promise((resolve, reject) => {
        const db = openDbConnection();
        db.all(`select notes.*, tag         
                from notes
                left join notesTags on noteId = notesTags.noteId
                left join tags on tagId = notesTags.tagId`,
            (err, rows) => {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                console.log(rows);
                resolve(rows);
            });
    });

}

async function noteResolver({ id }) {
    console.log({ id });
    return await new Promise((resolve, reject) => {
        const db = openDbConnection();
        db.get('select * from notes where id = ?', [{ id }.id], (err, row) => {
            if (err) {
                reject(err);
            }

            resolve(row);
        });
    });
}

module.exports = root;