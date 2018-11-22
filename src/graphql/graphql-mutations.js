const typeorm = require("typeorm");

module.exports = {
    toggleNote: toggleNoteDone,
    updateDetails: updateNoteDetails,
    addNote: addNote,
    addTag: addTag
}

async function toggleNoteDone(request) {
    const repository = createNoteRepository();

    const note = await findNoteById(repository, request.id);
    const isDone = !note.isDone;
    await repository.update(request.id, { isDone });

    return { ...note, isDone };
}

async function updateNoteDetails(updateRequest) {
    const repository = createNoteRepository();

    const details = { ...updateRequest.noteDetails };

    const note = await findNoteById(repository, updateRequest.id);
    await repository.update(updateRequest.id, details);

    return {
        ...note,
        ...details
    }
}

async function addNote(addNoteRequest) {
    const newNote = { ...addNoteRequest.note };
    console.log(newNote);
    return createNoteRepository().save(newNote);
}

async function addTag(addTagRequest) {
    const noteRepository = createNoteRepository();
    const note = await findNoteById(noteRepository, addTagRequest.noteId);

    const tagToAdd = addTagRequest.tag;

    const noteHasTag = !!note.tags.filter(tag => { return tag.tag === tagToAdd }).length;

    if (noteHasTag) {
        return note;
    }

    note.tags.push(await findOrCreateTag(tagToAdd));
    noteRepository.save(note);

    return note;
}

async function findOrCreateTag(tag) {
    const tagRepository = typeorm.getRepository("tag");

    const existingTag = await tagRepository.findOne({ where: { tag: tag } });

    return existingTag ? existingTag : await tagRepository.create({ tag: tag });
}

function createNoteRepository() {
    return typeorm.getRepository("note");
}

async function findNoteById(repository, id) {
    return repository.findOne(id, { relations: ["tags"] });
}