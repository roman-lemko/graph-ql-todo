module.exports = {
    name: "tag",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        tag: {
            type: "text"
        }
    }
};