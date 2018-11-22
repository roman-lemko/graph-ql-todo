const typeorm = require("typeorm");
const EntitySchema = require("typeorm").EntitySchema;
const note = require("./entities/note");
const tag = require("./entities/tag");

module.exports = async function initialize() {

    await typeorm.createConnection({
        type: "sqlite",
        database: "todo.db",
        synchronize: true,
        entities: [
            new EntitySchema(note),
            new EntitySchema(tag)
        ]
    });

    console.log('Database initialized');
}