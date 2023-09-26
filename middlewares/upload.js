const multer = require('multer');
const storage = multer.diskStorage({
    destination: './uploads',
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)

    }
})
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    cb(null, true);
}
const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 4
    },
    fileFilter
});

module.exports = upload;