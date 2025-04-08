const{Schema, model} = require("mongoose");
const bookSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        
    },
    authors: {
        type: String,
       
    },
    favorite: {
        type: String,
        
    },
    fileCover: {
        type: String,
       
    },
    fileName: {
        type: String,
        
    },
    fileBook: {
        type: String,
        
    },
});

module.exports = model("Book", bookSchema);