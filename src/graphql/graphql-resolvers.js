const typeorm = require("typeorm");

const resolvers = {
    notes: notesResolver,
    note: noteResolver
};

async function notesResolver() {
    var repository = typeorm.getRepository("note");
    return repository.find({ relations: ["tags"] });
}

async function noteResolver({ id }) {
    var repository = typeorm.getRepository("note");
    return repository.findOne({ id }.id, { relations: ["tags"] });
}

module.exports = resolvers;