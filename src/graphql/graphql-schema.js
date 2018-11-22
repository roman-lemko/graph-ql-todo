const buildSchema = require('graphql').buildSchema;

module.exports = buildSchema(`
    type Query {
        note(id: Int!): Note,
        notes: [Note]
    },

    type Mutation {
        toggleNote(id: Int!): Note,
        updateDetails(id: Int!, noteDetails: NoteDetails!): Note,
        addNote(note: CreateNoteRequest!): Note,
        addTag(noteId: Int!, tag: String!): Note
    },

    type Note {
        id: Int,
        title: String,
        description: String,
        isDone: Boolean,
        tags: [Tag]
    },

    type Tag {
        id: Int,
        tag: String
    },

    input CreateNoteRequest {
        title: String!,
        description: String
    }

    input NoteDetails {
        title: String,
        description: String
    }
`);