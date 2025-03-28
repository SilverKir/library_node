const fs = require('fs');
const path = require('path');

const deleteBookFile=(book) => {
    if (book.fileBook) {
        const filePath = path.join(__dirname,  '..', '..', 'public', 'books', book.fileBook);
        fs.unlinkSync(filePath);
    }
}

module.exports = {
    deleteBookFile
}