const multer = require('multer');

const isValid = (file) => {
  if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/jpg') return true;
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (isValid(file)) {
      return callback({ status: 400, message: 'extension not allowed' }, '');
    }
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    return callback(null, `${id}.jpeg`);
  },
});

module.exports = storage;