const buildSchema = require('graphql').buildSchema;

const schema = buildSchema(`
    type Query {
        note(id: Int!): Note,
        notes: [Note]
    }

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
    }
`);

module.exports = schema;