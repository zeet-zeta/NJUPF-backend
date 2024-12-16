const path = require('path');

const uploadFile = (file) => {
    return {
        originalName: file.originalname,
        filename: file.filename,
        path: path.join(__dirname, '../public/', file.filename)
    };
};

module.exports = {
    uploadFile,
};