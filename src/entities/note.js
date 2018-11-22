module.exports = {
    name: "note",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        title: {
            type: "text"
        },
        description: {
            type: "text",
            nullable: true
        },
        isDone: {
            type: "boolean",
            default: false
        }
    },
    relations: {
        tags: {
            target: "tag",
            type: "many-to-many",
            joinTable: true,
            cascade: true
        }
    }
};