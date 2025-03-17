const multer = require('multer');

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, 'public/books');
    },
    filename: function (req, file, cb) {
        cb(null,  Date.now() + '.' + file.originalname.split('.')[1]);
    }
});

module.exports = multer({ storage: storage });